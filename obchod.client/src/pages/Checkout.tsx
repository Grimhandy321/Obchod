import {
    Box,
    Button,
    Card,
    Divider,
    Group,
    Stack,
    Text,
    Title,
} from "@mantine/core";
import { IconMinus, IconPlus, IconTrash } from "@tabler/icons-react";
import { useShoppingCartStore } from "../lib/context/useShoppingCartStore";

export default function Checkout() {
    const cartItems = useShoppingCartStore((state) => state.items);
    const clearCart = useShoppingCartStore((state) => state.clearCart);
    const removeItem = useShoppingCartStore((state) => state.removeItem);
    const updateQuantity = useShoppingCartStore((state) => state.updateQuantity);

    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.quantity * item.product?.price,
        0
    );
    console.log(cartItems)
    return (
        <Box maw={"70%"} mx="auto" mt="xl">
            <Title order={2}>Checkout</Title>
            <Divider my="md" />

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
                                radius="md"
                                withBorder
                            >
                                <Group justify="sp" mb="xs">
                                    <div>
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
                                            updateQuantity(
                                                item.product.productID,
                                                item.quantity - 1
                                            )
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
                                            updateQuantity(
                                                item.product.productID,
                                                item.quantity + 1
                                            )
                                        }
                                        variant="outline"
                                    >
                                        <IconPlus size={14} />
                                    </Button>
                                </Group>
                            </Card>
                        ))}
                    </Stack>
                    <Group justify="space-between" mt="md">
                        <Group>
                            <Button onClick={clearCart}>
                                Place older
                            </Button>
                            <Text>Total: ${totalPrice.toFixed(2)}</Text>
                        </Group>
                        <Button color="red" onClick={clearCart}>
                            Clear Cart
                        </Button>
                    </Group>

                    <Divider my="md" />
                </>
            )}
        </Box>
    );
}
