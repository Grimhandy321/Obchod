import { Container, Grid ,Text } from '@mantine/core';
import ProductCard from '../components/cards/ProducCard';
import { useState } from 'react';
import { Product } from '../lib/types';
import { useProductsQuery } from '../api/useProductsQuery';
import { useQuerySuccess } from '../lib/api/useQuerySuccess';

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const productsResult = useProductsQuery();

    useQuerySuccess(productsResult, async (data) => {
        setProducts(data);
    })

    return (
        <Container size="90%" >
            {products ? <Grid gutter="md" justify="center" >
                {products.map((product) => (
                    <Grid.Col key={product.productID} span={4}>
                        <ProductCard
                            product={product}
                        />
                    </Grid.Col>
                ))}
            </Grid> :
            <Text>loading...</Text>
        }
        </Container>
    );
}

export default Products;
