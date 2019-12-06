import axios from 'axios';

export default class DocumentationService {
	getDocumentation(_this) {
		return axios.get('http://localhost:3001/v1/companies').then((res) => res.data.data).then((data) => {
			_this.setState({ documentationsData: data });
			return data;
		});
	}
}
