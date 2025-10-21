export enum RequestsType {
	GET = 'GET',
	POST = 'POST',
}

export async function requests(type: RequestsType, data: object): void {
	console.log(123);
	try {
		const response = await fetch('http://localhost:3000/api/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name: '123' }),
		});
		const result = await response.json();
		console.log(result);
	} catch (error) {
		console.log(error);
	}
}
