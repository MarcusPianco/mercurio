import axios from 'axios';

export class CompanyService {
	getSectors(_this) {
		return axios.get('assets/demo/data/company-sectors.json').then((res) => res.data.data).then((data) => {
			_this.setState({ companySectorData: data });
			return data;
		});
	}
}
