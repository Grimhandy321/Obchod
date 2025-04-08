export interface Product {
    productId: number;
    name: string;
    brand: string;
    description: string;
    rating: number;
    imagePaths: string[];
}
export type Status = 'error' | 'success';
