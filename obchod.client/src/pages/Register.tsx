import { useEffect } from 'react';
import { useForm } from "@mantine/form"
import { Button, Group, TextInput } from '@mantine/core';

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
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <TextInput
                withAsterisk
                label="Email"
                placeholder="your@email.com"
                {...form.getInputProps('email')}
            />
            <TextInput
                withAsterisk
                label="your username"
                placeholder="your username"
                {...form.getInputProps('username')}
            />
            <TextInput
                withAsterisk
                label="password"
                {...form.getInputProps('passwordHash')}
            />
            <Group justify="flex-end" mt="md">
                <Button type="submit">Submit</Button>
            </Group>
        </form>
    );
    
}

export default Register;