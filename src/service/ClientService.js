import axios from "axios";

export class ClientService {
	getClients(_this) {
		return axios
			.get("http://localhost:3001/v1/companies")
			.then(res => res.data)
			.then(data => {
				_this.setState({ clientsData: data });
				return data;
			});
	}
}
