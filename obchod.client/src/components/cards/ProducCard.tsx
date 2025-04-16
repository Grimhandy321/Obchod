import React from 'react';
import { Card, Image, Text, Button, Group, Rating } from '@mantine/core';
// Define the prop types for the ProductCard component
interface ProductCardProps {
    image: string;
    title: string;
    description: string;
    price: number;
    rating: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, title, description, price, rating }) => {
    const API_URL = import.meta.env.VITE_API_BASE_URL;

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
                    src={`${API_URL}/${image}`}
                    alt={title}
                    height={200}
                    fit="contain"
                />
            </Card.Section>

            <Text size="lg" style={{ marginTop: 10 }}>
                {title}
            </Text>

            <Text h={"3em"} color="dimmed" lineClamp={2} style={{ marginTop: 5 }}>
                {description}
            </Text>

            <Text size="lg" style={{ marginTop: 10 }}>
                ${price}
            </Text>

            {/* Product Rating */}
            <Rating value={rating} readOnly style={{ marginTop: 5 }} />

            <Group  style={{ marginTop: 15 }}>
                <Button>Add to Cart</Button>
            </Group>
        </Card>
    );
}

export default ProductCard;
