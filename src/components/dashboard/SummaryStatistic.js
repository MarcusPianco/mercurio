import React, { Component } from 'react';

class SummaryStatistic extends Component {
	render() {
		return (
			<div>
				<div className='card summary'>
					<span className='title'>{this.props.description}</span>
					<span className='detail' />
					<span className={`${this.props.color}`}>{this.props.amoutProtocols}</span>
				</div>
			</div>
		);
	}
}
export default SummaryStatistic;
