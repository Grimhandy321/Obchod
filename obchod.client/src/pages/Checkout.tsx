import {
    Button,
    Card,
    Group,
    Input,
    NumberInput,
    Stack,
    Text,
    TextInput,
    Title,
    Divider,
    Box,
} from "@mantine/core";

import { useShoppingCartStore } from "../lib/context/useShoppingCartStore";
export default function Checkout() {
    const cartItems = useShoppingCartStore((state) => state.items);
    const clearCart = useShoppingCartStore((state) => state.clearCart);

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
      <Box maw={600} mx="auto" mt="xl">
          <Title order={2}>Checkout</Title>
          <Divider my="md" />

          {cartItems.length === 0 ? (
              <Text>Your cart is empty.</Text>
          ) : (
              <>
                  <Stack spacing="sm" mb="md">
                      {cartItems.map((item) => (
                          <Card key={item.productID} shadow="xs" p="sm" radius="md" withBorder>
                              <Group position="apart">
                                  <Text>{item.name}</Text>
                                  <Text>Qty: {item.quantity}</Text>
                              </Group>
                          </Card>
                      ))}
                  </Stack>

                  <Text>Total items: {totalItems}</Text>

                  <Divider my="md" />

                  <form onSubmit={form.onSubmit(handleSubmit)}>
                      <Stack>
                          <TextInput
                              label="Full Name"
                              placeholder="John Doe"
                              {...form.getInputProps("name")}
                          />
                          <TextInput
                              label="Email"
                              placeholder="john@example.com"
                              {...form.getInputProps("email")}
                          />
                          <Input.Wrapper label="Shipping Address">
                              <Input
                                  placeholder="123 Main St, City"
                                  {...form.getInputProps("address")}
                              />
                          </Input.Wrapper>

                          <Button type="submit" fullWidth mt="md">
                              Place Order
                          </Button>
                      </Stack>
                  </form>
              </>
          )}
      </Box>
  );
}
