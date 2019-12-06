import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import Address from '../address/Address';
import { AutoComplete } from 'primereact/autocomplete';
import { Button } from 'primereact/button';
import EntityList from '../report/EntityList';

/**
 * [state description]
 * @type {Object}
 */
export default class NewEmployee extends Component {
	constructor(props) {
		super(props);
		this.state = {
			datalist: [ { Nome: 'Marcus', Setor: 'Contábil' } ],

			sectors: [
				{ label: 'Selecione o Setor ', value: '' },
				{ label: 'Fiscal', value: 'Fiscal' },
				{ label: 'Contábil', value: 'Contábil' },
				{ label: 'Pessoal', value: 'Pessoal' },
				{ label: 'Comercial', value: 'Comercial' },
				{ label: 'Diretoria', value: 'Diretoria' }
			],
			sector: '',
			employeeKinds: [
				{ label: 'Selecione um Tipo', value: '' },
				{ label: 'Interno', value: 'interno' },
				{ label: 'Externo', value: 'externo' }
			],
			employeeKind: '',
			filteredClients: [],
			client: ''
		};
		this.filterClient = this.filterClient.bind(this);
		this.kindEmployeeverify = this.kindEmployeeverify.bind(this);
	}

	filterClient = (event) => {};

	kindEmployeeverify = () => {
		if (this.state.employeeKind === 'interno') {
			return <Address clasaParent='p-col-12 p-lg-4' type='personal' />;
		} else if (this.state.employeeKind === 'externo') {
			return (
				<div className='p-col-6  p-md-6 p-lg-4'>
					<label>Cliente</label>
					<AutoComplete
						minLength={1}
						placeholder='Clientes'
						id='acSimple'
						size={20}
						field='social_name'
						suggestions={this.state.filteredClients}
						completeMethod={this.filterClient}
						value={this.state.client}
						onChange={(event) =>
							this.setState({
								client: event.value,
								filteredClients: []
							})}
					/>
				</div>
			);
		}
	};

	render() {
		return (
			<div className='p-fluid'>
				<div className='p-grid'>
					<div className='p-md-8' style={{ marginLeft: 'auto', marginRight: 'auto' }}>
						<div className='card card-w-title'>
							<h1>Novo Funcioário</h1>
							<div className='p-grid'>
								<div className='p-col-6 p-md-6'>
									<label htmlFor='employeeform'>Nome:</label>
									<InputText />
								</div>
								<div className='p-col-6 p-md-6'>
									<label htmlFor='employeeform' />
									<label>Setor: </label>
									<Dropdown
										options={this.state.sectors}
										value={this.state.sector}
										onChange={(event) => this.setState({ sector: event.value })}
										autoWidth={false}
									/>
								</div>
								<div className='p-col-6 p-md-6'>
									<label htmlFor='employeeform' />
									<label>Tipo de Funcionário: </label>
									<Dropdown
										options={this.state.employeeKinds}
										value={this.state.employeeKind}
										onChange={(event) => this.setState({ employeeKind: event.value })}
										autoWidth={false}
									/>
								</div>
							</div>
							{this.kindEmployeeverify()}
							<div className='p-col-12 p-md-2'>
								{' '}
								<Button
									className='p-button-raised'
									label='Salvar'
									onClick={() => console.log('Clicou')}
								/>
							</div>
						</div>
					</div>
				</div>
				<EntityList
					description={'Lista de Funcionários'}
					entity={[ 'Nome', 'Setor', 'Contato' ]}
					data={this.state.datalist}
				/>
			</div>
		);
	}
}
