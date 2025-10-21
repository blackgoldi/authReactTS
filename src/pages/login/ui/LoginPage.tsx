import { requests, RequestsType } from '../api/api.tsx';

export function LoginPage() {
	function handleSubmit(event) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const login = formData.get('login');
		const password = formData.get('pass');
		console.log(`Логин: ${login} \nПароль: ${password}`);
	}

	return (
		<div>
			<form onSubmit={handleSubmit} action="" method="POST">
				<p>
					<label htmlFor="login">Логин </label>
					<input type="text" name="login" id="login" required />
				</p>
				<p>
					<label htmlFor="pass">Пароль </label>
					<input type="password" name="pass" id="pass" required />
				</p>
				<button type="submit">Войти</button>
			</form>
			{/* <button onClick={(e) => requests(RequestsType.POST, {})}>ТЕСТ</button> */}
		</div>
	);
}
