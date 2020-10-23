import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import 'braft-editor/dist/index.css'
import { SnackbarProvider } from 'notistack';
import { Button, ConfigProvider } from 'antd';
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
  const notistackRef = React.createRef();
  const onClickDismiss = key => () => {
    notistackRef.current.closeSnackbar(key);
  }
  return (
    <React.Fragment>
      <Head>
        <title>艺小星</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ConfigProvider>
        <SnackbarProvider
          ref={notistackRef}
          maxSnack={3}
          variant={'info'}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          action={(key) => (
            <Button onClick={onClickDismiss(key)} style={{ color: '#ffffff' }}>
              关闭
            </Button>
          )}>
          <Component {...pageProps} />
        </SnackbarProvider>
      </ConfigProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
