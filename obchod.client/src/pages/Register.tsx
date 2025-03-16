import { useEffect } from 'react';
import { useForm } from "@mantine/form"
import { Button, Container, Group,Paper,TextInput,PasswordInput,Checkbox   } from '@mantine/core';

function Register() {
    document.title = "Register";
    const form = useForm({
        initialValues: {
            email: '',
            username: '',
            passwordHash: '',
        },

        validate: {
            passwordHash: (value) => (/^(?=.*[A-Z])(?=.*\d)(?=.*\W).{6,}$/.test(value) ? null : 'Password'),
            username: (value) => value ? null : 'Cant be Epmty',
        },
    });

    // dont ask an already registered user to register over and over again
    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            document.location = "/";
        }
    }, []);

    return (
        <Container size={600} my={40}>
            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <TextInput label="Email" placeholder="you@mantine.dev" required />
                <PasswordInput label="Password" placeholder="Your password" required mt="md" />
                <Group justify="space-between" mt="lg">
          
                </Group>
                <Button fullWidth mt="xl">
                    Sign in
                </Button>
            </Paper>
        </Container>
    );
    
}

export default Register;