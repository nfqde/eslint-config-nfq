import type {ReactNode} from 'react';
import React, {Component} from 'react';

import dynamic from 'next/dynamic';
import styled from 'styled-components';

const AxeCoreHelper = dynamic(async () => import('UI/utils/AxeCoreHelper'), {ssr: false});

const loadMotionFeatures = async () => {
    const module = await import('UI/utils/motionFeatures');

    return module.default;
};

interface AppProps {
    title?: string;
}

class App extends Component<AppProps> {
    render(): ReactNode {
        return (
            <Wrapper>
                <AxeCoreHelper />
                <div>{this.props.title}</div>
            </Wrapper>
        );
    }
}

App.displayName = 'App';

export {App};

const Wrapper = styled.div``;
