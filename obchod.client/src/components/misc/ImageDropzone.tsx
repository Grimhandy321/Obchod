import { Text,Image, SimpleGrid } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { Product } from '../../lib/types';
import { useEffect, useState } from 'react';
import { useAxiosClient } from '../../lib/api/axios-client';

export default function ImageDropzone({ product }: {product:Product }) {
    const [paths, setPaths] = useState<string[]>([]);
    const axios = useAxiosClient();

    useEffect(() => {
       setPaths(product.imagePaths)
    }, [])


    const previews = paths.map((path, index) => {
        return <Image key={index} src={path} alt={"error"} />;
    });

    return (
        <div>
            <Dropzone accept={IMAGE_MIME_TYPE} onDrop={() => { } }>
                <Text ta="center">Drop images here</Text>
            </Dropzone>

            <SimpleGrid cols={{ base: 1, sm: 4 }} mt={previews.length > 0 ? 'xl' : 0}>
                {previews}
            </SimpleGrid>
        </div>
    );
}
