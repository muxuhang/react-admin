import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import 'braft-editor/dist/index.css'
import { ConfigProvider } from 'antd';
import 'antd/dist/antd.css';
import './_app.css'

export default function MyApp(props) {
  const { Component, pageProps } = props;
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <React.Fragment>
      <Head>
        <title>艺小星</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ConfigProvider>
        <Component {...pageProps} />
      </ConfigProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
