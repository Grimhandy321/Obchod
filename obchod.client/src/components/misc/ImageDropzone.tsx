import { Text, Image, Box, SimpleGrid } from '@mantine/core';
import { Dropzone, FileWithPath } from '@mantine/dropzone';
import { Product } from '../../lib/types';
import { useEffect, useState } from 'react';
import { useAxiosClient } from '../../lib/api/axios-client';

export default function ImageDropzone({ product, form }: { product: Product | null, form: any }) {
    const [paths, setPaths] = useState<string[]>([]);
    const API_URL = import.meta.env.VITE_API_BASE_URL;
    const axios = useAxiosClient();
    const [files, setFiles] = useState<FileWithPath[]>([]);

    useEffect(() => {
        setPaths(product?.imagePaths || []);
    }, [product]);


    const handleDrop = async (files: File[]) => {
        for (const file of files) {
            if (product != null) {
                const formData = new FormData();
                formData.append('images', file);
                axios.post(`${API_URL}/api/Product/${product?.productID}/images`, formData).then((response) => {
                    setPaths(response.data.imagePaths)
                    form.setFieldValue("imagesPaths", response.data.imagePaths)
                });
            } else {
                form.setFieldValue("images", files);
                form.setFieldValue("imagesPaths", ["asd"])
                setFiles(files);
            }
        }
    };

    const previews = paths.map((path, index) => (
        <Image
            key={index}
            src={`${API_URL}/${path}`}
            alt={`Preview ${index}`}
            fit="contain"
        />
    ));

    return (
        <Box pt="xs">
            <Text
                size="sm"
                fw={600}
                style={{ marginBottom: 4, display: 'block' }}
            >
                Images
            </Text>

            <Dropzone accept={['image/png', 'image/jpeg']} onDrop={handleDrop}>
                <Text ta="center">Drop images here</Text>
            </Dropzone>

            <SimpleGrid cols={{ base: 1, sm: 4 }} mt={previews.length > 0 ? 'xs' : 0}>
                {product == null ? files.map((file, index) => {
                    const imageUrl = URL.createObjectURL(file);
                    return <Image key={index} src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} />;
                }) : previews}
            </SimpleGrid>
            <Text c="red">{form.errors["imagesPaths"] ?? ""}</Text>

        </Box>
    );
}
