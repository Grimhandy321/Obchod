import { useEffect, useState } from "react";
import {
    Container,
    Button,
    TextInput,
    Textarea,
    NumberInput,
    FileInput,
    Card,
    Image,
    Group,
    Grid,
    Modal,
    Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import { productForm } from "../../lib/form/prodcutForm";
import { useProductsQuery } from "../../api/useProductsQuery";
import { useQuerySuccess } from "../../lib/api/useQuerySuccess";

interface Product {
    productID: number;
    name: string;
    brand: string;
    description: string;
    imagePaths: string[];
    rating: number;
}

const API_URL = "/api/Product";

export default function ProductcEditor() {
    const [products, setProducts] = useState<Product[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
    const prodcutResult = useProductsQuery();
    const form = useForm(productForm);

    useQuerySuccess(prodcutResult, async (data) => {
        console.log(data)
        setProducts(data);
    })


    // Add or Update product
    const handleSubmit = async (values: Partial<Product>) => {
        try {
            const formData = new FormData();

            Object.entries(values).forEach(([key, value]) => {
                if (key === "imagePaths" && Array.isArray(value)) {
                    (value as File[]).forEach((file) =>
                        formData.append("images", file)
                    );
                } else if (value !== undefined) {
                    formData.append(key, value.toString());
                }
            });

            if (editMode && selectedProductId) {
                // Update product
                await axios.put(`${API_URL}/${selectedProductId}`, formData);
            } else {
                // Add new product
                await axios.post(API_URL, formData);
            }

            prodcutResult.refetch();
            resetForm();
        } catch (error) {
            console.error("Error saving product:", error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            prodcutResult.refetch();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const openEditModal = (product: Product) => {
        form.setValues({
            name: product.name,
            brand: product.brand,
            description: product.description,
            rating: product.rating,
            imagePaths: [],
        });
        setSelectedProductId(product.productID);
        setEditMode(true);
        setModalOpen(true);
    };

    const resetForm = () => {
        form.reset();
        setSelectedProductId(null);
        setEditMode(false);
        setModalOpen(false);
    };

    return (
        <Container>
            <Title mb="lg">Product Management</Title>

            {/* Add/Edit Modal */}
            <Modal
                opened={modalOpen}
                onClose={resetForm}
                title={editMode ? "Edit Product" : "Add Product"}
            >
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <TextInput
                        label="Name"
                        {...form.getInputProps("name")}
                        required
                    />
                    <TextInput
                        label="Brand"
                        {...form.getInputProps("brand")}
                        required
                    />
                    <Textarea
                        label="Description"
                        {...form.getInputProps("description")}
                        required
                    />
                    <NumberInput
                        label="Rating"
                        {...form.getInputProps("rating")}
                        min={0}
                        max={5}
                        required
                    />
                    <FileInput
                        label="Upload Images"
                        placeholder="Select images"
                        multiple
                        onChange={(files) => form.setFieldValue("imagePaths", files || [])}
                    />

                    <Button mt="md" type="submit">
                        {editMode ? "Update Product" : "Add Product"}
                    </Button>
                </form>
            </Modal>

            {/* Add Product Button */}
            <Button mb="md" onClick={() => setModalOpen(true)}>
                Add Product
            </Button>

            {/* Product List */}
            <Grid>
                {products.map((product) => (
                    <Grid.Col span={4} key={product.productID}>
                        <Card shadow="sm" padding="lg">
                            {product.imagePaths?.[0] && (
                                <Image
                                    src={product.imagePaths[0]}
                                    alt={product.name}
                                    height={160}
                                />
                            )}
                            <Title order={4}>{product.name}</Title>
                            <p>Brand: {product.brand}</p>
                            <p>{product.description}</p>
                            <p>Rating: {product.rating}</p>

                            <Group mt="md">
                                <Button
                                    color="blue"
                                    onClick={() => openEditModal(product)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    color="red"
                                    onClick={() => handleDelete(product.productID)}
                                >
                                    Delete
                                </Button>
                            </Group>
                        </Card>
                    </Grid.Col>
                ))}
            </Grid>
        </Container>
    );
}
