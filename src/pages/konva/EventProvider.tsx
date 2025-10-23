export class EventProvider<T> {
	// Закрытое поле с массивом обработчиков
	#handlers: Array<(arg: T) => void> = [];

	// Подписка на событие
	subscribe(handler: (arg: T) => void): void {
		this.#handlers.push(handler);
	}

	// Отписка от события
	unsubscribe(handler: (arg: T) => void): void {
		const idx = this.#handlers.indexOf(handler);
		if (idx !== -1) {
			this.#handlers.splice(idx, 1);
		}
	}

	// Вызов всех обработчиков с аргументом
	invoke(arg: T): void {
		this.#handlers.forEach((h) => h(arg));
	}
}
