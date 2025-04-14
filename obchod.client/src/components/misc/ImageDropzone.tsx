import { Text, Image, Box, SimpleGrid } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import { Product } from '../../lib/types';
import { useEffect, useState } from 'react';

export default function ImageDropzone({ product }: { product: Product }) {
    const [paths, setPaths] = useState<string[]>([]);

    useEffect(() => {
        setPaths(product.imagePaths)
    }, [])

    const API_URL = import.meta.env.VITE_API_BASE_URL;

    const previews = paths.map((path, index) => {
        return <Image key={index} src={`${API_URL}/${path}`} alt={"error"} />;
    });

    return (
        <Box pt={"xs"}>
            <Text
                size="sm"
                fw={600}
                style={{
                    marginBottom: 4,
                    display: 'block',
                }}>Images</Text>
            <Dropzone accept={['image/png']} onDrop={() => { }}>
                <Text ta="center">Drop images here</Text>
            </Dropzone>

            <SimpleGrid cols={{ base: 1, sm: 4 }} mt={previews.length > 0 ? 'xs' : 0}>
                {previews}
            </SimpleGrid>
        </Box>
    );
}
