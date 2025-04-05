import { createTheme, MantineProvider } from '@mantine/core';
import { Notifications } from "@mantine/notifications";
import {
    QueryClient,
    QueryClientProvider
} from "@tanstack/react-query";
import { Router } from './Router';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css'
import type { MantineThemeOverride } from "@mantine/core";

const queryClient = new QueryClient();

export const mantineTheme: MantineThemeOverride = createTheme({});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <MantineProvider theme={mantineTheme} defaultColorScheme="dark">
                <Notifications position={"top-center"} zIndex={2077} />
                <Router />
            </MantineProvider>
        </QueryClientProvider >
    );
}

export default App;