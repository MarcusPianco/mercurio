import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';

/**
 * [kindAddress description]
 * @type {[type]}
 */

export default class Address extends Component {
	constructor(props) {
		super(props);
		this.state = {
			addresses: [],
			logradouro: '',
			numero: '',
			numero: '',
			cidade: '',
			estado: '',
			email: '',
			celular: '',
			foneFixo: ''
		};

		this.kindAddress = this.kindAddress.bind(this);
	}

	kindAddress = () => {
		if (this.props.type === 'personal') {
			return;
		} else {
			return (
				<div className='p-col-6 p-md-6'>
					<label htmlFor='textarea'>Fixo:</label>
					<InputText
						name='foneFixo'
						value={this.state.foneFixo}
						onChange={this.handleChange}
						placeholder='(82)99999-9999'
					/>
				</div>
			);
		}
	};

	handleChange = (event) => {
		const target = event.target;
		const value = target.type == 'checkbox' ? target.cheked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	};

	render() {
		return (
			// <form>
			<div className={`${this.props.classParent}`}>
				<div className='card card-w-title'>
					<h1>Endereço</h1>
					<div className='p-grid'>
						<div className='p-col-10 p-md-10'>
							<label>Logradouro:</label>
							<InputText
								name='logradouro'
								keyfilter='alphanumeric'
								value={this.state.logradouro}
								onChange={this.handleChange}
							/>
						</div>
						<div className='p-col-2 p-md-2'>
							<label htmlFor='textarea'>N:</label>
							<InputText
								size={2}
								name='numero'
								keyfilter='int'
								value={this.state.numero}
								onChange={this.handleChange}
							/>
						</div>
						<div className='p-col-8 p-md-8'>
							<label htmlFor='textarea'>Cidade:</label>
							<InputText
								name='cidade'
								keyfilter='alpha'
								value={this.state.cidade}
								onChange={this.handleChange}
							/>
						</div>

						<div className='p-col-4 p-md-4'>
							<label htmlFor='textarea'>CEP: </label>
							<InputText keyfilter='int' name='cep' value={this.state.cep} onChange={this.handleChange} />
						</div>
						<div className='p-col-2 p-md-2'>
							<label htmlFor='textarea'>UF:</label>
							<InputText
								keyfilter='alpha'
								name='estado'
								value={this.state.estado}
								onChange={this.handleChange}
							/>
						</div>
						<div className='p-col-10 p-md-0'>
							<label htmlFor='textarea'>Email:</label>
							<InputText
								placeholder='example@email.com'
								name='email'
								value={this.state.email}
								onChange={this.handleChange}
								keyfilter='email'
							/>
						</div>
						<div className='p-col-6 p-md-6'>
							<label htmlFor='textarea'>Celular:</label>
							<InputMask
								mask='99-999999999'
								placeholder='00-00000000'
								value={this.state.celular}
								name='celular'
								onChange={this.handleChange}
							/>
						</div>
						{this.kindAddress()}
					</div>
				</div>
			</div>
		);
	}
}
