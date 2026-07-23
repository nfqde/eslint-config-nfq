// @ts-nocheck
class Test {
    value = 0;

    @autobind
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
