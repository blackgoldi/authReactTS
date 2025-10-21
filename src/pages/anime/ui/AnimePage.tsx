import { animate, utils } from 'animejs';
import { useEffect, useRef } from 'react';

export function AnimePage() {
	const mountRef = useRef<HTMLPreElement | null>(null);

	useEffect(() => {
		if (mountRef.current) {
			animate('input', {
				value: 1000, // animate the input "value" attribute
				alternate: true,
				loop: true,
				modifier: utils.round(0),
			});
		}
	});
	return (
		<>
			<pre ref={mountRef} className="row large centered">
				<input type="range" readOnly value="0" min="0" max="1000" />
				<input type="text" readOnly value="0" size={5} />
			</pre>
		</>
	);
}
