export const productForm = {
    initialValues: {
        name: '',
        brand: '',
        description: '',
        rating: 0,
        imagesPaths: [] as string[],
    },
    validate: {
        name: (value : string) => (value.trim().length === 0 ? 'Product name is required' : null),
        brand: (value: string) => (value.trim().length === 0 ? 'Brand name is required' : null),
        description: (value: string) => (value.trim().length === 0 ? 'Description is required' : null),
        imagesPaths: (value: string[]) => (value?.length === 0 ? 'At least one image is required' : null),
    },
}; 
