import axios from "axios";
export default class ProtocolService {
	getProtocols(_this) {
		return axios
			.get("http://localhost:3001/v1/protocols")
			.then(res => res.data)
			.then(data => {
				_this.setState({ protocols: data });
				// console.log(data);
				return data;
			});
	}
}
