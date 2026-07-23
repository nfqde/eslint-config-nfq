// @ts-nocheck
import React from 'react';

const Widget = () => {
    const first = useFirst();
    const second = useSecond();

    return <div>{first + second}</div>;
};

Widget.displayName = 'Widget';

export {Widget};
