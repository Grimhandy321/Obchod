import { useState } from "react";
import { useProductsQuery } from "../api/useProductsQuery";
import { Product } from "../lib/types";
import { Button, Card, Grid, Title, Image, Text, Group, Box } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { useAxiosClient } from "../lib/api/axios-client";
import { ProductForm } from "../components/admin/ProductForm";
import { useQuerySuccess } from "../lib/api/useQuerySuccess";

function Admin() {
    document.title = "Admin";
    const [products, setProducts] = useState<Product[]>([]);
    const productResult = useProductsQuery();
    const axios = useAxiosClient();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [opened, { open, close }] = useDisclosure(false);
    const [created, setCreated] = useState(false);

    useQuerySuccess(productResult, async (data: any) => {
        console.log()
        setProducts(data)
    })


    const handleSubmit = async (formData: {}, productId?: number) => {
        await axios.put(`/api/product/${productId}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        productResult.refetch();
    };


    const handleClose = () => {
        if (created && selectedProduct != null) { 
            axios.delete(`/api/product/${selectedProduct.productID}`);
            productResult.refetch();
        }
        close();
        setSelectedProduct(null)
    };

    const handleDelete = async (productId: number) => {
        await axios.delete(`/api/product/${productId}`);
        productResult.refetch();
    }
    const API_URL = import.meta.env.VITE_API_BASE_URL;
    const createProduct = () => {
        axios.get('/api/Product/create').then((response) => {
            const newProducts = response.data;
            setProducts(newProducts);
            setSelectedProduct(newProducts[newProducts.length - 1]);
            setCreated(true);
            open();
        });
    }


    return (
        <Box>
            <Button mt="sm" onClick={() => { createProduct() }}>
                Add new product
            </Button>
            <Grid mt={"md"}>
                {products.map(product => (
                    <Grid.Col key={product.productID} span={4}>
                        <Card shadow="sm" padding="lg" withBorder>
                            {product.imagePaths[0] && (
                                <Image src={`${API_URL}/${product.imagePaths[0]}`} height={160} alt={product.name} />
                            )}
                            <Title order={4}>{product.name}</Title>
                            <Text>{product.brand}</Text>
                            <Text size="sm" color="dimmed">{product.description}</Text>
                            <Text>⭐ {product.rating}</Text>
                            <Group justify="space-between" gap="sm">
                                <Button mt="sm" onClick={() => { setSelectedProduct(product); open(); }}>
                                    Edit
                                </Button>
                                <Button bg={"red"} mt="sm" onClick={() => { handleDelete(product.productID) }}>
                                    Delete
                                </Button>
                            </Group>
                        </Card>
                    </Grid.Col>
                ))}
            </Grid>

            <ProductForm
                opened={opened}
                close={handleClose}
                created={created}
                initial={selectedProduct}
                onSubmit={handleSubmit}
            />
        </Box>
    );
}

export default Admin;