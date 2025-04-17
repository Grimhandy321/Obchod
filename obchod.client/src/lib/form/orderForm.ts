import { CartItem } from "../types";

export const orderForm = {
    initialValues: {
        street: '',
        city: '',
        zip: '',
        country: '',
        orderItems: []
    },

    validate: {
        street: (value : string) => (value.length < 3 ? 'Street is too short' : null),
        city: (value : string) => (value.length < 2 ? 'Enter a valid city' : null),
        zip: (value : string) => (/^\d{3,}$/.test(value) ? null : 'Invalid ZIP code'),
        country: (value: string) => (value.length < 2 ? 'Enter a valid country' : null),
        orderItems: (values: CartItem[]) => (values.length < 1  ? "Order must have items" : null)
    },
}
