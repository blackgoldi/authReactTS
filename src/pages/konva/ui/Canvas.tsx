import Konva from 'konva';
import { useEffect, useRef, useState } from 'react';
import { Rect, Layer, Stage } from 'react-konva';

export function Canvas({ animRef }) {
	console.log('canvas render');

	const rectRef = useRef(null);

	useEffect(() => {
		if (rectRef.current) {
			animRef.current = new Konva.Animation((frame) => {
				const time = frame.time;
				const timeDiff = frame.timeDiff;
				const frameRate = frame.frameRate;

				// Example: move rectangle in a circle
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

	return (
		<Stage width={500} height={500}>
			<Layer>
				<Rect ref={rectRef} x={50} y={50} width={50} height={50} fill="green" />
			</Layer>
		</Stage>
	);
}
