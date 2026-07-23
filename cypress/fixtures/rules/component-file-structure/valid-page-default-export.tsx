import React from 'react';
import Head from 'next/head';

import type {NextPageWithLayout} from 'types/global';

const Login: NextPageWithLayout = () => (
    <>
        <Head><title>Login</title></Head>
        <div>Login</div>
    </>
);

Login.getLayout = (router, pageProps, PageComponent) => (
    <div>
        <PageComponent router={router} {...pageProps} />
    </div>
);

export default Login;
