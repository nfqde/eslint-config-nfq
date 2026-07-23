// @ts-nocheck
import React from 'react';

const Widget = observer(() => {
    const store = useStore();

    return <div>{store.value}</div>;
});

Widget.displayName = 'Widget';

export {Widget};
