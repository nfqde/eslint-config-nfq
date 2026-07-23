// @ts-nocheck
import React from 'react';

const Widget = () => {
    const data = useData();

    return data ? <div /> : null;
};

Widget.displayName = 'Widget';

export {Widget};
