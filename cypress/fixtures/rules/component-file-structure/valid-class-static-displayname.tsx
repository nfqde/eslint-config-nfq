import React, {Component} from 'react';

interface WidgetProps {
    label: string;
}

class Widget extends Component<WidgetProps> {
    static displayName = 'Widget';

    render() {
        return <span>{this.props.label}</span>;
    }
}

export {Widget};
