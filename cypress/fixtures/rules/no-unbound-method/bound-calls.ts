// @ts-nocheck
class Test {
    value = 0;

    method() {
        return this.value;
    }

    register(handler: () => number) {
        handler();
    }

    setup() {
        this.register(this.method.bind(this));
        this.register(this.method.call(this));
        this.register(this.method.apply(this));
    }
}
