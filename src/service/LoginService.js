import axios from 'axios';

class LoginService {
	SignIn = async () => {
		let data2;

		const rawResponse = await axios
			.post(
				'http://localhost:3001/auth/sign_in',
				{},
				{
					headers: {
						email: 'jodywiegand@abernathy.info',
						password: '12345678'
					}
				}
			)
			.then((data) => {
				data2 = data.headers;
			});
		return data2;
	};
}

export default LoginService;
