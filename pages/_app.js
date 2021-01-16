import '../styles/globals.css'
import React, { useContext, useEffect } from 'react';
import {StoreProvider} from '../components/Store'; 
import NProgeress from 'nprogress';
import Router from 'next/router';
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';
Router.events.on('routeChangeStart', () => nProgress.start());
Router.events.on('routeChangeComplete', () => nProgress.start());
Router.events.on('routeChangeError', () => nProgress.start());

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, [])
  return(
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  )
}



MyApp.getInitialProps = async () => {
  // console.log('callback from app');
  return {
    pageProps: {
      commercePublicKey: process.env.COMMERCE_PUBLIC_KEY,
    },
  };
}
export default MyApp;