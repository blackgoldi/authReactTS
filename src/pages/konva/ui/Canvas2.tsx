import Konva from 'konva';
import { useEffect, useRef, useState, type RefObject } from 'react';
import { Rect, Layer, Stage, Circle, Text } from 'react-konva';
import { EventProvider } from '../EventProvider';

export function Canvas2({
	ref,
	position,
	cvRef,
	posRef,
	onUpdate,
	changePos,
}: {
	position: { x: number; y: number };
	cvRef: RefObject<any>;
	posRef: RefObject<{ pos: { x: number; y: number }; change: (x: number, y: number) => void } | null>;
	onUpdate: (x: number, y: number) => void;
	changePos: EventProvider<{x:number,y:number}>;
}) {
	console.log('canvas');

	useEffect(()=>{
		const handler = ({x, y}:{x:number,y:number}) => {
			if (!textRef.current) return;
			textRef.current.setText(`X:${x} Y:${y}`);
		};
		changePos.subscribe(handler);
		return () => {
			changePos.unsubscribe(handler);
		}
	});


	const animRef = useRef<Konva.Animation | null>(null);
	const stageRef = useRef<Konva.Stage | null>(null);
	const rectRef = useRef<Konva.Rect | null>(null);
	const circleRef = useRef<Konva.Circle | null>(null);
	const touchRef = useRef<Konva.Circle | null>(null);
	const textRef = useRef<Konva.Text | null>(null);
	const prevPos = useState({ x: 190, y: 190 });

	posRef.current = { pos: { x: 0, y: 0 }, change: handleClick };

	function handleClick(x: number, y: number) {
		if (!textRef.current) return;

		textRef.current.setText(`X:${x} Y:${y}`);
	}

	useEffect(() => {
		// if (touchRef.current) {
		// 	touchRef.current.setPosition({ x: touchPos.x, y: touchPos.y });
		// }

		if (rectRef.current) {
			animRef.current = new Konva.Animation((frame) => {
				const radius = 50;
				const x = radius * Math.cos((frame.time * 2 * Math.PI) / 2000) + 100;
				const y = radius * Math.sin((frame.time * 2 * Math.PI) / 2000) + 100;
				if (!rectRef.current) return;
				rectRef.current.position({ x, y });
			}, rectRef.current.getLayer());

			animRef.current.start();

			return () => {
				if (animRef.current) {
					animRef.current.stop();
				}
			};
		}
	});

	function handleDragEnd(e: any) {
		circleRef.current?.setPosition({
			x: e.target.x(),
			y: e.target.y(),
		});
	}

	function handleDragMove(e: any) {
		onUpdate(e.target.x(), e.target.y());
		// onSendNewPos?.current(e.target.x(), e.target.y());
	}

	function handleChangePos(e: any) {
		onUpdate(e.evt.clientX, e.evt.clientY);
		// console.log({ x: e.evt.clientX, y: e.evt.clientY });
		// console.log()
		// posRef?.current.change(e.evt.clientX, e.evt.clientY);
	}

	return (
		<Stage ref={stageRef} width={window.innerWidth} height={500} onMouseMove={handleChangePos}>
			<Layer>
				<Circle ref={touchRef} radius={30} fill={'#ff00ff'} />
				<Circle
					ref={circleRef}
					radius={30}
					x={390}
					y={390}
					fill={'#ffee00ff'}
					draggable={true}
					// onDragMove={handleDragMove}
					onDragEnd={handleDragEnd}
				/>
				<Rect ref={rectRef} x={190} y={190} width={50} height={50} fill="green" />
				<Text
					ref={textRef}
					text={`X:${posRef.current.pos.x} Y:${posRef.current.pos.y}`}
					x={250}
					y={250}
					fill={'#FFFFFF'}
				/>
				{/* <Text ref={cvRef} x={250} y={250} fill={'#FFFFFF'} /> */}
			</Layer>
		</Stage>
	);
}
