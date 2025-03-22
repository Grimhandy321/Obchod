export interface Product {
    productID: number;
    name: string;
    brand: string;
    description: string;
    imagePaths: string[];
    rating: number;
}
export type Status = 'error' | 'success';
