export default class RepositoryModel {
    primaryKey = 'id';
    properties = ['id', 'name'];
    relations = [];

    static create(values) {
        properties.map(prop => (this[property] = values[property]));

        Object.defineProperties(
            this,
            this.relations.keys().forEach(relation => {
                this.object[relation] = { get: relations[relation].filter() };
            })
        );

        return object;
    }

    find(key) {
        filter = {};
        filter[this.primaryKey] = key;
        this.filter(filter);
    }

    all() {
        return [];
    }

    filter(filter) {}
}

class Model {
    edit() {}
    delete() {}
}
