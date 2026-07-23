// @ts-nocheck
import {makeAutoObservable} from 'mobx';

class Test {
    value = 0;

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true});
    }

    method() {
        return this.value;
    }

    register(handler: () => number) {
        handler();
    }

    setup() {
        this.register(this.method);
    }
}
