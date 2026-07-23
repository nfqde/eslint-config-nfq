// @ts-nocheck
class Test {
    value = 0;

    @bound
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
