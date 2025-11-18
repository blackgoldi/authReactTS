import Konva from 'konva';
import React, { useEffect, useRef, type RefObject } from 'react';
import { Rect, Layer, Stage, Circle, Text, Group } from 'react-konva';
import { EventProvider } from '../EventProvider';
import type { KonvaEventObject, Node, NodeConfig } from 'konva/lib/Node';

export function Canvas2({
	posRef,
	rectangle,
	onUpdate,
	changePos,
	changeAttrs,
}: {
	posRef: RefObject<{ pos: { x: number; y: number }; change: (x: number, y: number) => void } | null>;
	rectangle: RefObject<{ ref: RefObject<Konva.Rect | null>; change: (width: number, height: number) => void } | null>;
	onUpdate: (x: number, y: number) => void;
	changePos: EventProvider<{ x: number; y: number }>;
	changeAttrs: EventProvider<{ width: number; height: number }>;
}) {
	Konva.hitOnDragEnabled = true;

	useEffect(() => {
		const handler = ({ x, y }: { x: number; y: number }) => {
			if (!textRef.current) return;
			textRef.current.setText(`X:${x} Y:${y}`);
		};
		changePos.subscribe(handler);

		const handler2 = ({ width, height }: { width: number; height: number }) => {
			if (!rectRef.current) return;

			rectRef.current.setAttrs({
				width: width,
				height: height,
			});
			// rectRef.current.setAttr('width', width);
			// rectRef.current.setAttr('height', height);
		};
		changeAttrs.subscribe(handler2);

		return () => {
			changePos.unsubscribe(handler);
			changeAttrs.unsubscribe(handler2);
		};
	});

	const animRef = useRef<Konva.Animation | null>(null);
	const stageRef = useRef<Konva.Stage | null>(null);

	// const stageDragRef = useRef<boolean>(false);
	// const stageScaleRef = useRef<{ x: number; y: number }>({ x: 1, y: 1 });
	// const stagePosRef = useRef<{ x: number; y: number }>({ x: 1, y: 1 });
	// const stageLastCenterRef = useRef<{ x: number; y: number }>({ x: 1, y: 1 });
	const stageLastDistRef = useRef<number | null>(null);

	const rectRef = useRef<Konva.Rect | null>(null);
	const circleRef = useRef<Konva.Circle | null>(null);
	const touchRef = useRef<Konva.Circle | null>(null);
	const textRef = useRef<Konva.Text | null>(null);
	const selectionRect = useRef<Konva.Rect>(null);
	const selection = useRef<{ startPos: { x: number; y: number }; ref: React.RefObject<Konva.Rect> | null }>({
		startPos: { x: 0, y: 0 },
		ref: selectionRect as React.RefObject<Konva.Rect>,
	});

	// const prevPos = useState({ x: 190, y: 190 });

	const touchDownRef = useRef<Konva.Text | null>(null);
	// const touchDownPressureRef = useRef<Konva.Text | null>(null);
	const touchUpRef = useRef<Konva.Text | null>(null);
	const touchMoveRef = useRef<Konva.Text | null>(null);
	const touchZoomRef = useRef<Konva.Text | null>(null);
	const tapRef = useRef<Konva.Text | null>(null);
	const dblTapRef = useRef<Konva.Text | null>(null);
	const forceRef = useRef<Konva.Text | null>(null);

	const mouseClickRef = useRef<Konva.Text | null>(null);
	const mouseDblClickRef = useRef<Konva.Text | null>(null);
	const mouseDownRef = useRef<Konva.Text | null>(null);
	const mouseUpRef = useRef<Konva.Text | null>(null);
	const mouseMoveRef = useRef<Konva.Text | null>(null);
	const mouseLeaveRef = useRef<Konva.Text | null>(null);
	const mouseWheelRef = useRef<Konva.Text | null>(null);

	const dragStartRef = useRef<Konva.Text | null>(null);
	const dragMoveRef = useRef<Konva.Text | null>(null);
	const dragEndRef = useRef<Konva.Text | null>(null);

	posRef.current = { pos: { x: 0, y: 0 }, change: handleClick };

	function handleClick(x: number, y: number) {
		if (!textRef.current) return;

		textRef.current.setText(`X:${x} Y:${y}`);
	}

	rectangle.current = { ref: rectRef, change: hangleChangeAttrs };

	function hangleChangeAttrs(width: number, height: number) {
		if (!rectRef.current) return;

		rectRef.current.setAttr('width', width);
		rectRef.current.setAttr('height', height);
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

	// function handleDragEnd(e: any) {
	// 	// circleRef.current?.setPosition({
	// 	// 	x: e.target.x(),
	// 	// 	y: e.target.y(),
	// 	// });
	// }

	// function handleDragMove(e: any) {
	// 	onUpdate(e.target.x(), e.target.y());
	// 	// onSendNewPos?.current(e.target.x(), e.target.y());
	// }

	function handleChangePos(e: KonvaEventObject<MouseEvent, Node<NodeConfig>>) {
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

	// const long_tap_duration = 400; // если меньше - то это будет быстрое нажатие
	// if isQuickTap then     onMDown()   onMouseUp()
	function handleEvent(
		e: KonvaEventObject<WheelEvent | TouchEvent | MouseEvent | Event, Node<NodeConfig>>,
		target: RefObject<Konva.Text | null> | null
	) {
		if (target == null) return;

		const event_name = e.type;

		// if (event_name == 'touchend') {
		// 	e.evt.preventDefault();
		// }

		// if (event_name == 'touchstart') {
		// 	console.log(e);
		// }
		// console.log(e.evt.which);

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

	// function handlePointDown(e: Konva.KonvaEventObject<PointerEvent> | PointerEvent) {
	// 	console.log('pointDown');
	// 	evCache.push(e);
	// }

	function handleStartSelection(e: MouseEvent | TouchEvent) {
		if (!selection.current.startPos && selection.current) return;

		if (e instanceof MouseEvent) {
			selection.current.startPos = { x: e.clientX, y: e.clientY };
			selection.current.ref?.current.setAttrs({
				x: e.clientX,
				y: e.clientY,
				width: 0,
				height: 0,
				visible: true,
			});
		}
		if (e instanceof TouchEvent) {
			e.preventDefault();
			console.log(e);
		}
	}

	function handleSelectionChange(e: MouseEvent | TouchEvent) {
		if (e instanceof MouseEvent) {
			if (e.buttons == 1 && selection.current.ref?.current) {
				selection.current.ref.current.setAttrs({
					x: Math.min(selection.current.startPos.x, e.clientX),
					y: Math.min(selection.current.startPos.y, e.clientY - 134),
					width: Math.abs(selection.current.startPos.x - e.clientX),
					height: Math.abs(selection.current.startPos.y - e.clientY),
				});
			}
		}
		if (e instanceof TouchEvent) {
			e.preventDefault();
			console.log(e);
		}
	}

	function handleEndSelection(e: MouseEvent) {
		if (!selection.current.ref && !e) return;

		if (e instanceof MouseEvent) {
			selection.current.ref?.current.visible(false);
		}

		if (e instanceof TouchEvent) {
			e.preventDefault();
			console.log(e);
		}
	}

	const timers = new Map();

	const lastDist = React.useRef<number>(0);
	const lastStrokeColor = React.useRef<string>('');
	const activeShape = React.useRef<Konva.Shape | Konva.Stage | null>(null);

	function handleTapShape(e: KonvaEventObject<Event, Node<NodeConfig>>) {
		const shape = e.target;
		if (shape.nodeType != 'Stage') {
			if (activeShape.current != shape && activeShape.current) {
				activeShape.current.setAttr('stroke', lastStrokeColor.current);
			}
			activeShape.current = shape;
			lastStrokeColor.current = activeShape.current.getAttr('stroke');
			activeShape.current.setAttr('stroke', '#FF0F0F');
		} else if (shape.nodeType == 'Stage' && activeShape.current) {
			activeShape.current.setAttr('stroke', lastStrokeColor.current);
			activeShape.current = null;
		}
	}

	function handleTouchMove(e: KonvaEventObject<TouchEvent, Node<NodeConfig>>) {
		const touch1 = e.evt.touches[0];
		const touch2 = e.evt.touches[1];

		if (touch1 && touch2 && activeShape) {
			const dist = getDistance(
				{
					x: touch1.clientX,
					y: touch1.clientY,
				},
				{
					x: touch2.clientX,
					y: touch2.clientY,
				}
			);
			if (!lastDist.current) {
				lastDist.current = dist;
				return;
			}
			if (!activeShape.current) return;
			const scale = (Number(activeShape.current.scaleX) * dist) / lastDist.current;
			activeShape.current?.setAttr('scale', scale);

			lastDist.current = scale;
		}
	}

	function handleTouchForce(e: any) {
		if (!forceRef.current) return;

		forceRef.current.setAttr('text', e.changedTouches[0].force);
		forceRef.current?.setAttr('fill', '#00FF00');

		const timer = setTimeout(() => {
			forceRef.current?.setAttr('text', 0);
			forceRef.current?.setAttr('fill', '#FF0000');
			clearTimeout(timers.get('force'));
		}, 2000);
		if (timers.has('force')) {
			clearTimeout(timers.get('force'));
		}
		timers.set('force', timer);
	}

	function getDistance(p1: { x: number; y: number }, p2: { x: number; y: number }) {
		return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
	}

	return (
		<Stage
			ref={stageRef}
			width={window.innerWidth}
			height={window.innerHeight}
			onMouseDown={(e) => {
				handleStartSelection(e.evt);
				handleEvent(e, mouseDownRef);
			}}
			onTouchStart={(e) => {
				handleEvent(e, touchDownRef);
			}}
			onMouseUp={(e) => {
				handleEndSelection(e.evt);
				handleEvent(e, mouseUpRef);
			}}
			onTouchEnd={(e) => {
				stageLastDistRef.current = 0;
				stageLastDistRef.current = 0;
				handleEvent(e, touchUpRef);
			}}
			onClick={(e) => {
				handleEvent(e, mouseClickRef);
			}}
			onTap={(e) => {
				handleTapShape(e);
				console.log(e.evt)
				handleTouchForce(e);
				handleEvent(e, tapRef);
			}}
			onDblClick={(e) => handleEvent(e, mouseDblClickRef)}
			onDblTap={(e) => {
				handleEvent(e, dblTapRef);
			}}
			onMouseMove={(e) => {
				handleSelectionChange(e.evt);
				handleChangePos(e);
				handleEvent(e, mouseMoveRef);
			}}
			onTouchMove={(e) => {
				e.evt.preventDefault();
				handleEvent(e, touchMoveRef);
				handleTouchMove(e);
				handleTouchForce(e.evt);
			}}
			onDragStart={(e) => handleEvent(e, dragStartRef)}
			onDragMove={(e) => handleEvent(e, dragMoveRef)}
			onDragEnd={(e) => {
				handleEvent(e, dragEndRef);
			}}
			onMouseLeave={(e) => handleEvent(e, mouseLeaveRef)}
			onWheel={(e) => handleEvent(e, mouseWheelRef)}>
			<Layer>
				<Circle ref={touchRef} radius={30} draggable={true} fill={'#ff00ff'} />
				<Circle
					ref={circleRef}
					radius={30}
					x={390}
					y={390}
					fill={'#ffee00ff'}
					draggable={true}
					// onDragMove={handleDragMove}
					// onDragEnd={handleDragEnd}
				/>
				<Rect ref={rectRef} width={50} height={50} fill="green" />
				<Text
					ref={textRef}
					text={`X:${posRef.current.pos.x} Y:${posRef.current.pos.y}`}
					x={250}
					y={250}
					fill={'#FFFFFF'}
				/>

				<Rect
					ref={selectionRect}
					visible={false}
					fill="transparent"
					stroke="#0080FF"
					strokeWidth={1}
					dash={[2, 2]}
				/>

				<Group draggable={true} x={300} y={50}>
					<Rect width={150} height={300} stroke={'#FFFFFF'} strokeWidth={1} />
					<Text text="Touch обработчики" x={10} y={10} fontVariant="bold" fill={'#FFFFFF'} />
					<Group x={10} y={30}>
						<Text text="onTouchStart" fill={'#FFFFFF'} />
						<Text ref={touchDownRef} text="No" x={80} fontVariant="bold" fill={'#FF0000'} />
					</Group>
					<Group x={10} y={50}>
						<Text text="pointerPressure" fill={'#FFFFFF'} />
						<Text ref={forceRef} text="0" x={90} fontVariant="bold" fill={'#FF0000'} />
					</Group>
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
				<Group draggable={true} x={150} y={50}>
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
						<Text text="mouseLeave" fill={'#FFFFFF'} />
						<Text ref={mouseLeaveRef} text="No" x={90} fontVariant="bold" fill={'#FF0000'} />
					</Group>
					<Group x={10} y={150}>
						<Text text="mouseScroll" fill={'#FFFFFF'} />
						<Text ref={mouseWheelRef} text="No" x={90} fontVariant="bold" fill={'#FF0000'} />
					</Group>
				</Group>
				<Group draggable={true} x={0} y={50}>
					<Rect width={150} height={300} stroke={'#FFFFFF'} strokeWidth={1} />
					<Text text="Drag обработчики" x={10} y={10} fontVariant="bold" fill={'#FFFFFF'} />
					<Group x={10} y={30}>
						<Text text="dragStart" fill={'#FFFFFF'} />
						<Text ref={dragStartRef} text="No" x={80} fontVariant="bold" fill={'#FF0000'} />
					</Group>
					<Group x={10} y={50}>
						<Text text="dragMove" fill={'#FFFFFF'} />
						<Text ref={dragMoveRef} text="No" x={80} fontVariant="bold" fill={'#FF0000'} />
					</Group>
					<Group x={10} y={70}>
						<Text text="dragEnd" fill={'#FFFFFF'} />
						<Text ref={dragEndRef} text="No" x={80} fontVariant="bold" fill={'#FF0000'} />
					</Group>
				</Group>
				{/* <Text ref={cvRef} x={250} y={250} fill={'#FFFFFF'} /> */}
			</Layer>
		</Stage>
	);
}
