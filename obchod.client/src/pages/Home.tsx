import {
    Container,
    Group,
    Text,
    Title,
    Image,
    Paper,
    Button,
} from '@mantine/core';




function Home() {
   
    return (
        <Container size="xs" style={{ paddingTop: '50px' }}>
            <Paper p="md" shadow="xs" style={{ textAlign: 'center' }}>
                {/* Image component */}
                <Image
                    src="/images/welcome-image.jpg"
                    alt="Welcome to our store"
                    height={250}
                    width={250}
                    fit="contain"
                    style={{ marginBottom: '20px' }}
                />

                {/* Title */}
                <Title order={1}>Welcome to Our E-Commerce Store!</Title>

                {/* Description */}
                <Text size="lg" style={{ marginTop: '20px' }}>
                    Discover the best products at amazing prices. Start shopping now and enjoy exclusive offers.
                </Text>

                {/* Call to Action Button */}
                <Group position="center" style={{ marginTop: '30px' }}>
                    <Button size="lg" color="blue">
                        Shop Now
                    </Button>
                </Group>
            </Paper>
        </Container>
    );
}

export default Home;