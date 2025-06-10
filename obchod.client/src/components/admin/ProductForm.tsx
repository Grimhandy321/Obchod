import { useForm } from '@mantine/form';
import { Button, Modal, NumberInput, TextInput, Textarea } from '@mantine/core';
import { useEffect } from 'react';
import { Product } from '../../lib/types';
import ImageDropzone from '../misc/ImageDropzone';
import { productForm } from '../../lib/form/productForm';

interface ProductFormProps {
    initial: Product | null;
    onSubmit: (formData: {}, productId?: number) => void;
    opened: boolean;
    close: () => void;
    created: boolean;
}

export function ProductForm({ initial, onSubmit, opened, close, created = false }: ProductFormProps) {
    const form = useForm(productForm);

    console.log();

    useEffect(() => {
        if (initial) {
            form.setValues({
                name: initial?.name,
                brand: initial?.brand,
                description: initial.description,
                rating: initial.rating,
                imagesPaths: initial.imagePaths,
            });
        } else {
            form.reset();
        }
    });
    const handleSubmit = () => {
        if (form.validate().hasErrors) {
            console.log(form.errors)
        }
        else {
            onSubmit(form.values, initial?.productID);
            close();
        }
    };

    return (

        <Modal size="72%" opened={opened} onClose={close} title={initial ? 'Edit Product' : 'Add Product'}>
            <TextInput label="Name" {...form.getInputProps('name')} />
            <TextInput label="Brand" {...form.getInputProps('brand')} />
            <Textarea label="Description" {...form.getInputProps('description')} />
            <NumberInput label="Rating" min={0} max={5} {...form.getInputProps('rating')} />
            <ImageDropzone product={initial} form={form } />
            <Button mt="md" onClick={() => handleSubmit()} fullWidth>
                {created ? 'Create' : 'Update'}
            </Button>
        </Modal>

    );
}
