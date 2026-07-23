// @ts-nocheck
class Test {
    value = 0;

    method() {
        return this.value;
    }

    setup() {
        const handler = this.method;
        return handler;
    }
}
