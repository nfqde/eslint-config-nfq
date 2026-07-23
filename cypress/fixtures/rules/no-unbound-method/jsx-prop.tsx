// @ts-nocheck
class Test {
    value = 0;

    method() {
        return this.value;
    }

    render() {
        return <Button onClick={this.method} />;
    }
}
