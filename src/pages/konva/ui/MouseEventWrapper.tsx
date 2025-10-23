import { useRef, useState } from 'react';

export function MouseEventWrapper({
	newPos,
	onNewPos,
}: {
	newPos: { x: number; y: number };
	onNewPos: (x: number, y: number, type: string) => void;
}) {
	const mouseBlock = useRef<HTMLDivElement | null>(null);

	const [touches, setTouches] = useState(false);

	function handleMouseMove(e: any) {
		// console.log(e);
		setTouches(e.targetTouches?.length ?? 0);
		if (mouseBlock.current) {
			const rect = mouseBlock.current.getBoundingClientRect();
			onNewPos(e.clientX - rect.left, e.clientY - rect.top, e.type);
		}
	}

	function handleTouchMove(e: any) {
		setTouches(e.targetTouches.length);
		const touchObj = e.targetTouches[0];
		if (mouseBlock.current) {
			const rect = mouseBlock.current.getBoundingClientRect();
			onNewPos(Math.round(touchObj.clientX - rect.left), Math.round(touchObj.clientY - rect.top), e.type);
		}
	}

	function handleClick(e: any) {
		if (mouseBlock.current) {
			const rect = mouseBlock.current.getBoundingClientRect();
			onNewPos(e.clientX - rect.left, e.clientY - rect.top, e.type);
		}
	}

	function handleDragStart(e: any) {
		console.log(e.type);
	}

	function handleDragEnd(e: any) {
		console.log(e.type);
	}

	return (
		<section
			ref={mouseBlock}
			style={{  top: 0, left: 0, width: '100%', height: '100%', border: '1px solid white' }}
			onClick={handleClick}
			onMouseMove={handleMouseMove}
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
			onTouchMove={handleTouchMove}>
			<p style={{ position: 'absolute', top: 0, left: 0 }}>
				X:{newPos.x} Y:{newPos.y} | {touches} прикосновений
			</p>
		</section>
	);
}
