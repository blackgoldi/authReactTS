import { useEffect, useRef, useState, type RefObject } from 'react';
import type { EventProvider } from '../EventProvider';

export function MouseEventWrapper({
	wrRef,
	posRef,
	newPos,
	changePos,
}: {
	wrRef: RefObject<any>;
	posRef: RefObject<any>;
	newPos: { x: number; y: number };
	changePos: EventProvider<{ x: number; y: number }>;
}) {
	console.log('div');
	console.log(newPos.x,wrRef.current)
	const mouseBlock = useRef<HTMLDivElement | null>(null);

	const [pos, setPos] = useState({ x: 0, y: 0 });

	posRef.current = { pos: pos, change: handleChangePos };

	function handleChangePos(x: number, y: number) {
		console.log('изменились ' + x + y);
	}

	// const [touches, setTouches] = useState(false);

	useEffect(() => {
		const handler = ({ x, y }: { x: number; y: number }) => {
			setPos({ x: x, y: y });
		};
		changePos.subscribe(handler);
		return () => {
			changePos.unsubscribe(handler);
		};
	});

	// function handleMouseMove(e: any) {
	// 	// console.log(e);
	// 	setTouches(e.targetTouches?.length ?? 0);
	// 	if (mouseBlock.current) {
	// 		const rect = mouseBlock.current.getBoundingClientRect();
	// 		onNewPos(e.clientX - rect.left, e.clientY - rect.top, e.type);
	// 	}
	// }

	// function handleTouchMove(e: any) {
	// 	setTouches(e.targetTouches.length);
	// 	const touchObj = e.targetTouches[0];
	// 	if (mouseBlock.current) {
	// 		const rect = mouseBlock.current.getBoundingClientRect();
	// 		onNewPos(Math.round(touchObj.clientX - rect.left), Math.round(touchObj.clientY - rect.top), e.type);
	// 	}
	// }

	// function handleClick(e: any) {
	// 	if (mouseBlock.current) {
	// 		const rect = mouseBlock.current.getBoundingClientRect();
	// 		onNewPos(e.clientX - rect.left, e.clientY - rect.top, e.type);
	// 	}
	// }

	// function handleDragStart(e: any) {
	// 	console.log(e.type);
	// }

	// function handleDragEnd(e: any) {
	// 	console.log(e.type);
	// }

	return (
		<section
			ref={mouseBlock}
			style={{ top: 0, left: 0, width: '100%', height: '100%', border: '1px solid white' }}
			// onClick={handleClick}
			// onMouseMove={handleMouseMove}
			// onDragStart={handleDragStart}
			// onDragEnd={handleDragEnd}
			// onTouchMove={handleTouchMove}
		>
			<p style={{ top: 0, left: 0 }}>
				X:{posRef.current.pos.x} Y:{posRef.current.pos.y}
			</p>
		</section>
	);
}
