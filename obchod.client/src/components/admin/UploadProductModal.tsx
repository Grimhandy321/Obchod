import { useState } from 'react';
import { TextInput, Textarea, Rating, FileInput, Button, Group, Container, Modal} from '@mantine/core';
import { productForm } from '../../lib/form/productForm';
import { useForm } from '@mantine/form';
import { useAxiosClient } from '../../lib/api/axios-client';



const UploadProductModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);  // To control the modal visibility
    const [files, setFiles] = useState<File[]>([]);
    const axios = useAxiosClient();

    // Initialize Mantine Form
    const form = useForm(productForm);

    // Handle image file changes
    const handleFileChange = (newFiles: File[]) => {
        setFiles(newFiles);
        form.setFieldValue('images', newFiles);
    };

    // Handle form submission
    const submitProduct = async (values: typeof form.values) => {
        try {
            const formData = new FormData();
            formData.append('product', JSON.stringify({
                name: values.name,
                brand: values.brand,
                description: values.description,
                rating: values.rating,
                productId: undefined,
            }));

            files.forEach((file, index) => {
                formData.append(`images[${index}]`, file);
            });

            const response = await axios.post('/api/product', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Product uploaded successfully:', response.data);
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error uploading product:', error);
        }
    };

    return (
        <Container>
            <Button onClick={() => setIsModalOpen(true)}>Upload Product</Button>

            <Modal
                opened={isModalOpen}
                onClose={() => setIsModalOpen(false)} 
                title="Upload New Product"
            >
                <form onSubmit={form.onSubmit(submitProduct)}>
                    <TextInput
                        label="Product Name"
                        placeholder="Enter product name"
                        {...form.getInputProps('name')}
                        required
                    />
                    <TextInput
                        label="Brand"
                        placeholder="Enter product brand"
                        {...form.getInputProps('brand')}
                        required
                    />
                    <Textarea
                        label="Description"
                        placeholder="Enter product description"
                        {...form.getInputProps('description')}
                        required
                    />
                    <Rating
                        value={form.values.rating}
                        onChange={(value) => form.setFieldValue('rating', value)}
                        fractions={2}
                    />
                    <FileInput
                        label="Product Images"
                        placeholder="Upload product images"
                        multiple
                        {...form.getInputProps('images')}
                        onChange={handleFileChange}
                        required
                    />
                    <Group position="right" mt="md">
                        <Button type="submit">Submit</Button>
                    </Group>
                </form>
            </Modal>
        </Container>
    );
};

export default UploadProductModal;
