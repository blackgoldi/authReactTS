import Konva from 'konva';
import { useEffect, useRef, type RefObject } from 'react';
import { Rect, Layer, Stage, Circle, Text, Group } from 'react-konva';
import { EventProvider } from '../EventProvider';

export function Canvas2({
	posRef,
	onUpdate,
	changePos,
}: {
	posRef: RefObject<{ pos: { x: number; y: number }; change: (x: number, y: number) => void } | null>;
	onUpdate: (x: number, y: number) => void;
	changePos: EventProvider<{ x: number; y: number }>;
}) {
	console.log('canvas');

	useEffect(() => {
		const handler = ({ x, y }: { x: number; y: number }) => {
			if (!textRef.current) return;
			textRef.current.setText(`X:${x} Y:${y}`);
		};
		changePos.subscribe(handler);
		return () => {
			changePos.unsubscribe(handler);
		};
	});

	const animRef = useRef<Konva.Animation | null>(null);
	const stageRef = useRef<Konva.Stage | null>(null);
	const rectRef = useRef<Konva.Rect | null>(null);
	const circleRef = useRef<Konva.Circle | null>(null);
	const touchRef = useRef<Konva.Circle | null>(null);
	const textRef = useRef<Konva.Text | null>(null);
	// const prevPos = useState({ x: 190, y: 190 });

	const touchDownRef = useRef<Konva.Text | null>(null);
	// const touchDownPressureRef = useRef<Konva.Text | null>(null);
	const touchUpRef = useRef<Konva.Text | null>(null);
	const touchMoveRef = useRef<Konva.Text | null>(null);
	const touchZoomRef = useRef<Konva.Text | null>(null);

	const mouseClickRef = useRef<Konva.Text | null>(null);
	const mouseDblClickRef = useRef<Konva.Text | null>(null);
	const mouseDownRef = useRef<Konva.Text | null>(null);
	const mouseUpRef = useRef<Konva.Text | null>(null);
	const mouseMoveRef = useRef<Konva.Text | null>(null);
	const mouseWheelRef = useRef<Konva.Text | null>(null);

	const tapRef = useRef<Konva.Text | null>(null);
	const dblTapRef = useRef<Konva.Text | null>(null);

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

	// function handleDragMove(e: any) {
	// 	onUpdate(e.target.x(), e.target.y());
	// 	// onSendNewPos?.current(e.target.x(), e.target.y());
	// }

	function handleChangePos(e: any) {
		onUpdate(e.evt.clientX, e.evt.clientY);
		// console.log({ x: e.evt.clientX, y: e.evt.clientY });
		// console.log()
		// posRef?.current.change(e.evt.clientX, e.evt.clientY);
	}

	// function handleEvents(e: Konva.KonvaEventObject<TouchEvent | MouseEvent>) {
	// 	console.log(e.evt);
	// }

	function resetRef(ref: React.RefObject<Konva.Text | null>) {
		if (ref?.current) {
			ref.current.setText('No');
			ref.current.setAttr('fill', '#FF0000');
		}
	}

	const long_tap_duration = 400; // если меньше - то это будет быстрое нажатие
	// if isQuickTap then     onMDown()   onMouseUp()

	function handleEvent(
		e: Konva.KonvaEventObject<TouchEvent | MouseEvent>,
		target: RefObject<Konva.Text | null> | null
	) {
		if (target == null) return;

		const event_name = e.type;

		// if (event_name == 'touchend') {
		// 	e.evt.preventDefault();
		// }

		if (event_name == 'touchstart') {
			console.log(e);
		}
		console.log(e.evt.which)

		target.current?.setText('Yes');
		target.current?.setAttr('fill', '#00FF00');

		const timer = setTimeout(() => {
			resetRef(target);
			clearTimeout(timers.get(event_name));
		}, 2000);
		if (timers.has(event_name)) {
			clearTimeout(timers.get(event_name));
		}
		timers.set(event_name, timer);
	}
	window.onresize = (e) => e.preventDefault();

	// function handlePressure(e: Konva.KonvaEventObject<PointerEvent>) {
	// 	return;
	// 	console.log(typeof e.evt);
	// 	touchDownPressureRef.current?.setText(e.evt.pressure.toString());
	// }

	const evCache: Array<any> = [];
	let prevDiff = -1;

	// function handlePointDown(e: Konva.KonvaEventObject<PointerEvent> | PointerEvent) {
	// 	console.log('pointDown');
	// 	evCache.push(e);
	// }

	function handlePointMove(e: any) {
		return;
		const index = evCache.find((cachedEv) => cachedEv.pointerId == e.pointerId)?.pointerId;
		if (index === undefined) return;
		evCache[index] = e;
		if (evCache.length === 2) {
			// Calculate the distance between the two pointers
			const curDiff = Math.abs(evCache[0].clientX - evCache[1].clientX);

			if (prevDiff > 0) {
				if (curDiff > prevDiff) {
					// The distance between the two pointers has increased
					console.log('Pinch moving OUT -> Zoom in', e);
				}
				if (curDiff < prevDiff) {
					// The distance between the two pointers has decreased
					console.log('Pinch moving IN -> Zoom out', e);
				}
				touchZoomRef.current?.setText(curDiff.toString());
				touchZoomRef.current?.setAttr('fill', '#00FF00');
				prevDiff = curDiff;
			}
		}
	}

	const timers = new Map();

	return (
		<Stage
			ref={stageRef}
			width={window.innerWidth}
			height={500}
			onMouseDown={(e) => handleEvent(e, mouseDownRef)}
			onTouchStart={(e) => {
				handleEvent(e, touchDownRef);
			}}
			onMouseUp={(e) => {
				handleEvent(e, mouseUpRef);
			}}
			onTouchEnd={(e) => handleEvent(e, touchUpRef)}
			onClick={(e) => {
				console.warn('onClick', e);
				handleEvent(e, mouseClickRef);
			}}
			onTap={(e) => {
				console.warn('onTap', e);
				handleEvent(e, tapRef);
			}}
			onDblClick={(e) => handleEvent(e, mouseDblClickRef)}
			onDblTap={(e) => handleEvent(e, dblTapRef)}
			onMouseMove={(e) => {
				handleChangePos(e);
				handleEvent(e, mouseMoveRef);
			}}
			onTouchMove={(e) => {
				handleEvent(e, touchMoveRef);
				handlePointMove(e);
			}}
			onWheel={(e) => handleEvent(e, mouseWheelRef)}>
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

				<Group draggable={true} x={250} y={50}>
					<Rect width={150} height={300} stroke={'#FFFFFF'} strokeWidth={1} />
					<Text text="Touch обработчики" x={10} y={10} fontVariant="bold" fill={'#FFFFFF'} />
					<Group x={10} y={30}>
						<Text text="onTouchStart" fill={'#FFFFFF'} />
						<Text ref={touchDownRef} text="No" x={80} fontVariant="bold" fill={'#FF0000'} />
					</Group>
					{/* <Group x={10} y={50}>
						<Text text="pointerPressure" fill={'#FFFFFF'} />
						<Text ref={touchDownPressureRef} text="0" x={90} fontVariant="bold" fill={'#FF0000'} />
					</Group> */}
					<Group x={10} y={70}>
						<Text text="onTouchMove" fill={'#FFFFFF'} />
						<Text ref={touchMoveRef} text="No" x={80} fontVariant="bold" fill={'#FF0000'} />
					</Group>
					<Group x={10} y={90}>
						<Text text="onTouchEnd" fill={'#FFFFFF'} />
						<Text ref={touchUpRef} text="No" x={80} fontVariant="bold" fill={'#FF0000'} />
					</Group>
					<Group x={10} y={110}>
						<Text text="onTap" fill={'#FFFFFF'} />
						<Text ref={tapRef} text="No" x={80} fontVariant="bold" fill={'#FF0000'} />
					</Group>
					<Group x={10} y={130}>
						<Text text="onDblTap" fill={'#FFFFFF'} />
						<Text ref={dblTapRef} text="No" x={90} fontVariant="bold" fill={'#FF0000'} />
					</Group>
					<Group x={10} y={150}>
						<Text text="pointerZoom" fill={'#FFFFFF'} />
						<Text ref={touchZoomRef} text="0" x={90} fontVariant="bold" fill={'#FF0000'} />
					</Group>
				</Group>
				<Group draggable={true} x={100} y={50}>
					<Rect width={150} height={300} stroke={'#FFFFFF'} strokeWidth={1} />
					<Text text="Mouse обработчики" x={10} y={10} fontVariant="bold" fill={'#FFFFFF'} />
					<Group x={10} y={30}>
						<Text text="mouseDown" fill={'#FFFFFF'} />
						<Text ref={mouseDownRef} text="No" x={80} fontVariant="bold" fill={'#FF0000'} />
					</Group>
					<Group x={10} y={50}>
						<Text text="mouseMove" fill={'#FFFFFF'} />
						<Text ref={mouseMoveRef} text="No" x={80} fontVariant="bold" fill={'#FF0000'} />
					</Group>
					<Group x={10} y={70}>
						<Text text="mouseUp" fill={'#FFFFFF'} />
						<Text ref={mouseUpRef} text="No" x={80} fontVariant="bold" fill={'#FF0000'} />
					</Group>
					<Group x={10} y={90}>
						<Text text="mouseClick" fill={'#FFFFFF'} />
						<Text ref={mouseClickRef} text="No" x={80} fontVariant="bold" fill={'#FF0000'} />
					</Group>
					<Group x={10} y={110}>
						<Text text="mouseDblClick" fill={'#FFFFFF'} />
						<Text ref={mouseDblClickRef} text="No" x={90} fontVariant="bold" fill={'#FF0000'} />
					</Group>
					<Group x={10} y={130}>
						<Text text="mouseScroll" fill={'#FFFFFF'} />
						<Text ref={mouseWheelRef} text="No" x={90} fontVariant="bold" fill={'#FF0000'} />
					</Group>
				</Group>
				{/* <Text ref={cvRef} x={250} y={250} fill={'#FFFFFF'} /> */}
			</Layer>
		</Stage>
	);
}
