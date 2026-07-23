// @ts-nocheck
import React from 'react';

const Widget = () => {
    const data = useData();
    const count = 1;

    return <div>{data + count}</div>;
};

Widget.displayName = 'Widget';

export {Widget};
