import React, { Component } from 'react';
import { ClientService } from '../../service/ClientService';
import { Growl } from 'primereact/growl';
import { Messages } from 'primereact/messages';
import { FileUpload } from 'primereact/fileupload';
import { AutoComplete } from 'primereact/autocomplete';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { EmployeeService } from '../../service/EmployeeService';
import { InputText } from 'primereact/inputtext';

class NewProtocol extends Component {
	constructor(props) {
		super(props);
		this.state = {
			date: '',
			client: '',
			filteredClients: '',
			clientsData: [],
			dropdownOriginSector: '',
			dropdownDestinySector: '',
			dropdownProtocolKind: '',
			kindProtocol: '',
			filteredEmployees: '',
			employee: '',
			employeesData: [],
			emaildestiny: '',

			//get on api
			sectors: [
				{ label: 'Selecione o Setor ', value: '' },
				{ label: 'Fiscal', value: 'Fiscal' },
				{ label: 'Contábil', value: 'Contábil' },
				{ label: 'Pessoal', value: 'Pessoal' },
				{ label: 'Comercial', value: 'Comercial' },
				{ label: 'Diretoria', value: 'Diretoria' }
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
			],

			//get on api

			checkboxValue: []
		};

		this.clientService = new ClientService();
		this.employeeService = new EmployeeService();

		this.messages = new Messages();

		this.onCheckboxChange = this.onCheckboxChange.bind(this);
		this.filterClient = this.filterClient.bind(this);
		this.filterEmployee = this.filterEmployee.bind(this);
		this.onUpload = this.onUpload.bind(this);
		this.showProtocolSaved = this.showProtocolSaved.bind(this);
	}

	componentDidMount() {
		this.setState({ clientsData: this.clientService.getClients(this) });
		this.setState({
			employeesData: this.employeeService.getEmployee(this)
		});
	}

	kindprotocolChoice = () => {
		let buttonSent;
		if (this.state.kindProtocol === 'Fisico' || this.state.kindProtocol == null) {
			buttonSent = (
				<div className='p-toolbar-group-right p-md-1'>
					<Button
						style={{ marginBottom: '10px' }}
						onClick={this.showProtocolSaved}
						label='Salvar'
						className='p-button-raise'
					/>
				</div>
			);
			return buttonSent;
		} else if (this.state.kindProtocol === 'Virtual') {
			buttonSent = (
				<div className='p-toolbar-group-right p-md-1'>
					<Button
						style={{ marginBottom: '10px' }}
						onClick={this.showProtocolSaved}
						label='Enviar'
						className='p-button-success'
					/>
				</div>
			);
			return buttonSent;
		}
	};

	filterClient(event) {
		const results = this.state.clientsData.filter((client) => {
			return client.social_name.toLowerCase().startsWith(event.query.toLowerCase());
		});

		this.setState({ filteredClients: results });

		const data = this.state.employeesData;
	}

	filterEmployee = (event) => {
		const results = this.state.employeesData.filter((employee) => {
			return employee.name.toLowerCase().startsWith(event.query.toLowerCase());
		});

		this.setState({ filteredEmployees: results });
	};

	showProtocolSaved() {
		let msg = {
			severity: 'success',
			summary: 'Protocolo Salvo Com sucesso',
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
	onUpload() {
		this.growl.show({
			severity: 'info',
			summary: 'Success',
			detail: 'File Uploaded'
		});
	}

	onHandleChange = (event) => this.setState({ [event.target.name]: event.target.value });

	enableEmaildestinyField = () => {
		let inputFieldEmailSend = '';
		if (this.state.kindProtocol === 'Virtual') {
			inputFieldEmailSend = (
				<React.Fragment>
					<div className='p-col-4  p-md-4'>
						<label htmlFor='acSimple'>Email de Destino</label>
						<InputText
							placeholder='example@email.com'
							value={this.state.emaildestiny}
							onChange={this.onHandleChange}
							name='emaildestiny'
						/>
					</div>
				</React.Fragment>
			);
			return inputFieldEmailSend;
		} else {
			return null;
		}
	};
	render() {
		console.log('Chamou');
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
							<h1>Novo Protocolo</h1>
							<div className='p-grid'>
								<div className='p-col-12 '>
									<h3>Funcionária: Maria do Socorro Silva Santos</h3>
								</div>
								<br />

								<div className='p-col-4 p-md-4'>
									<label htmlFor='dropdown'>Departamento de Origem</label>
									<Dropdown
										options={this.state.sectors}
										value={this.state.dropdownOriginSector}
										onChange={(event) =>
											this.setState({
												dropdownOriginSector: event.value
											})}
										autoWidth={false}
									/>
								</div>

								<div className='p-col-4 p-md-4'>
									<label htmlFor='input'>Categoria Protocolo</label>
									<Dropdown
										options={this.state.protocolcategory}
										value={this.state.dropdownProtocolKind}
										onChange={(event) =>
											this.setState({
												dropdownProtocolKind: event.value
											})}
										autoWidth={false}
									/>
								</div>

								<div className='p-col-4  p-md-4'>
									<label htmlFor='acSimple'>Cliente</label>
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
												filteredClients: null
											})}
									/>
								</div>

								<div className='p-col-4 p-md-4'>
									<label htmlFor='dropdown'>Departamento de Destino</label>
									<Dropdown
										options={this.state.sectors}
										value={this.state.dropdownDestinySector}
										onChange={(event) =>
											this.setState({
												dropdownDestinySector: event.value
											})}
										autoWidth={false}
									/>
								</div>

								<div className='p-col-4  p-md-4'>
									<label htmlFor='acSimple'>Funcionário Responsável</label>
									<AutoComplete
										minLength={1}
										placeholder='Funcionário'
										id='acSimple'
										size={20}
										field='name'
										suggestions={this.state.filteredEmployees}
										completeMethod={this.filterEmployee}
										value={this.state.employee}
										onChange={(event) =>
											this.setState({
												employee: event.value,
												filteredEmployees: null
											})}
									/>
								</div>
								<div className='p-col-4 p-md-4'>
									<label htmlFor='dropdown'>Tipo de Protocolo</label>
									<Dropdown
										options={this.state.kinds}
										value={this.state.kindProtocol}
										onChange={this.onHandleChange}
										autoWidth={false}
										name='kindProtocol'
									/>
								</div>

								{this.enableEmaildestinyField()}
							</div>
						</div>
					</div>
					<div className='p-col-12 p-lg-4'>
						<div className='card card-w-title'>
							<h1>Informações Extra</h1>
							<div className='p-grid'>
								<div className='p-col-12 p-md-12'>
									<label>Status: Em Aberto </label>
								</div>
								<div className='p-col-12 p-md-12'>
									<label>
										Data de Envio: 00/00/000
										<div />
									</label>
								</div>

								<div className='p-col-12 p-md-12'>
									<label htmlFor='textarea'>Observações</label>
									<InputTextarea id='textarea' rows={7} cols={25} autoResize={true} />
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='p-col-12 p-md-12'>
					<div className='card card-w-title'>
						<h1>Documentos do Protocolo</h1>
						<Toolbar>
							<div className='p-toolbar-group-right'>
								<Growl ref={(el) => (this.growl = el)} />

								<FileUpload
									name='demo[]'
									url='./upload'
									onUpload={this.onUpload}
									multiple={true}
									accept='image/*'
									chooseLabel='Anexar'
									cancelLabel='Cancelar'
								/>
								{/* <Button icon='pi pi-plus' style={{ marginRight: '.25em' }} /> */}

								{/* <Button icon='pi pi-times' className='p-button-danger' /> */}
							</div>
						</Toolbar>
					</div>
				</div>

				{this.kindprotocolChoice()}

				<div className='p-md-1 p-toolbar-group-right'>
					<Button
						label='Cancelar'
						style={{ marginBottom: '10px' }}
						className='p-button-danger p-button-raised'
						onClick={() => (window.location = '#/')}
					/>
				</div>
			</div>
		);
	}
}

export default NewProtocol;
