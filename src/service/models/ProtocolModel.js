import Model from './Model';
import CompanyModel from './CompanyModel';

export default class ProtocolModel extends RepositoryModel {
    properties = ['id', 'description', 'protocolkind', 'status'];

    relations = {
        company: CompanyModel
        // 'customer',
        // 'departament_origin',
        // 'departament_destiny',
        // 'category',
        // 'employee_origin',
        // 'employee_destiny'
    };
}
