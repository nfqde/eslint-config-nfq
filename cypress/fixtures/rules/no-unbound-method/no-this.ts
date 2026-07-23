// @ts-nocheck
class Test {
    method() {
        return 1;
    }

    register(handler: () => number) {
        handler();
    }

    setup() {
        this.register(this.method);
    }
}
