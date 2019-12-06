import React, { Component } from 'react';
import LoginService from '../service/LoginService';

export default class Documentation extends Component {
	constructor() {
		super();

		this.state = {
			documentationsData: [],
			login: 'marcus@test.com'
		};

		this.loginService = new LoginService();
	}

	render() {
		return (
			<div>
				<React.Fragment>
					<div />
					{(() => {
						console.log(this.loginService.SignIn());
					})()}
				</React.Fragment>
			</div>
		);
	}
}
