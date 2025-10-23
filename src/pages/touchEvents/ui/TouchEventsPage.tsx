import { useState } from 'react';

export function TouchEventsPage() {
	const [event, setEvent] = useState('');
	const [touchPoint, setTouchPoint] = useState({ x: 0, y: 0 });

	function handleTouchStart(e: any) {
		setEvent(e._reactName);
	}

	function handleTouchMove(e: any) {
		setEvent(e._reactName);
		const point = e.targetTouches[0];
		setTouchPoint({ x: point.clientX, y: point.clientY });
	}

	function handleTouchEnd(e: any) {
		console.log(
			`Конечный компонент:${e.target}\n Последняя позиция: X: ${e.changedTouches[0].clientX} Y: ${e.changedTouches[0].clientX}`
		);
		setEvent(e._reactName);
	}

	function handleMove(e:any){
		console.log(e);
	}

	return (
		<div
			style={{
				position: 'relative',
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
			}}
			onTouchStart={handleTouchStart}
			onTouchMove={handleTouchMove}
			onMouseMove={handleMove}
			onTouchEnd={handleTouchEnd}>
			<p>Событие {event}</p>
			<p
				style={{
					position: 'absolute',
					top: 0,
				}}>
				Позиция x:{touchPoint.x} y:{touchPoint.y}
			</p>
		</div>
	);
}
