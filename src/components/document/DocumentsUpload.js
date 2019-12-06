import React, { Component } from 'react';
import { FileUpload } from 'primereact/fileupload';
import { Growl } from 'primereact/growl';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { InputText } from 'primereact/inputtext';
// import { Button } from "primereact/button";
import { AutoComplete } from 'primereact/autocomplete';

export default class DocumentUpload extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataViewValue: [],
			layout: 'list',
			dataView: [ { name: 'Marcus' } ],
			client: ''
		};
		this.growl = new Growl();
	}

	onUpload() {
		this.growl.show({
			severity: 'info',
			summary: 'Success',
			detail: 'File Uploaded'
		});
	}

	render() {
		const dataViewHeader = (
			<div className='p-grid'>
				<div className='p-col-6 p-md-8 filter-container'>
					<div style={{ position: 'relative' }}>
						<InputText placeholder='Procurar Documentos' />
					</div>
				</div>
				<div className='p-col-6 p-md-4' style={{ textAlign: 'right' }}>
					<DataViewLayoutOptions
						layout={this.state.layout}
						onChange={(e) => this.setState({ layout: e.value })}
					/>
				</div>
			</div>
		);

		return (
			<div className='p-fluid'>
				<div className='p-grid'>
					<div className='p-col-12'>
						<div className='card card-w-title'>
							<h1>Adicionar Documentos</h1>
							<Growl ref={(el) => (this.growl = el)} />
							<div className='p-col-6'>
								<h3>Escolha o Cliente</h3>
								<AutoComplete
									minLength={1}
									placeholder='Clientes'
									id='acSimple'
									size={20}
									field='social_name'
									value={this.state.client}
								/>
							</div>
						</div>

						<div className='p-grid' />

						<FileUpload
							name='demo[]'
							url='./upload.php'
							onUpload={this.onUpload}
							multiple={true}
							accept='*'
							chooseLabel='Anexar'
							cancelLabel='Cancelar'
						/>
					</div>
				</div>
				<div className='p-grid'>
					<div className='p-col-12'>
						<div className='card card-w-title'>
							<h1>Documentos Já Enviados</h1>
							<DataView
								value={this.state.dataViewValue}
								filterBy='brand'
								itemTemplate={this.dataViewItemTemplate}
								paginatorPosition='both'
								paginator={true}
								rows={10}
								header={dataViewHeader}
								layout={this.state.layout}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
