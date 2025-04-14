import { Text, Image, Box, SimpleGrid } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import { Product } from '../../lib/types';
import { useEffect, useState } from 'react';
import { useAxiosClient } from '../../lib/api/axios-client';

export default function ImageDropzone({ product }: { product: Product | null}) {
    const [paths, setPaths] = useState<string[]>([]);
    const API_URL = import.meta.env.VITE_API_BASE_URL;
    const axios = useAxiosClient();

    useEffect(() => {
        setPaths(product?.imagePaths || []);
    }, [product]);


    const handleDrop = async (files: File[]) => {
        for (const file of files) {
            const formData = new FormData();
            formData.append('file', file);
            axios.post(`${API_URL}/api/Product/${product?.productID}/images`, formData).then((response) =>
            {
                setPaths(response.data.imagePaths)
            });
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
                {previews}
            </SimpleGrid>
        </Box>
    );
}
