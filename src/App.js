import React, { Component } from 'react';
import classNames from 'classnames';
import { AppTopbar } from './AppTopbar';
import { AppMenu } from './AppMenu';
import { AppInlineProfile } from './AppInlineProfile';
import { Route } from 'react-router-dom';
import { Dashboard } from './components/dashboard/Dashboard';
import NewProtocol from './components/protocol/NewProtocol';
import NewCategory from './components/protocol/NewCategory';
import Documentation from './components/Documentation';
import NewUser from './components/user/NewUser';
import { ScrollPanel } from 'primereact/components/scrollpanel/ScrollPanel';
import DocumentsUpload from './components/document/DocumentsUpload';
import NewCustomer from './components/customer/NewCustomer';
import NewEmployee from './components/employee/NewEmployee';
import Profile from './components/user/Profile';
import ProtocolReport from './components/report/ProtocolReport';

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './layout/layout.css';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			layoutMode: 'static',
			layoutColorMode: 'dark',
			staticMenuInactive: false,
			overlayMenuActive: false,
			mobileMenuActive: false,
			isLoginIn: false
		};

		this.onWrapperClick = this.onWrapperClick.bind(this);
		this.onToggleMenu = this.onToggleMenu.bind(this);
		this.onSidebarClick = this.onSidebarClick.bind(this);
		this.onMenuItemClick = this.onMenuItemClick.bind(this);
		this.createMenu();
	}

	onWrapperClick(event) {
		if (!this.menuClick) {
			this.setState({
				overlayMenuActive: false,
				mobileMenuActive: false
			});
		}

		this.menuClick = false;
	}

	onToggleMenu(event) {
		this.menuClick = true;

		if (this.isDesktop()) {
			if (this.state.layoutMode === 'overlay') {
				this.setState({
					overlayMenuActive: !this.state.overlayMenuActive
				});
			} else if (this.state.layoutMode === 'static') {
				this.setState({
					staticMenuInactive: !this.state.staticMenuInactive
				});
			}
		} else {
			const mobileMenuActive = this.state.mobileMenuActive;
			this.setState({
				mobileMenuActive: !mobileMenuActive
			});
		}

		event.preventDefault();
	}

	onSidebarClick() {
		this.menuClick = true;
		setTimeout(() => {
			this.layoutMenuScroller.moveBar();
		}, 500);
	}

	onMenuItemClick(event) {
		if (!event.item.items) {
			this.setState({
				overlayMenuActive: false,
				mobileMenuActive: false
			});
		}
	}

	createMenu() {
		this.menu = [
			{
				label: 'Início',
				icon: 'pi pi-fw pi-home',
				command: () => {
					window.location = '#/';
				}
			},

			{
				label: 'Protocolos',
				icon: 'pi pi-fw pi-globe',
				// badge: '9',
				items: [
					{
						label: 'Criar Protocolo',
						icon: 'pi pi-fw pi-chevron-right',
						command: () => {
							window.location = '#/new-protocol';
						}
					}
				]
			},
			{
				label: 'Cadastros',
				icon: 'pi pi-fw pi-chevron-right',

				items: [
					{
						label: 'Cliente',
						icon: 'pi pi-fw pi-chevron-right',
						command: () => {
							window.location = '#/new-customer';
						}
					},
					{
						label: 'Categoria de Protocolos',
						icon: 'pi pi-fw pi-tags',
						command: () => {
							window.location = '#/new-protocol-category';
						}
					},
					{
						label: 'Funcionários',
						icon: 'pi pi-fw pi-users',
						command: () => {
							window.location = '#/new-employee';
						}
					}
				]
			},
			{
				label: 'Relatórios',
				icon: 'pi pi-fw pi-file',
				items: [
					{
						label: 'Emitir Relatórios',
						icon: 'pi pi-fw pi-align-justify',
						command: () => {
							window.location = '#/report';
						}
					}
				]
			},
			{
				label: 'Documentos',
				icon: 'pi pi-fw pi-save',
				items: [
					{
						label: 'Fazer Upload',
						icon: 'pi pi-fw pi-copy',
						command: () => {
							window.location = '#/up-upload-document';
						}
					}
				]
			},
			{
				label: 'Manual de Uso',
				icon: 'pi pi-fw pi-question',
				command: () => {
					window.location = '#/documentacao';
				}
			},
			{
				label: 'Versão do Sistema',
				icon: 'pi pi-fw pi-info-circle',
				command: () => {
					window.location = '/';
				}
			}
		];
	}

	addClass(element, className) {
		if (element.classList) element.classList.add(className);
		else element.className += ' ' + className;
	}

	removeClass(element, className) {
		if (element.classList) element.classList.remove(className);
		else
			element.className = element.className.replace(
				new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'),
				' '
			);
	}

	isDesktop() {
		return window.innerWidth > 1024;
	}

	componentDidUpdate() {
		if (this.state.mobileMenuActive) this.addClass(document.body, 'body-overflow-hidden');
		else this.removeClass(document.body, 'body-overflow-hidden');
	}

	render() {
		let wrapperClass = classNames('layout-wrapper', {
			'layout-overlay': this.state.layoutMode === 'overlay',
			'layout-static': this.state.layoutMode === 'static',
			'layout-static-sidebar-inactive': this.state.staticMenuInactive && this.state.layoutMode === 'static',
			'layout-overlay-sidebar-active': this.state.overlayMenuActive && this.state.layoutMode === 'overlay',
			'layout-mobile-sidebar-active': this.state.mobileMenuActive
		});
		let sidebarClassName = classNames('layout-sidebar', {
			'layout-sidebar-dark': this.state.layoutColorMode === 'dark'
		});
		return (
			<div className={wrapperClass} onClick={this.onWrapperClick}>
				<AppTopbar onToggleMenu={this.onToggleMenu} />
				<div ref={(el) => (this.sidebar = el)} className={sidebarClassName} onClick={this.onSidebarClick}>
					<ScrollPanel ref={(el) => (this.layoutMenuScroller = el)} style={{ height: '100%' }}>
						<div className='layout-sidebar-scroll-content'>
							<div className='layout-logo' />
							<AppInlineProfile />
							<AppMenu model={this.menu} onMenuItemClick={this.onMenuItemClick} />
						</div>
					</ScrollPanel>
				</div>
				<div className='layout-main'>
					<Route path='/' exact component={Dashboard} />
					<Route path='/new-protocol' component={NewProtocol} />
					<Route path='/new-protocol-category' component={NewCategory} />
					<Route path='/up-upload-document' component={DocumentsUpload} />
					<Route path='/documentacao' component={Documentation} />
					<Route path='/new-user' exact component={NewUser} />
					<Route path='/report' exact component={ProtocolReport} />
					<Route path='/new-customer' component={NewCustomer} />
					<Route path='/new-employee' component={NewEmployee} />
					<Route path='/user-profile' component={Profile} />
				</div>
				<div className='layout-mask' />
			</div>
		);
	}
}

export default App;
