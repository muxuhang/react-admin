import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import 'antd/dist/antd.css';
import './_app.css'
import MAudio from '../components/MAudio';
export default function MyApp(props) {
  const { Component, pageProps } = props;
  React.useEffect(() => {
    console.log('启动');
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <React.Fragment>
      <Head>
        <title>后台系统</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ConfigProvider locale={zhCN}>
        <Component {...pageProps} />
      </ConfigProvider>
      <MAudio />
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
