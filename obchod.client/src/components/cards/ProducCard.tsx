import React from 'react';
import { Card, Image, Text, Button, Group, Rating } from '@mantine/core';
import { useShoppingCartStore } from '../../lib/context/useShoppingCartStore';
import { Product } from '../../lib/types';
// Define the prop types for the ProductCard component
interface ProductCardProps {
    product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({product}) => {
    const API_URL = import.meta.env.VITE_API_BASE_URL;
    const addItem = useShoppingCartStore((state) => state.addItem);

    return (
        <Card
            shadow="sm"
            padding="lg"
            style={{
                width: 250,
                border: '2px solid white',  // White border added here
                borderRadius: '8px',         // Rounded corners
                transition: 'transform 0.2s ease', // Smooth transition for hover effect
            }}
        >
            <Card.Section>
                {/* Product Image */}
                <Image
                    src={`${API_URL}/${product.imagePaths[0]}`}
                    alt={product.name}
                    height={200}
                    fit="contain"
                />
            </Card.Section>

            <Text size="lg" style={{ marginTop: 10 }}>
                {product.name}
            </Text>

            <Text h={"3em"} color="dimmed" lineClamp={2} style={{ marginTop: 5 }}>
                {product.description}
            </Text>

            <Text size="lg" style={{ marginTop: 10 }}>
                ${product.price}
            </Text>

            {/* Product Rating */}
            <Rating value={product.rating} readOnly style={{ marginTop: 5 }} />

            <Group  style={{ marginTop: 15 }}>
                <Button onClick={() => {
                    addItem({ product: product,quantity:1 })
                }}>Add to Cart</Button>
            </Group>
        </Card>
    );
}

export default ProductCard;
