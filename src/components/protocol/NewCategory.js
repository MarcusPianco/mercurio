import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Growl } from 'primereact/growl';
import { Messages } from 'primereact/messages';
import { CompanyService } from '../../service/CompanyService';
import PropTypes from 'prop-types';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import EntityList from '../report/EntityList';

/**
 * [state description]
 * @type {Object}
 */

export default class NewCategory extends Component {
	constructor(props) {
		super(props);

		this.state = {
			companySectorData: [],
			dataList: [ { Categoria: 'Imposto', Setor: 'Contábil' } ],
			sectors: [ { label: 'Escolhao seu', value: '' } ],
			sector: '',
			filteredSectorsData: '',
			protocolKind: ''
		};

		this.messages = new Messages();
		this.companyService = new CompanyService();
	}
	componentDidMount() {
		this.setState({
			companySectorData: this.companyService.getSectors(this)
		});
		this.setState({
			companySectorData: this.state.companySectorData.map((el) => Object.values(el))
		});
	}

	showKindSaved = () => {
		let msg = {
			severity: 'success',
			summary: 'Tipo Salvo Com sucesso',
			detail: 'Você acaba de criar um novo tipo de protocolo'
		};
		this.growl.show(msg);
		this.messages.show(msg);
	};

	render() {
		return (
			<React.Fragment>
				<div className='p-fluid' style={{ marginLeft: 'auto' }}>
					<div className='p-grid'>
						<div className='card card-w-title p-lg-8' style={{ marginLeft: 'auto', marginRight: 'auto' }}>
							<h1>Nova Categoria de Protocolos</h1>

							<div>
								<label>Descrição do Novo Tipo: </label>
								<InputText />
							</div>
							<div className='p-col-12'>
								<label>Setor: </label>
								<Dropdown
									options={this.state.companySectorData}
									value={this.state.sector}
									onChange={(event) => this.setState({ sector: event.value })}
									autoWidth={false}
									autoFocus={true}
								/>
							</div>
							<div className='p-col-12'>
								<Growl ref={(el) => (this.growl = el)} />

								<div style={{ float: 'right' }}>
									<Button
										style={{
											marginBottom: '10px',
											display: 'inline',
											marginLeft: '5px'
										}}
										onClick={this.showKindSaved}
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
				<EntityList
					description={'Lista de Categorias'}
					entity={[ 'Categoria', 'Setor' ]}
					data={this.state.dataList}
				/>
			</React.Fragment>
		);
	}
}

NewCategory.propTypes = {
	companySectorData: PropTypes.array
};
