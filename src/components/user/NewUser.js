import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Growl } from 'primereact/growl';
import { Password } from 'primereact/password';

export default class NewUser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sectors: [
				{ label: 'Selecione o Setor ', value: '' },
				{ label: 'Fiscal', value: 'Fiscal' },
				{ label: 'Contábil', value: 'Contábil' },
				{ label: 'Pessoal', value: 'Pessoal' },
				{ label: 'Comercial', value: 'Comercial' },
				{ label: 'Diretoria', value: 'Diretoria' }
			],
			rules: [
				{ label: 'Selecione o Tipo do Usuário', value: '' },
				{ label: 'Administrador', value: 'admin' },
				{ label: 'Usuário Comum', value: 'common' }
			],
			employees: [
				{ label: 'Selecione o Funcionário', value: '' },
				{ label: 'Marcus', value: 'marcus', id: '123456' },
				{ label: 'Hugo', value: 'hugo', id: '1234' }
			],
			userKind: '',
			sector: '',
			employee: '',

			password: '',
			confirmPassword: ''
		};
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	handleSubmit = () => {
		const { password, confirmPassword } = this.state;
		console.log(password, confirmPassword);
		if (password !== confirmPassword) {
			alert('Senhas Divergentes');
		} else {
			console.log('Senhas OK');
		}
	};

	render() {
		return (
			<div className='p-fluid p-col-10 p-md-8' style={{ marginRight: 'auto' }}>
				<div className='p-grid p-col-12'>
					<div className='card card-w-title'>
						<h1>Cadastro de Usuários</h1>
						<div className='p-grid p-col-12'>
							<div className='p-col-12 p-md-12'>
								<label>Nome do Usuário: </label>
								<InputText keyfilter='alpha' />
							</div>

							<div className='p-col-12 p-md-12'>
								<label>Senha </label>
								<Password
									value={this.state.password}
									onChange={this.handleChange}
									name='password'
									weakLabel={'Fraca'}
									strongLabel={'Forte'}
									mediumLabel={'Média'}
								/>
							</div>

							<div className='p-col-12 p-md-12'>
								<label>Confirmação de Senha </label>
								<Password
									onChange={this.handleChange}
									value={this.state.confirmpassword}
									name='confirmPassword'
								/>
							</div>

							<div className='p-col-12 p-md-12'>
								<label>Setor Associado: </label>
								<Dropdown
									options={this.state.sectors}
									value={this.state.sector}
									onChange={(event) =>
										this.setState({
											sector: event.value
										})}
									autoWidth={false}
								/>
							</div>
							<div className='p-col-12 p-md-12'>
								<label>Tipo de Usuário: </label>
								<Dropdown
									options={this.state.rules}
									value={this.state.userKind}
									onChange={(event) =>
										this.setState({
											userKind: event.value
										})}
									autoWidth={false}
									style={{ marginBottom: '10px' }}
								/>
							</div>
							<div className='p-col-12 p-md-12'>
								<label>Funcionário: </label>
								<Dropdown
									options={this.state.employees}
									value={this.state.employee}
									onChange={(event) =>
										this.setState({
											employee: event.value
										})}
									autoWidth={false}
									style={{ marginBottom: '10px' }}
								/>
							</div>
						</div>
						<div>
							<div className='p-col-12 p-md-12'>
								<Growl ref={(el) => (this.growl = el)} />

								<div style={{ float: 'right' }}>
									<Button
										style={{
											marginBottom: '10px',
											display: 'inline',
											marginLeft: '5px'
										}}
										onClick={this.handleSubmit}
										label='Salvar'
										className='p-button-success'
									/>
								</div>
								<div style={{ float: 'right' }}>
									<Button
										label='Cancelar'
										style={{
											marginBottom: '10px',
											display: 'inline'
										}}
										className='p-button-danger '
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
