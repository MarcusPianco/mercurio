import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Consumer } from '../../context/Provider';

export default class ProtocolReport extends Component {
    constructor() {
        super();
        this.state = {};
        this.onEditorValueChange = this.onEditorValueChange.bind(this);
        this.statusEditor = this.statusEditor.bind(this);
    }

    onEditorValueChange(props, value) {
        console.log(props);
        console.log(value);

        // let updatedCars = [...props.value];
        // updatedCars[props.rowIndex][props.field] = value;
        // this.setState({ protocols: updatedCars });
    }

    statusEditor(props) {
        let status = [
            { label: 'Aberto', value: 'Aberto' },
            { label: 'Pendente', value: 'Pendente' },
            { label: 'Enviado', value: 'Enviado' },
            { label: 'Em espera', value: 'Em espera' },
            { label: 'Recebido', value: 'Recebido' },
            { label: 'Finalizado', value: 'Finalizado ' }
        ];

        return (
            <Dropdown
                value={props.value[props.rowIndex].status}
                options={status}
                onChange={e => this.onEditorValueChange(props, e.value)}
                style={{ width: '100%' }}
            />
        );
    }

    render() {
        return (
            <Consumer>
                {({ protocols }) => {
                    protocols = protocols.map(protocol => {
                        let { status } = protocol;

                        switch (status) {
                            case 'open':
                                status = 'Aberto';
                                break;
                            case 'pending':
                                status = 'Pendente';
                                break;
                            case 'sent':
                                status = 'Enviado';
                                break;
                            case 'waiting':
                                status = 'Em espera';
                                break;
                            case 'received':
                                status = 'Recebido';
                                break;
                            case 'finished':
                                status = 'Finalizado';
                                break;
                        }

                        protocol.protocolkind = protocol.protocolkind = 'fisical' ? 'Físico' : 'Virtual';

                        protocol.status = status;

                        return protocol;
                    });

                    var header = (
                        <div style={{ textAlign: 'left' }}>
                            <i className="pi pi-search" style={{ margin: '4px 4px 0 0' }} />
                            <InputText
                                type="search"
                                onInput={e =>
                                    this.setState({
                                        globalFilter: e.target.value
                                    })
                                }
                                placeholder="Global Search"
                                size="50"
                            />
                        </div>
                    );

                    return (
                        <DataTable
                            ref={el => (this.dt = el)}
                            value={protocols}
                            paginator={true}
                            rows={20}
                            header={header}
                            scrollable={true}
                            editable={true}
                            globalFilter={this.state.globalFilter}
                        >
                            <Column
                                field="description"
                                header="Descrição"
                                style={{ width: '250px', height: '3.5em' }}
                                sortable={true}
                                filter={true}
                                filterMatchMode="contains"
                            />
                            <Column
                                field="status"
                                header="Status"
                                style={{ width: '250px', height: '3.5em' }}
                                sortable={true}
                                filter={true}
                                editor={this.statusEditor}
                                filterMatchMode="contains"
                            />
                            <Column
                                field="company_id"
                                header="Empresa"
                                style={{ width: '250px', height: '3.5em' }}
                                sortable={true}
                                filter={true}
                                filterMatchMode="contains"
                            />
                            <Column
                                field="customer_id"
                                header="Cliente"
                                style={{ width: '250px', height: '3.5em' }}
                                sortable={true}
                                filter={true}
                                filterMatchMode="contains"
                            />
                            <Column
                                field="protocolkind"
                                header="Tipo protocolo"
                                style={{ width: '250px', height: '3.5em' }}
                                sortable={true}
                                filter={true}
                                filterMatchMode="contains"
                            />
                            <Column
                                field="protocol_category_id"
                                header="Categoria protocolo"
                                style={{ width: '250px', height: '3.5em' }}
                                sortable={true}
                                filter={true}
                                filterMatchMode="contains"
                            />
                            <Column
                                field="department_origin_id"
                                header="Dep. origem"
                                style={{ width: '250px', height: '3.5em' }}
                                sortable={true}
                                filter={true}
                                filterMatchMode="contains"
                            />
                            <Column
                                field="department_destiny_id"
                                header="Dep. destino"
                                style={{ width: '250px', height: '3.5em' }}
                                sortable={true}
                                filter={true}
                                filterMatchMode="contains"
                            />
                            <Column
                                field="received_date"
                                header="Recebido em"
                                style={{ width: '250px', height: '3.5em' }}
                                sortable={true}
                                filter={true}
                                filterMatchMode="contains"
                            />
                            <Column
                                field="sent_date"
                                header="Enviado em"
                                style={{ width: '250px', height: '3.5em' }}
                                sortable={true}
                                filter={true}
                                filterMatchMode="contains"
                            />
                            <Column
                                field="employee_origin_id"
                                header="Func. origem"
                                style={{ width: '250px', height: '3.5em' }}
                                sortable={true}
                                filter={true}
                                filterMatchMode="contains"
                            />
                            <Column
                                field="protocol_category_id"
                                header="Categorias"
                                style={{ width: '250px', height: '3.5em' }}
                                sortable={true}
                                filter={true}
                                filterMatchMode="contains"
                            />
                            <Column
                                field="employee_destiny_id"
                                header="Func. destino"
                                style={{ width: '250px', height: '3.5em' }}
                                sortable={true}
                                filter={true}
                                filterMatchMode="contains"
                            />
                            <Column
                                field="rmk"
                                header="Observações"
                                style={{ width: '250px', height: '3.5em' }}
                                sortable={true}
                                filter={true}
                                filterMatchMode="contains"
                            />
                        </DataTable>
                    );
                }}
            </Consumer>
        );
    }
}
