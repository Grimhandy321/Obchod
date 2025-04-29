import { useEffect, useState } from 'react';
import { Card, Text,Group,Divider,Title, Stack,Badge, Loader } from '@mantine/core';
import { Order } from '../lib/types';
import { useAxiosClient } from '../lib/api/axios-client';

const OrderStatusArray = [
    'Pending',
    'Processing',
    'Shipped',
    'CancellePending',
    'Delivered',
    'Cancelled'
] as const;

export default function Orders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const axios = useAxiosClient();

    useEffect(() => {
        axios.get('/api/order/user')
            .then((res) => {
                setOrders(res.data);
            })
            .catch((err) => {
                console.error('Failed to fetch orders:', err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    type OrderStatus = typeof OrderStatusArray[number];

    const getStatusColor = (status: OrderStatus): string => {
        switch (status) {
            case 'Pending': return 'gray';
            case 'Processing': return 'yellow';
            case 'Shipped': return 'blue';
            case 'Delivered': return 'green';
            case 'CancellePending': return 'orange';
            case 'Cancelled': return 'red';
            default: return 'gray';
        }
    };

    if (loading) return <p>Loading orders...</p>;
    if (orders.length === 0) return <p>No orders found.</p>;

    if (loading) return <Loader />;

    return (
        <Stack>
            <Title order={2}>Your Orders</Title>

            {orders.length === 0 ? (
                <Text>No orders found.</Text>
            ) : (
                orders.map(order => {
                    const statusText = OrderStatusArray[order.status] ?? 'Unknown';
                    return (
                        <Card key={order.orderID} shadow="sm" padding="md" radius="md" withBorder>
                            <Group  mb="xs">
                                <Text>Order #{order.orderID}</Text>
                                <Badge color={getStatusColor(statusText)}>{statusText}</Badge>
                            </Group>

                            <Text size="sm" color="dimmed">
                                Placed on: {new Date(order.dateTime).toLocaleString()}
                            </Text>

                            <Divider my="sm" />

                            <Stack>
                                {order.orderItems.map((item, index) => (
                                    <Group key={index} >
                                        <Text>{item.product.name} × {item.quantity}</Text>
                                        <Text>${(item.product.price * item.quantity).toFixed(2)}</Text>
                                    </Group>
                                ))}
                            </Stack>
                        </Card>
                    );
                })
            )}
        </Stack>
    );
}