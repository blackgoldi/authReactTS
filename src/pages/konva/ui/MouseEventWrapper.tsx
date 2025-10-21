import { useRef, useState } from 'react';

export function MouseEventWrapper() {
	const mouseBlock = useRef(null);

	const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
	const [touches, setTouches] = useState(false);

	function handleMouseMove(e) {
		setTouches(e.targetTouches?.length ?? 0);
		if (mouseBlock.current) {
			const rect = mouseBlock.current.getBoundingClientRect();
			setCursorPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
		}
	}

	function handleTouchMove(e) {
		setTouches(e.targetTouches.length);
		const touchObj = e.targetTouches[0];
		if (mouseBlock.current) {
			const rect = mouseBlock.current.getBoundingClientRect();
			setCursorPosition({
				x: Math.round(touchObj.clientX - rect.left),
				y: Math.round(touchObj.clientY - rect.top),
			});
		}
	}

	return (
		<section
			ref={mouseBlock}
			style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: '1px solid white' }}
			onMouseMove={handleMouseMove}
			onTouchMove={handleTouchMove}>
			<p style={{ position: 'absolute', top: 0, left: 0 }}>
				X:{cursorPosition.x} Y:{cursorPosition.y} | {touches} прикосновений
			</p>
		</section>
	);
}
