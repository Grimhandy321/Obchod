import { Container, Grid } from '@mantine/core';
import ProductCard from '../components/cards/ProducCard';

const Products = () => {
    const products = [
        {
            id: 1,
            image: '/images/product1.jpg',
            title: 'Product 1',
            description: 'This is a great product.',
            price: '29.99',
            rating: 4.5,
        },
        {
            id: 2,
            image: '/images/product2.jpg',
            title: 'Product 2',
            description: 'This is another awesome product.',
            price: '49.99',
            rating: 3.8,
        },
    ];

    return (
        <Container style={{ paddingTop: '50px' }}>
            <Grid gutter="md" justify="center">
                {products.map((product) => (
                    <Grid.Col key={product.id} span={4}>
                        <ProductCard
                            image={product.image}
                            title={product.title}
                            description={product.description}
                            price={product.price}
                            rating={product.rating}
                        />
                    </Grid.Col>
                ))}
            </Grid>
        </Container>
    );
}

export default Products;
