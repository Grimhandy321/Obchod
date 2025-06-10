import {
    Text,
    Stack,
    Card,
    Group,
    Title,
    Badge,
    Divider,
    Select,
    Button,
    Flex,
} from "@mantine/core";
import { useOrderQuery } from "../../api/useOrderQuery";
import { useQuerySuccess } from "../../lib/api/useQuerySuccess";
import { Order } from "../../lib/types";
import { useState } from "react";
import { useAxiosClient } from "../../lib/api/axios-client";
import { showErrorNotification, showNotification } from "../notifications/notifications";

const statusOptions = [
    { value: "0", label: "Pending" },
    { value: "1", label: "Processing" },
    { value: "2", label: "Shipped" },
    { value: "3", label: "CancellePending" },
    { value: "4", label: "Delivered" },
    { value: "5", label: "Cancelled" },
];

const statusLabels = statusOptions.reduce((acc, s) => {
    acc[parseInt(s.value)] = s.label;
    return acc;
}, {} as Record<number, string>);

function Orders() {
    const orderResult = useOrderQuery();
    const [orders, setOrders] = useState<Order[]>([]);
    const [editedStatuses, setEditedStatuses] = useState<Record<number, string>>({});
    const axios = useAxiosClient();

    useQuerySuccess(orderResult, async (data) => {
        setOrders(data);
    });

    const handleStatusChange = (orderId: number, newValue: string | null) => {
        if (newValue !== null) {
            setEditedStatuses((prev) => ({ ...prev, [orderId]: newValue }));
        }
    };

    const handleSave = async (order: Order) => {
        const updatedStatus = parseInt(editedStatuses[order.orderID] ?? `${order.status}`);
        const payload = {
            ...order,
            status: updatedStatus,
            orderItems: order.orderItems.map((item) => ({
                productID: item.productID,
                quantity: item.quantity,
            })),
        };

        try {
            await axios.put(`/api/order/${order.orderID}`, payload);
            setOrders((prev) =>
                prev.map((o) =>
                    o.orderID === order.orderID ? { ...o, status: updatedStatus } : o
                )
            );
            showNotification({message: "order status changed",title: "Success"})
        } catch {
            showErrorNotification({ message: "error", title: "Error" });
        }
    };

    return (
        <Stack gap="md">
            {orders?.map((order) => (
                <Card key={order.orderID} shadow="md" padding="lg" radius="md" mt="md" withBorder>
                    <Group>
                        <Title order={4}>Order #{order.orderID}</Title>
                        <Badge color="blue" variant="light">
                            {statusLabels[order.status] || "Neznámý stav"}
                        </Badge>
                    </Group>

                    <Text size="sm" color="dimmed" mt="xs">
                        Date: {new Date(order.dateTime).toLocaleString()}
                    </Text>
                    <Text size="sm">
                        Customer: {order.firstName} {order.lastName}
                    </Text>
                    <Text size="sm">
                        Address: {order.street}, {order.city}, {order.postalCode}, {order.country}
                    </Text>

                    <Divider my="sm" />

                    <Stack>
                        {order.orderItems.map((item) => (
                            <Group key={item.orderItemID}>
                                <Text>
                                    {item.productName} (x{item.quantity})
                                </Text>
                                <Text fw={500}>
                                    {(item.productPrice * item.quantity).toFixed(2)} Kè
                                </Text>
                            </Group>
                        ))}
                    </Stack>

                    <Divider my="sm" />

                    <Group>
                        <Text fw={700}>Total price:</Text>
                        <Text fw={700} color="teal">
                            {order.totalPrice.toFixed(2)} Kè
                        </Text>
                    </Group>

                    <Flex justify="flex-start"
                        align="flex-end" mt="md" gap="md">
                        <Select
                            label="Change order status"
                            data={statusOptions}
                            value={editedStatuses[order.orderID] ?? `${order.status}`}
                            onChange={(value) => handleStatusChange(order.orderID, value)}
                        />
                        <Button onClick={() => handleSave(order)}>Save</Button>
                    </Flex>
                </Card>
            ))}
        </Stack>
    );
}

export default Orders;
