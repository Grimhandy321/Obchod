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
import { loginForm } from '../lib/form/loginForms';
import { useLoginQuery } from '../api/useLoginQuery';
import { useQueryResult } from '../lib/api/useQueryResult';
import { authService } from '../lib/misc/authService';
import { useNavigate } from 'react-router-dom';

function Login() {
    document.title = "Login";
    const form = useForm(loginForm);
    const navigate = useNavigate();
    const loginResult = useLoginQuery({ form});

    useQueryResult({
        result: loginResult,
        onSuccess: async (data) => {
            console.log(data);
            if (data.status == "success") {
                authService.setToken(data.token)
                if (data.location)
                {
                    navigate(data.location);
                }
            }
        }
    });

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
                        if (form.isValid())
                        {
                            loginResult.refetch();
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