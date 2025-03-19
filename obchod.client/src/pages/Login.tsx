import {
    Anchor,
    Button,
    Container,
    Group,
    Paper,
    PasswordInput,
    Text,
    TextInput,
    Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAxiosClient } from '../lib/api/axios-client';
import { loginForm } from '../lib/form/loginForms';
function Login() {
    document.title = "Login";
    const form = useForm(loginForm);
    const client = useAxiosClient();

    return (
        <Container size={600} my={40}>
            <Title ta="center" >
                Welcome back!
            </Title>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
                Do not have an account yet?{' '}
                <Anchor href="/register" target="_blank" size="sm">
                    Create account
                </Anchor>
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <TextInput
                    label="Email"
                    placeholder="you@mantine.dev"
                    required
                    {...form.getInputProps("email")}
                />
                <PasswordInput
                    label="Password"
                    placeholder="Your password"
                    required
                    mt="md"
                    {...form.getInputProps("password")}
                />
                <Group justify="space-between" mt="lg">
                    <Anchor
                        component="button"
                        size="sm"
                    >
                        Forgot password?
                    </Anchor>
                </Group>
                <Button
                    fullWidth
                    mt="xl"
                    onClick={() => {
                        form.validate();
                        console.log(form)
                        if (form.isValid())
                        {
                            client.post('api/User/login', form.values,
                                {
                                    headers: { 'Content-Type': 'application/json' }
                                });
                        }
                    }}
                >
                    Sign in
                </Button>
            </Paper>
        </Container>
    );
}
export default Login;