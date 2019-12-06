import { RootStore } from '../Store';

export default class Controller {
    store;
    storeProperty;
    objects;

    constructor(property) {
        this.store = RootStore.getStore();
        this.storeProperty = property;
        this.objects = this.store.getProperty(property);
    }

    updateStore = () => {
        Objects;
    };

    all = () => objects;

    find = id => this.objects.filter(object => object.id === id);
}
