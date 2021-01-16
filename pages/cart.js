import { Card, Box, CardActionArea, CardContent, CardMedia, Grid, Slide, Typography, CircularProgress, Table, TableContainer, TableCell, TableBody, TableRow, Button, TableHead, Select, MenuItem, List, ListItem } from '@material-ui/core';
import Link from 'next/link';
import { Alert } from '@material-ui/lab';
import Head from 'next/head'
import { Layout } from '../components/Layout';
import styles from '../styles/Home.module.css'
import getCommerce from '../utils/commerce'
import { useStyles } from '../utils/styles';
import { Store } from '../components/Store';
import React, {useContext } from 'react';
import dynamic from 'next/dynamic';

function Cart(props) {
  const classes = useStyles();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const quantityHandler = (item, quantity) => {

  }
  const removeFromCartHandler = (item) => {

  }
  
  return (
    <Layout title="Cart" commercePublicKey={props.commercePublicKey}>
      {
          cart.loading ? (
            <CircularProgress/>
            ) : cart.data.line_items.length === 0 ? (
                <Alert icon={false} severity="error">
                    Cart is empty. <Link href="/">Go shopping</Link>
                </Alert>
            ) : (
                <React.Fragment>
                    <Typography variant="h1" component="h1">
                        Shopping Cart
                    </Typography>
                    <Slide direction="up" in={true}>
                        <Grid container spacing={1}>
                            <Grid item md={9}>
                                <TableContainer>
                                    <Table aria-label="Orders">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Name</TableCell>
                                                <TableCell align="right">Quantity</TableCell>
                                                <TableCell align="right">Price</TableCell>
                                                <TableCell>Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                cart.data.line_items.map( cartItem => {
                                                    <TableRow key={cartItem.name}>
                                                        <TableCell component="th" scope="row">
                                                            {cartItem.name}
                                                        </TableCell>
                                                        <TableCell align="right">
                                                        <Select 
                                                            labelId="quantity-label"
                                                            id="quantity"
                                                            fullWidth
                                                            onChange={(e)=>{quantityHandler(cartItem, e.target.value)}}
                                                            value={cartItem.quantity}
                                                        >
                                                            {
                                                                [...Array(10).keys()].map(x => (
                                                                    <MenuItem key={x+1} value={x+1}>
                                                                        {x + 1}
                                                                    </MenuItem>
                                                                ))
                                                            }
                                                        </Select>
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            { cartItem.price.formatted_with_symbol }
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <Button onClick={() => removeFromCartHandler(cartItem)}
                                                                variant="contained"
                                                                color="secondary"
                                                            >
                                                                X
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                })
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                            <Grid item md={3}>
                                <Cart className={classes.card}>
                                    <List>
                                        <ListItem>
                                            <Grid container>
                                                <Typography variant="h6">
                                                    Subtotal: {cart.data.subtotal.formatted_with_symbol}
                                                </Typography>
                                            </Grid>
                                        </ListItem>
                                        <ListItem>
                                            {
                                                cart.data.toal_items > 0 && (
                                                    <Button 
                                                        type="button"
                                                        fullWidth
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={ processToCheckoutHandler }
                                                    >
                                                        Proceed to checkout
                                                    </Button>
                                                )
                                            }
                                        </ListItem>
                                    </List>
                                </Cart>
                            </Grid>
                        </Grid>
                    </Slide>
                </React.Fragment>
            )
      }
    </Layout>
  )
}

export default dynamic(() => Promise.resolve(Cart), {
    ssr:false,
})