import { useRef } from 'react';
import { Canvas } from './Canvas';
import { MouseEventWrapper } from './MouseEventWrapper';

export function KonvaPage() {
	const animRef = useRef(null);

	return (
		<div style={{ position: 'relative' }}>
			<Canvas animRef={animRef} />
			<MouseEventWrapper />
		</div>
	);
}
