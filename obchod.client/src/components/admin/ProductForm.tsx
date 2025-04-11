import { useForm } from '@mantine/form';
import { Button, FileInput, Modal, NumberInput, TextInput, Textarea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect } from 'react';

interface Product {
    productId?: number;
    name: string;
    brand: string;
    description: string;
    rating: number;
    imagePaths: string[];
}

interface ProductFormProps {
    initial?: Product;
    onSubmit: (formData: FormData, isEdit: boolean, productId?: number) => void;
    opened: boolean;
    close: () => void;
}

export function ProductForm({ initial, onSubmit, opened, close }: ProductFormProps) {
    const form = useForm({
        initialValues: {
            name: '',
            brand: '',
            description: '',
            rating: 0,
            images: [] as File[],
        },
    });

    useEffect(() => {
        if (initial) {
            form.setValues({
                name: initial.name,
                brand: initial.brand,
                description: initial.description,
                rating: initial.rating,
                images: [],
            });
        } else {
            form.reset();
        }
    }, [initial]);

    const handleSubmit = (values: typeof form.values) => {
        const formData = new FormData();
        formData.append('Name', values.name);
        formData.append('Brand', values.brand);
        formData.append('Description', values.description);
        formData.append('Rating', values.rating.toString());

        for (const file of values.images) {
            formData.append('images', file);
        }

        onSubmit(formData, !!initial, initial?.productId);
        close();
    };

    return (
        <Modal opened={opened} onClose={close} title={initial ? 'Edit Product' : 'Add Product'}>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput label="Name" {...form.getInputProps('name')} required />
                <TextInput label="Brand" {...form.getInputProps('brand')} required />
                <Textarea label="Description" {...form.getInputProps('description')} required />
                <NumberInput label="Rating" min={0} max={5} {...form.getInputProps('rating')} required />
                <FileInput label="Images" multiple {...form.getInputProps('images')} accept="image/*" />
                <Button mt="md" type="submit" fullWidth>
                    {initial ? 'Update' : 'Create'}
                </Button>
            </form>
        </Modal>
    );
}
