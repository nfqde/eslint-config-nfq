// @ts-nocheck
class Test {
    static method() {
        return this;
    }

    register(handler: () => unknown) {
        handler();
    }

    setup() {
        this.register(Test.method);
    }
}
