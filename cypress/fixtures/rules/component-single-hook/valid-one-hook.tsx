// @ts-nocheck
import React from 'react';

const Widget = () => {
    const data = useData();

    return <div>{data}</div>;
};

Widget.displayName = 'Widget';

export {Widget};
