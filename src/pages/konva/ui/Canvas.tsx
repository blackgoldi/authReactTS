import Konva from 'konva';
import { useEffect, useRef, type RefObject } from 'react';
import { Rect, Layer, Stage, Circle } from 'react-konva';

export function Canvas({
	animRef,
	touchPos = { x: 100, y: 100, type: '' },
}: {
	animRef: RefObject<any>;
	touchPos: { x: number; y: number; type: string };
}) {
	const stageRef = useRef<Konva.Stage | null>(null);
	const rectRef = useRef<Konva.Rect | null>(null);
	const circleRef = useRef<Konva.Circle | null>(null);
	const touchRef = useRef<Konva.Circle | null>(null);
	console.log(animRef.current);
	useEffect(() => {
		if (touchRef.current) {
			touchRef.current.setPosition({ x: touchPos.x, y: touchPos.y });
		}
		// if (stageRef.current.getIntersection(touchPos)) {
		// 	transformerRef.current?.nodes([stageRef.current.getIntersection(touchPos)]);
		// } else {
		// 	transformerRef.current?.nodes([]);
		// }
	}, [touchPos]);

	function handleDragEnd(e: any) {
		circleRef.current?.setPosition({
			x: e.target.x(),
			y: e.target.y(),
		});
	}

	return (
		<Stage ref={stageRef} width={window.innerWidth} height={500}>
			<Layer>
				<Circle ref={touchRef} radius={30} fill={'#ff00ff'} />
				<Circle
					ref={circleRef}
					radius={30}
					x={390}
					y={390}
					fill={'#ffee00ff'}
					draggable={true}
					onDragEnd={handleDragEnd}
				/>
				<Rect ref={rectRef} x={190} y={190} width={50} height={50} fill="green" />
			</Layer>
		</Stage>
	);
}
