import { useForm } from '@mantine/form';
import { Button,Image, Modal, NumberInput, TextInput, Textarea } from '@mantine/core';
import { useEffect } from 'react';
import { Product } from '../../lib/types';
interface ProductFormProps {
    initial?: Product;
    onSubmit: (formData: {}, isEdit: boolean, productId?: number) => void;
    opened: boolean;
    close: () => void;
}

export function ProductForm({ initial, onSubmit, opened, close }: ProductFormProps) {
    console.log(initial)
    const form = useForm({
        initialValues: {
            name: '',
            brand: '',
            description: '',
            rating: 0,
            imagePaths: [] as string []
        },
    });

    useEffect(() => {
        if (initial) {
            form.setValues({
                name: initial.name,
                brand: initial.brand,
                description: initial.description,
                rating: initial.rating,
                imagePaths: initial.imagePaths,
            });
        } else {
            form.reset();
        }
    },[]);

    const handleSubmit = (values: typeof form.values) => {
        onSubmit(form.values , !!initial, initial?.productId);
        close();
    };

    return (
        <Modal opened={opened} onClose={close} title={initial ? 'Edit Product' : 'Add Product'}>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput label="Name" {...form.getInputProps('name')} required />
                <TextInput label="Brand" {...form.getInputProps('brand')} required />
                <Textarea label="Description" {...form.getInputProps('description')} required />
                <NumberInput label="Rating" min={0} max={5} {...form.getInputProps('rating')} required />
                {form.values.imagePaths.map((path, index) => (<Image key={index} src={path}/>) )}
                <Button mt="md" type="submit" fullWidth>
                    {initial ? 'Update' : 'Create'}
                </Button>
            </form>
        </Modal>
    );
}
