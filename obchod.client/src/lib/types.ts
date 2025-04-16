export interface Product {
    productID: number;
    name: string;
    brand: string;
    description: string;
    price: number;
    rating: number;
    imagePaths: string[];
}
export interface CartItem{
    product: Product;
    quantity: number;
}

export type Status = 'error' | 'success';
