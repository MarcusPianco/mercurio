import React, { Component } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { MultiSelect } from "primereact/multiselect";

/**
 * [EntityList description]
 * @extends Component
 * description
 */

class EntityList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      cols: [],
      colOptions: []
    };
    this.onColumnToggle = this.onColumnToggle.bind(this);

    console.log(Object.keys(this.props.entity));
  }

  componentDidMount() {
    let colsFilter = this.props.entity.map(el => {
      return { field: el, header: el };
    });
    let datalistFiltered = this.props.data;

    let calOptions = colsFilter.map(col => {
      return { label: col.header, value: col };
    });

    this.setState({
      cols: colsFilter,
      colOptions: calOptions,
      dataList: datalistFiltered
    });
  }
  actionData = () => {
    return (
      <div>
        <Button
          type="button"
          icon="pi pi-trash"
          className="p-button-danger"
          style={{ marginRight: ".2em" }}
        />
        <Button
          type="button"
          icon="pi pi-pencil"
          className="p-button-success"
        />
      </div>
    );
  };

  onColumnToggle(event) {
    this.setState({ cols: event.value });
  }
  render() {
    const amount = this.state.dataList ? this.state.dataList.length : 0;

    let header = (
      <div style={{ textAlign: "left" }}>
        <MultiSelect
          value={this.state.cols}
          options={this.state.colOptions}
          onChange={this.onColumnToggle}
          style={{ width: "250px" }}
        />
      </div>
    );

    let columns = this.state.cols.map((col, i) => {
      return <Column key={col.field} field={col.field} header={col.header} />;
    });

    const optionsColunm = (
      <Column
        key={"options"}
        body={this.actionData}
        header={"Opções"}
        style={{ textAlign: "center", width: "7em" }}
      />
    );

    columns = [...columns, optionsColunm];

    console.log(columns);

    const footer =
      "Você tem " + amount + " Categorias de " + this.props.description;
    console.log(this.state.dataList);
    return (
      <div
        className="card p-lg-8"
        style={{ marginLeft: "auto", marginRight: "auto" }}
      >
        <div style={{ marginLeft: "auto", marginRight: "auto" }}>
          <div className="content-section implementation">
            <div className="content-section implementation">
              <DataTable
                value={this.state.dataList}
                header={header}
                footer={footer}
              >
                {columns}
              </DataTable>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EntityList;
