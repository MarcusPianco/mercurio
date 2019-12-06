import React, { Component } from "react";
import { Panel } from "primereact/panel";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { Chart } from "primereact/chart";
import ProtocolService from "../../service/ProtocolService";
import { Consumer } from "../../context/Provider";
import SummaryStatistic from "./SummaryStatistic";
/*
Dash board Component provide an interface of comunication about informations
that can be use to facility the management of Protocols and news activities.
This component extends of a UI of PrimeReact using the AdminTheme example.
Was mofified to specific use in project Mercurio

Author: Marcus Piancó
Date: 20/09/2018
This component Include chield components:

Pie Data;
Real time Activities;
Statistical Protocols;
TaskList;
*/
export class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      tasks: [],
      city: null,
      pieData: {
        labels: ["Protocolos Enviados", "Pendentes", "Não Enviados"],
        datasets: [
          {
            data: [600, 50, 100],
            backgroundColor: ["#4CAF50", "#FFC107", "#ef6262"],
            hoverBackgroundColor: ["#A5D6A7", "#FFE082", "#ef6262"]
          }
        ]
      },

      protocols: [],
      sendProtocols: "",
      amoutSent: 0,
      amoutWait: 0,
      amoutPending: 0
    };

    this.onTaskChange = this.onTaskChange.bind(this);
    this.protocolsService = new ProtocolService();
    this.getProtocolStatistics = this.getProtocolStatistics.bind(this);
  }

  /**
   * [onTaskChange description]
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */

  onTaskChange(e) {
    let selectedTasks = [...this.state.tasks];
    if (e.checked) selectedTasks.push(e.value);
    else selectedTasks.splice(selectedTasks.indexOf(e.value), 1);

    this.setState({ tasks: selectedTasks });
  }

  /**
   * [getProtocolStatistics description]
   * @param  {[type]} protocols [description]
   * @param  {[type]} status    [description]
   * @return {[type]}           [description]
   */
  getProtocolStatistics(protocols, status) {
    switch (status) {
      case "sent":
        return Array.from(protocols).filter(
          protocol => protocol.status === "sent"
        ).length;

      case "pending":
        return Array.from(protocols).filter(
          protocol => protocol.status === "pending"
        ).length;

      case "waiting":
        return Array.from(protocols).filter(
          protocol => protocol.status === "waiting"
        ).length;

      default:
        return;
    }
  }

  render() {
    return (
      <Consumer>
        {value => {
          const { protocols } = value;

          return (
            <div className="p-grid p-fluid dashboard">
              <div className="p-col-12 p-lg-4">
                <SummaryStatistic
                  description="Protocolos Enviados"
                  amoutProtocols={this.getProtocolStatistics(protocols, "sent")}
                  color="count visitors"
                />
              </div>
              <div className="p-col-12 p-lg-4">
                <SummaryStatistic
                  description="Protocolos Pendentes"
                  amoutProtocols={this.getProtocolStatistics(
                    protocols,
                    "waiting"
                  )}
                  color="count purchases"
                />
              </div>

              <div className="p-col-12 p-lg-4">
                <SummaryStatistic
                  description="Protocolos Não Enviados"
                  amoutProtocols={this.getProtocolStatistics(
                    protocols,
                    "pending"
                  )}
                  color="count revenue"
                />
              </div>

              <div className="p-col-12 p-md-6 p-lg-4">
                <Panel header="Tarefas" style={{ height: "100%" }}>
                  <ul className="task-list">
                    <li>
                      <Checkbox
                        value="task1"
                        onChange={this.onTaskChange}
                        checked={
                          this.state.tasks.indexOf("task1") > -1 ? true : false
                        }
                      />
                      <span className="task-name">Enviar Documento JC</span>
                      <Button icon="pi pi-check" />
                    </li>
                  </ul>
                </Panel>
              </div>

              <div className="p-col-12 p-lg-4">
                <div className="card">
                  <h1 className="centerText">Estatísticas de Protocolos</h1>
                  <Chart
                    type="doughnut"
                    data={this.state.pieData}
                    height="150"
                    onChange={this.changePieDataHandle}
                  />
                </div>
              </div>

              <div className="p-col-12 p-lg-4">
                <Panel
                  header="Histórico de Operações"
                  style={{ height: "100%" }}
                >
                  <div className="activity-header">
                    <div className="p-grid">
                      <div className="p-col-6">
                        <span
                          style={{
                            fontWeight: "bold"
                          }}
                        >
                          Últimas Atividades
                        </span>
                        <p>Atualizado a 2 minutos</p>
                      </div>
                      <div className="p-col-6" style={{ textAlign: "right" }}>
                        <Button label="Atualizar" icon="pi pi-refresh" />
                      </div>
                    </div>
                  </div>

                  <ul className="activity-list">
                    <li>
                      <div className="count">3</div>
                      <div className="p-grid">
                        <div className="p-col-6">Recebidos</div>
                        <div className="p-col-6">Cliente A</div>
                      </div>
                    </li>
                    <li>
                      <div
                        className="count"
                        style={{
                          backgroundColor: "#f9c851"
                        }}
                      >
                        1
                      </div>
                      <div className="p-grid">
                        <div className="p-col-6">Pendente</div>
                        <div className="p-col-6">Cliente B</div>
                      </div>
                    </li>
                    <li>
                      <div
                        className="count"
                        style={{
                          backgroundColor: "#20d077"
                        }}
                      >
                        2
                      </div>
                      <div className="p-grid">
                        <div className="p-col-6">Entregue</div>
                        <div className="p-col-6">Cliente C</div>
                      </div>
                    </li>
                    <li>
                      <div
                        className="count"
                        style={{
                          backgroundColor: "#f9c851"
                        }}
                      >
                        1
                      </div>
                      <div className="p-grid">
                        <div className="p-col-6">Pendente</div>
                        <div className="p-col-6">Cliente D</div>
                      </div>
                    </li>
                    <li>
                      <div
                        className="count"
                        style={{
                          backgroundColor: "#007be5"
                        }}
                      >
                        3
                      </div>
                      <div className="p-grid">
                        <div className="p-col-6">Recebidos</div>
                        <div className="p-col-6">Cliente E</div>
                      </div>
                    </li>
                    <li>
                      <div
                        className="count"
                        style={{
                          backgroundColor: "#ef6262"
                        }}
                      >
                        2
                      </div>
                      <div className="p-grid">
                        <div className="p-col-6">Não Entregue</div>
                        <div className="p-col-6">Cliente F</div>
                      </div>
                    </li>
                  </ul>
                </Panel>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
