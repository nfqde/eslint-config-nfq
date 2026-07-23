import React from 'react';

import type {GetServerSideProps} from 'next';
import type {ParsedUrlQuery} from 'querystring';
import type {NextSSRPageWithLayout} from 'types/global';

interface ServerSideProps {
    id: string;
}

interface ServerSideParams extends ParsedUrlQuery {
    id: string;
}

const Page: NextSSRPageWithLayout<typeof getServerSideProps> = ({id}) => (
    <div>{id}</div>
);

export default Page;

export const getServerSideProps: GetServerSideProps<ServerSideProps, ServerSideParams> = async context => {
    const {id} = context.params!;

    return {
        props: {
            id
        }
    };
};
