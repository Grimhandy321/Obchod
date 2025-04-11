import { useState } from "react";
import { useProductsQuery } from "../api/useProductsQuery";
import { useQueryResult } from "../lib/api/useQueryResult";
import { Product } from "../lib/types";
import { Button, Card, Container, Grid, SimpleGrid, Title, Image ,Text} from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { ProductCard } from "../components/admin/ProductCard";
import { useAxiosClient } from "../lib/api/axios-client";
import { ProductForm } from "../components/admin/ProductForm";

function Admin() {
    document.title = "Admin";
    const [products, setProducts] = useState<Product[]>([]);
    const productResult = useProductsQuery();
    const axios = useAxiosClient();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [opened, { open, close }] = useDisclosure(false);

    useQueryResult({
        result: productResult,
        onSuccess: async (data) => { setProducts(data) },
    })


    const handleSubmit = async (formData: FormData, isEdit: boolean, productId?: number) => {
        if (isEdit && productId) {
            await axios.put(`/api/product/${productId}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
        } else {
            await axios.post('/api/product', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
        }
        productResult.refetch();
    };

    return (
        <>
            <Title order={2}>Products</Title>
            <Button my="md" onClick={() => { setSelectedProduct(null); open(); }}>
                Add New Product
            </Button>

            <Grid>
                {products.map(product => (
                    <Grid.Col span={4} key={product.productId}>
                        <Card shadow="sm" padding="lg" withBorder>
                            {product.imagePaths[0] && (
                                <Image src={product.imagePaths[0]} height={160} alt={product.name} />
                            )}
                            <Title order={4}>{product.name}</Title>
                            <Text>{product.brand}</Text>
                            <Text size="sm" color="dimmed">{product.description}</Text>
                            <Text>⭐ {product.rating}</Text>
                            <Button mt="sm" onClick={() => { setSelectedProduct(product); open(); }}>
                                Edit
                            </Button>
                        </Card>
                    </Grid.Col>
                ))}
            </Grid>

            <ProductForm
                opened={opened}
                close={close}
                initial={selectedProduct ?? undefined}
                onSubmit={handleSubmit}
            />
        </>
    );
}

export default Admin;