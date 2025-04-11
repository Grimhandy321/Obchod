import { useState } from "react";
import { useProductsQuery } from "../api/useProductsQuery";
import { useQueryResult } from "../lib/api/useQueryResult";
import { Product } from "../lib/types";
import { Button, Card, Grid, Title, Image, Text, Group } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
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


    const handleSubmit = async (formData: {}, isEdit: boolean, productId?: number) => {
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
    const handleDelete = (productId: number) => {
        axios.delete(`/api/product/${productId}`);
        productResult.refetch();
    }
    const createProduct =() =>
    {
        axios.post('/api/product', {}, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    }


    return (
        <>
            <Title order={2}>Products</Title>
            <Button my="md" onClick={() => { createProduct(); }}>
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
                            <Group justify="space-between" gap="sm">
                                <Button mt="sm" onClick={() => { setSelectedProduct(product); open(); }}>
                                    Edit
                                </Button>
                                <Button bg={"red"} mt="sm" onClick={() => {handleDelete(product.productId)}}>
                                    Delete
                                </Button>
                            </Group>
                        </Card>
                    </Grid.Col>
                ))}
            </Grid>

            <ProductForm
                opened={opened}
                close={close}
                initial={selectedProduct ?? {}}
                onSubmit={handleSubmit}
            />
        </>
    );
}

export default Admin;