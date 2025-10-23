import { useRef, useState } from 'react';
import { Canvas } from './Canvas';
import { MouseEventWrapper } from './MouseEventWrapper';

export function KonvaPage() {
	const animRef = useRef(null);
	const [position, setPosition] = useState({ x: 0, y: 0, type: '' });

	function handleNewPos(x: number, y: number, type: string) {
		setPosition({ x: x, y: y, type: type });
	}

	return (
		<div style={{ position: 'relative' }}>
			<Canvas animRef={animRef} touchPos={position} />
			<MouseEventWrapper newPos={position} onNewPos={handleNewPos} />
		</div>
	);
}
