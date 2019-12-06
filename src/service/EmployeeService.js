import axios from 'axios';

export class EmployeeService {
	getEmployee(_this) {
		return axios.get('assets/demo/data/employees.json').then((res) => res.data.data).then((data) => {
			_this.setState({ employeesData: data });
			return data;
		});
	}
}
