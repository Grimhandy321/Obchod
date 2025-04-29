import {
    Box,
    Button,
    Card,
    Divider,
    Group,
    Stack,
    Text,
    Title,
    Image,
    Notification,
    TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconTrash, IconMinus, IconPlus } from "@tabler/icons-react";
import { useShoppingCartStore } from "../lib/context/useShoppingCartStore";
import { useState } from "react";
import { useAxiosClient } from "../lib/api/axios-client";

export default function Checkout() {
    const cartItems = useShoppingCartStore((state) => state.items);
    const clearCart = useShoppingCartStore((state) => state.clearCart);
    const removeItem = useShoppingCartStore((state) => state.removeItem);
    const updateQuantity = useShoppingCartStore((state) => state.updateQuantity);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const API_URL = import.meta.env.VITE_API_BASE_URL;
    const axios = useAxiosClient();

    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.quantity * item.product?.price,
        0
    );

    const form = useForm({
        initialValues: {
            address: "",
            street: "",
            city: "",
            postalCode: "",
            country: "",
        },

        validate: {
            address: (value) => (value ? null : "Address is required"),
            street: (value) => (value ? null : "Street is required"),
            city: (value) => (value ? null : "City is required"),
            postalCode: (value) => (value ? null : "Postal Code is required"),
            country: (value) => (value ? null : "Country is required"),
        },
    });

    const handlePlaceOrder = async (values: typeof form.values) => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const orderData = {
                orderItems: cartItems.map((item) => ({
                    ProductID: item.product.productID,
                    Quantity: item.quantity,
                })),
                ...values,
                totalPrice,
            };

            const response = await axios.post("/api/order", orderData);

            setSuccess("Order placed successfully!");
            clearCart();
            form.reset();
        } catch (err: any) {
            if (err.response?.status === 400 && err.response?.data?.errors) {
                const serverErrors = err.response.data.errors;
                Object.keys(serverErrors).forEach((field) => {
                    form.setFieldError(field.toLowerCase(), serverErrors[field][0]);
                });
                setError("Please correct the highlighted fields.");
            } else {
                setError("There was an issue placing your order. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box maw={"70%"} mx="auto" mt="xl">
            <Title order={2}>Checkout</Title>
            <Divider my="md" />

            {error && (
                <Notification color="red" onClose={() => setError(null)}>
                    {error}
                </Notification>
            )}

            {success && (
                <Notification color="green" onClose={() => setSuccess(null)}>
                    {success}
                </Notification>
            )}

            {cartItems.length === 0 ? (
                <Text>Your cart is empty.</Text>
            ) : (
                <>
                    <Stack mb="md">
                        {cartItems.map((item) => (
                            <Card
                                key={item.product.productID}
                                shadow="xs"
                                p="sm"
                                h="250px"
                                radius="md"
                                withBorder
                            >
                                <Group justify="sp" mb="xs">
                                    <div>
                                        <Image
                                            src={`${API_URL}/${item.product.imagePaths[0]}`}
                                            alt={item.product.name}
                                            width={100}
                                            height={100}
                                        />
                                        <Text fw={500}>{item.product.name}</Text>
                                        <Text size="sm" c="dimmed">
                                            ${item.product.price} x {item.quantity}
                                        </Text>
                                    </div>
                                    <Button
                                        color="red"
                                        variant="light"
                                        size="xs"
                                        onClick={() => removeItem(item.product.productID)}
                                        leftSection={<IconTrash size={14} />}
                                    >
                                        Remove
                                    </Button>
                                </Group>

                                <Group gap="xs">
                                    <Button
                                        size="xs"
                                        onClick={() =>
                                            updateQuantity(item.product.productID, item.quantity - 1)
                                        }
                                        disabled={item.quantity <= 1}
                                        variant="outline"
                                    >
                                        <IconMinus size={14} />
                                    </Button>
                                    <Text>{item.quantity}</Text>
                                    <Button
                                        size="xs"
                                        onClick={() =>
                                            updateQuantity(item.product.productID, item.quantity + 1)
                                        }
                                        variant="outline"
                                    >
                                        <IconPlus size={14} />
                                    </Button>
                                </Group>
                            </Card>
                        ))}
                    </Stack>

                    <form onSubmit={form.onSubmit(handlePlaceOrder)}>
                        <Stack>
                            <TextInput
                                label="Address"
                                placeholder="123 Main St"
                                {...form.getInputProps("address")}
                            />
                            <TextInput
                                label="Street"
                                placeholder="Main St"
                                {...form.getInputProps("street")}
                            />
                            <TextInput
                                label="City"
                                placeholder="New York"
                                {...form.getInputProps("city")}
                            />
                            <TextInput
                                label="Postal Code"
                                placeholder="10001"
                                {...form.getInputProps("postalCode")}
                            />
                            <TextInput
                                label="Country"
                                placeholder="USA"
                                {...form.getInputProps("country")}
                            />
                        </Stack>

                        <Group justify="space-between" mt="xl">
                            <Group>
                                <Button type="submit" loading={loading}>
                                    Place Order
                                </Button>
                                <Text>Total: ${totalPrice.toFixed(2)}</Text>
                            </Group>
                            <Button color="red" onClick={clearCart}>
                                Clear Cart
                            </Button>
                        </Group>
                    </form>

                    <Divider my="md" />
                </>
            )}
        </Box>
    );
}
