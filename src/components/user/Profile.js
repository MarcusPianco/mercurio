import React, { Component } from 'react';
import Address from '../address/Address';

/**
 * [Profile description]
 * @extends Component
 */

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {
				name: 'Marcus Piancó',
				lastAccess: '10/01/2000',
				sector: 'Fiscal',
				protocolAmout: 202
			}
		};
	}

	render() {
		return (
			<div className='p-fluid p-col-8' style={{ marginLeft: 'auto', marginRight: 'auto' }}>
				<div className='p-grid '>
					<div className='card card-w-title'>
						<h1>Perfil</h1>
						<img src='assets/layout/images/profile.png' alt='' />
						<div className='p-grid p-col-12'>
							<div className='p-col-6'>
								<label style={{ fontSize: 'Large' }}>Usuário: {this.state.user.name}</label>
								<br />
								<label>Ultimo acesso: {this.state.user.lastAccess}</label>
							</div>
							<br />
							<div className='p-col-6'>
								<label style={{ fontSize: 'large' }}>Setor Associado: {this.state.user.sector}</label>
							</div>
							<div>
								<label style={{ fontSize: 'large' }}>
									Protocolos Enviados: {this.state.user.protocolAmout}
								</label>
							</div>
							<div className='p-col-12 p-lg-12'>
								<div className='card card-w-tit'>
									<h1>Dados do Funcionário</h1>
								</div>
								<div className='p-col-12'>
									<Address classParent='p-col-12' type='personal' />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Profile;
