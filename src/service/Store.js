import { Component as ReactComponent } from 'react';

export class RootStore {
    static store;
    static rootComponent;

    static getStore() {
        if (!this.store) {
            this.store = new Store();
        }

        return this.store;
    }

    static setRootComponent = component => {
        if (component instanceof ReactComponent) this.rootComponent = component;
    };

    static update = () => this.component.forceUpdate();
}

export class Store {
    store = {};

    constructor() {
        this.getProperty = this.getProperty.bind(this);
        this.setProperty = this.setProperty.bind(this);
    }

    getProperty = name => this.store[name];

    setProperty = (name, data) => (this.store[name] = data);
}

export class Model {
    properties = ['id', 'name'];
    object = {};

    constructor(values) {
        properties.forEach(prop => (this[property] = values[property]));
    }
}
