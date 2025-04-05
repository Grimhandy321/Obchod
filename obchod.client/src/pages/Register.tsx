import { Button, Container, Group,Paper,TextInput,PasswordInput, Title ,Text   } from '@mantine/core';
import { registrationForm } from '../lib/form/registrationForm';
import { useForm } from '@mantine/form';
import { useAxiosClient } from '../lib/api/axios-client';

function Register() {
    document.title = "Register";
    const form = useForm(registrationForm);
    const client = useAxiosClient();

    return (
        <Container size={600} my={40}>
            <Title ta="center" >
                Register Account 
            </Title>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
            </Text>
            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <Group grow>
                    <TextInput
                        label="First name"
                        {...form.getInputProps("firstName")}
                        required
                    />
                    <TextInput
                        label="Surname"
                        {...form.getInputProps("lastName")}
                        required
                    />
                </Group>
                <TextInput
                    label="Email"
                    placeholder="Your email"
                    {...form.getInputProps("email")}
                    required />
                <PasswordInput
                    label="Password"
                    placeholder="Your password"
                    required
                    mt="md"
                    {...form.getInputProps("passwordHash")}
                />
                <Button
                    fullWidth mt="xl"
                    onClick={() => {
                        form.validate();
                        if (form.isValid())
                        {
                            client.post('api/User', form.values,
                                {
                                    headers: { 'Content-Type': 'application/json' }
                                });
                        }
                    }}
                >
                    Registers
                </Button>
            </Paper>
        </Container>
    );
    
}

export default Register;