export interface Product {
    productID: number;
    name: string;
    brand: string;
    description: string;
    imagePaths: string[];
    rating: number;
}

export const productForm =
{
    initialValues: {
        name: "",
        brand: "",
        description: "",
        rating: 0,
        imagePaths: [],
    },
    validate: {
        name: (value: string) => (value ? null : "Name is required"),
        brand: (value: string) => (value ? null : "Brand is required"),
        description: (value: string) =>
            value.length > 5 ? null : "Description must be at least 5 characters",
        rating: (value: number) =>
            value >= 0 && value <= 5 ? null : "Rating must be between 0 and 5",
    },
}