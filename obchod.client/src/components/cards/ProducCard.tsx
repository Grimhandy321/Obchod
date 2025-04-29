import React from 'react';
import { Card, Image, Text, Button, Group, Rating } from '@mantine/core';
import { useShoppingCartStore } from '../../lib/context/useShoppingCartStore';
import { Product } from '../../lib/types';
import { IconPlus, IconMinus, IconTrash } from '@tabler/icons-react'; 
import { stat } from 'node:fs/promises';

interface ProductCardProps {
    product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const API_URL = import.meta.env.VITE_API_BASE_URL;
    const addItem = useShoppingCartStore((state) => state.addItem);
    const removeItem = useShoppingCartStore((state) => state.removeItem);
    const updateQuantity = useShoppingCartStore((state) => state.updateQuantity);
    const shoppingCart = useShoppingCartStore((state) => state.items);

    const existingItem = shoppingCart.find(
        (item) => item?.product?.productID === product.productID
    );
    return (
        <Card
            shadow="sm"
            padding="lg"
            style={{
                border: '2px solid white', 
                borderRadius: '8px', 
                transition: 'transform 0.2s ease', 
            }}
        >
            <Card.Section>
                <Image
                    src={`${API_URL}/${product.imagePaths[0]}`}
                    alt={product.name}

                    fit={"fill"}
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
            <Rating value={product.rating} readOnly style={{ marginTop: 5 }} />

            <Group style={{ marginTop: 15 }}>
                {existingItem ? (
                    <Group pb={"sm"}>
                        <IconPlus onClick={() => updateQuantity(product.productID, existingItem.quantity + 1)} />
                        {existingItem.quantity}
                        <IconMinus onClick={() => updateQuantity(product.productID, existingItem.quantity - 1)}/>
            
                        <IconTrash color="red" onClick={() => removeItem(product.productID)} >
                            Remove from Cart
                        </IconTrash>
                    </Group>
                ) : (
                    <Button onClick={() => addItem({ product: product, quantity: 1 })}>
                        Add to Cart
                    </Button>
                )}
            </Group>
        </Card>
    );
}

export default ProductCard;
