// @ts-nocheck
import React from 'react';

const Widget = () => {
    if (ready) {
        doSomething();
    }

    return <div />;
};

Widget.displayName = 'Widget';

export {Widget};
