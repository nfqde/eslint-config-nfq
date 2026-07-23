// @ts-nocheck
class Test {
    value = 0;

    method() {
        return this.value;
    }

    constructor() {
        this.method = this.method.bind(this);
    }
}
