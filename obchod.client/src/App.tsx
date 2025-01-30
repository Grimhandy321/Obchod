import { createTheme, MantineProvider } from '@mantine/core';
import { Notifications } from "@mantine/notifications";
import {
    QueryClient,
    QueryClientProvider
} from "@tanstack/react-query";
import { Router } from './layout/Router';
import WebsiteHeader from './layout/WebsiteHeader';
import WebsiteFooter from './layout/WebsiteFooter';

const theme = createTheme({});
const queryClient = new QueryClient();


function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <MantineProvider theme={theme}>
                <Notifications position={"top-center"} zIndex={2077} />
                <WebsiteHeader/>
                <Router />
                <WebsiteFooter/>
            </MantineProvider>
        </QueryClientProvider >
    );
}

export default App;