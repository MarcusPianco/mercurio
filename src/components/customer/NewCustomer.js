import React, { Component } from 'react';
import { Messages } from 'primereact/messages';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { EmployeeService } from '../../service/EmployeeService';
import { InputText } from 'primereact/inputtext';
import Address from '../address/Address';

class NewCustomer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			date: '',
			client: '',
			filteredClients: '',
			clientsData: [],
			dropdownKindCompany: '',
			dropdownDestinySector: '',
			dropdownCompanyActivity: '',
			cnpjCpf: '',
			socialName: '',

			dropdownProtocolKind: '',
			kindProtocol: '',
			filteredEmployees: '',
			employee: '',
			employeesData: [],
			emaildestiny: '',
			checkboxValue: [],
			layout: 'list',

			//get on api
			companyKinds: [
				{ label: 'Selecione o Tipo ', value: '' },
				{ label: 'Simples', value: 'simples' },
				{ label: 'Lucro Real', value: 'lucroreal' },
				{ label: 'Lucro Presumido', value: 'lucropresumido' }
			],
			companyActivity: [
				{ label: 'Selecione a Atividade ', value: '' },
				{ label: 'Serviço', value: 'servico' },
				{ label: 'Comércio', value: 'comercio' }
			],
			//get on api
			kinds: [
				{ label: 'Escolha um Tipo', value: '' },
				{ label: 'Virtual', value: 'Virtual' },
				{ label: 'Físico', value: 'Fisico' }
			],
			//get on api
			protocolcategory: [
				{ label: 'Escolhea uma Categoria', value: '' },
				{ label: 'Imposto', value: 'Imposto' },
				{ label: 'Folha de Pagamento', value: 'Folha de Pagamento' },
				{ label: 'Sped', value: 'Sped' },
				{ label: 'GRU', value: 'GRU' }
			]
		};

		this.employeeService = new EmployeeService();

		this.messages = new Messages();

		this.onCheckboxChange = this.onCheckboxChange.bind(this);

		this.filterEmployee = this.filterEmployee.bind(this);

		this.showCustomerSaved = this.showCustomerSaved.bind(this);
	}

	filterEmployee = (event) => {
		const results = this.state.employeesData.filter((employee) => {
			return employee.name.toLowerCase().startsWith(event.query.toLowerCase());
		});

		this.setState({ filteredEmployees: results });
	};

	showCustomerSaved() {
		let msg = {
			severity: 'success',
			summary: 'CLiente Salvo Com sucesso',
			detail: ''
		};
		this.growl.show(msg);
		this.messages.show(msg);
		console.log(this.state);
	}

	onCheckboxChange(event) {
		let selected = [ ...this.state.checkboxValue ];

		if (event.checked) selected.push(event.value);
		else selected.splice(selected.indexOf(event.value), 1);

		this.setState({ checkboxValue: selected });
	}

	onHandleChange = (event) => {
		const target = event.target;
		const value = target.type == 'checkbox' ? target.cheked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	};

	render() {
		const { error, loading } = this.props;
		if (error) {
			return <div>Error! {error.message}</div>;
		}

		if (loading) {
			return <div>Loading...</div>;
		}
		return (
			<div className='p-fluid'>
				<div className='p-grid'>
					<div className='p-col-12 p-lg-8'>
						<div className='card card-w-title'>
							<h1>Novo Cliente</h1>
							<div className='p-grid'>
								<br />
								<div className='p-col-8 p-md-8'>
									<label htmlFor='dropdown'>Razão Social:</label>
									<InputText
										keyfilter='alphanum'
										value={this.state.socialName}
										name='socialName'
										onChange={this.onHandleChange}
									/>
								</div>
								<div className='p-col-4 p-md-4'>
									<label>CNPJ/CPF:</label>
									<InputText
										keyfilter='alphanumeric'
										placeholder='00.000.000./0001-09'
										value={this.state.cnpjCpf}
										name='cnpjCpf'
										onChange={this.onHandleChange}
									/>
								</div>
								<div className='p-col-6 p-md-4'>
									<label htmlFor='dropdown'>Regime Tributário</label>
									<Dropdown
										options={this.state.companyKinds}
										name='dropdownKindCompany'
										value={this.state.dropdownKindCompany}
										onChange={this.onHandleChange}
										autoWidth={false}
									/>
								</div>

								<div className='p-col-6 p-md-4'>
									<label>Inscrição Estadual:</label>
									<InputText placeholder='000.000.00-0' keyfilter='alphanum' />
								</div>
								<div className='p-col-6 p-md-4'>
									<label>Tipo de Atividade:</label>
									<Dropdown
										options={this.state.companyActivity}
										value={this.state.dropdownCompanyActivity}
										onChange={this.onHandleChange}
										name='dropdownCompanyActivity'
										autoWidth={false}
									/>
								</div>
							</div>
						</div>
					</div>

					<Address classParent='p-col-12 p-lg-4' type='company' />
				</div>
				<div className='p-col-12'>
					<div className='card card-w-title'>
						<h1>Funcionários</h1>
						<Toolbar>
							<div className='p-toolbar-group-right' />
						</Toolbar>
					</div>
				</div>
				<div className='p-toolbar-group-right p-md-1'>
					<Button
						style={{ marginBottom: '10px' }}
						onClick={this.showProtocolSaved}
						label='Salvar'
						className='p-button-success'
					/>
				</div>
				<div className='p-md-1 p-toolbar-group-right'>
					<Button
						label='Cancelar'
						style={{ marginBottom: '10px' }}
						className='p-button-danger p-button-raised'
					/>
				</div>
			</div>
		);
	}
}

export default NewCustomer;
