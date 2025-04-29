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

export interface Order {
    orderID: number;
    status: number;
    orderItems: OrderItem[];
    dateTime: string;
}

export interface OrderItem {
    id: number;
    product: Product;
    quantity: number;
}