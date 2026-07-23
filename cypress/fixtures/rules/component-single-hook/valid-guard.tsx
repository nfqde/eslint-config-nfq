// @ts-nocheck
import React from 'react';

const Widget = () => {
    const data = useData();

    if (!data) {
        return null;
    }

    return <div />;
};

Widget.displayName = 'Widget';

export {Widget};
