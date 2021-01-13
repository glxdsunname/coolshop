import { ThemeProvider } from '@material-ui/core'
import React, { useContext, useEffect } from 'react';
import { 
    AppBar, 
    CssBaseline, 
    Toolbar,
    Link,
    CircularProgress,
    Badge,
    Box,
    Typography,
    Container
 } from "@material-ui/core";
import Head from 'next/head';
import { theme, useStyles } from '../utils/styles.js';
import NextLink from 'next/link';
import { Store } from './Store.js';
import { CART_RETRIEVE_SUCCESS, CART_RETRIEVE_REQUEST } from '../utils/constants';
import getCommerce from '../utils/commerce';

export const Layout = ({children, commercePublicKey, title  = 'Coolshop'}) => {

    const classes = useStyles();
    const { state, dispatch } = useContext(Store);
    const { cart } = state;
    useEffect(() => {
      // const fetchCart = async () => {
      //   const commerce = getCommerce(commercePublicKey);
      //   dispatch({ type: CART_RETRIEVE_REQUEST});
      //   const cartData = await commerce.cart.retrieve();
      //   dispatch({ type : CART_RETRIEVE_SUCCESS, payload: cartData});
      // }
      // fetchCart();
    }, []);

    return (
        <React.Fragment>
            <Head>
                <meta charSet="utf-8"/>
                <title>{`${title} - Coolshop`}</title>
                <link rel="icon" href="favicon.icon" />
                <meta name = "viewport" content="width=device-width, inital-scale=1, shrink-to-fit=no"/>
            </Head>
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar
          position="static"
          color="default"
          elevation={0}
          className={classes.appBar}
        >
          <Toolbar className={classes.toolbar}>
            <NextLink href="/">
              <Link
                variant="h6"
                color="inherit"
                noWrap
                href="/"
                className={classes.toolbarTitle}
              >
                Coolshop
              </Link>
            </NextLink>

            <nav>
              <NextLink href="/cart">
                <Link
                  variant="button"
                  color="textPrimary"
                  href="/cart"
                  className={classes.link}
                >
                  Cart
                </Link>
              </NextLink>
            </nav>
          </Toolbar>
        </AppBar>
        {/* Hero unit */}
        <Container component="main" className={classes.main}>
          {children}
        </Container>
        {/* End hero unit */}
        <Container maxWidth="md" component="footer">
          <Box mt={5}>
            <Typography variant="body2" color="textSecondary" align="center">
              {'© '}
              {`Coolshop`} 2021
              {'.'}
            </Typography>
          </Box>
        </Container>
        {/* End footer */}
      </ThemeProvider>
        </React.Fragment>
    )
}