export interface Product {
    productID: number;
    name: string;
    brand: string;
    description: string;
    price: number;
    rating: number;
    imagePaths: string[];
}

export interface CartItem {
    product: Product;
    quantity: number;
}

export type Status = 'error' | 'success';

export type OrderStatus =
    | 'Pending'
    | 'Processing'
    | 'Shipped'
    | 'CancellePending'
    | 'Delivered'
    | 'Cancelled';

export interface OrderItem {
    orderItemID: number;
    productID: number;
    productName: string;
    productPrice: number;
    quantity: number;
}

export interface Order {
    orderID: number;
    status: number; // enum index from backend
    orderItems: OrderItem[];
    dateTime: string;
    totalPrice: number;
    userID: string;
    firstName: string;
    lastName: string;
    address: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
}
