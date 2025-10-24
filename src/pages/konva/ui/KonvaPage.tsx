import { useRef } from 'react';
import { Canvas2 } from './Canvas2';
import { MouseEventWrapper } from './MouseEventWrapper';
import { EventProvider } from '../EventProvider';

export function KonvaPage() {
	const wrRef = useRef<HTMLParagraphElement | null>(null);

	const posRef = useRef(null);
	const posRef2 = useRef(null);

	function handleNewPos(x: number, y: number) {
		// useState

		// if (wrRef.current == null || cvRef.current == null) return;
		// wrRef.current.innerText = `X:${x} Y: ${y}`;
		// cvRef.current.setText(`X:${x} Y: ${y}`);

		// posRef.current.change(x, y);
		// posRef2.current.change(x, y);
		changePos.invoke({ x, y });
	}

	function handleClick(_e:any) {
		//useState

		// if (wrRef.current == null || cvRef.current == null) return;
		// wrRef.current.innerText = `X:${Math.random()} Y: ${Math.random()}`;
		// cvRef.current.setText(`X:${Math.random()} Y: ${Math.random()}`); // работает только если cvRef это Kanvas.Text

		// posRef.current.change(Math.random(), Math.random());
		// posRef2.current.change(Math.random(), Math.random());

		changePos.invoke({ x: Math.random(), y: Math.random() });
	}
	console.log('render main');

	const changePos = new EventProvider<{ x: number; y: number }>();

	return (
		<div style={{ position: 'relative' }}>
			<button onClick={handleClick}>Кнопка</button>
			<MouseEventWrapper wrRef={wrRef} posRef={posRef} newPos={{ x: 0, y: 0 }} changePos={changePos} />
			<Canvas2
				posRef={posRef2}
				onUpdate={handleNewPos}
				changePos={changePos}
			/>
		</div>
	);
}
