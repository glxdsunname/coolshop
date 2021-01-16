import { Card, Box, CardActionArea, CardContent, CardMedia, Grid, Slide, Typography } from '@material-ui/core';
import Link from 'next/link';
import { Alert } from '@material-ui/lab';
import Head from 'next/head'
import { Layout } from '../components/Layout';
import styles from '../styles/Home.module.css'
import getCommerce from '../utils/commerce'

export default function Home(props) {
  const { products } = props;
  // console.log(props);
  return (
    <Layout title="Home" commercePublicKey={props.commercePublicKey}>
      { products.length === 0 && <Alert>No product found</Alert> }
      
      <Grid container spacing={1} >
        {products.map( product => (
          <Slide direction="up" in={true} key={product.id}>
          <Grid item   xs={12} sm={6} md={4} lg={3}> 
          <Card>
            <Link href={`/products/${product.permalink}`} >
              <CardActionArea>
                <CardMedia 
                  component="img"
                  alt={product.name}
                  image={product.media.source}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="body2"
                    color="textPrimary"
                    component="p"
                  >
                    {product.name}
                  </Typography>
                  <Box>
                    <Typography
                      variant="body1"
                      color="textPrimary"
                      component="p"
                    >
                      {product.price.formatted_with_symbol}
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Link>
            </Card>
          </Grid>
          </Slide>
        ))}
      </Grid>
    </Layout>
  )
}

export async function getStaticProps() {
  const commerce = getCommerce();
  const { data : products } = await commerce.products.list();
  return {
    props : {
      products,
    }
  }
}