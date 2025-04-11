import { Card, Text, Image, Button, Group } from '@mantine/core';
import { Product } from '../../lib/types';


interface ProductCardProps {
    product: Product;
    onEdit: () => void;
}

export function ProductCard({ product, onEdit }: ProductCardProps) {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            {product.imagePaths.length > 0 && (
                <Image src={product.imagePaths[0]} height={160} alt={product.name} />
            )}

            <Text fw={700} mt="md">{product.name}</Text>
            <Text size="sm" c="dimmed">{product.brand}</Text>
            <Text size="sm" mt="xs">{product.description}</Text>
            <Text size="sm" mt="xs">Rating: {product.rating}/5</Text>

            <Group mt="md" justify="end">
                <Button variant="light" onClick={onEdit}>Edit</Button>
            </Group>
        </Card>
    );
}
