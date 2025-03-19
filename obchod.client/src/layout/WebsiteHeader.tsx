import {
    IconBook,
    IconChartPie3,
    IconChevronDown,
    IconCode,
    IconCoin,
    IconFingerprint,
    IconNotification,
} from '@tabler/icons-react';
import {
    Box,
    Burger,
    Button,
    Divider,
    Drawer,
    Group,
    ScrollArea,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from '../style/HeaderMegaMenu.module.css';
import { useNavigate } from 'react-router-dom';


export function WebsiteHeader() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const navigate = useNavigate();

    return (
        <Box pb={120}>
            <header className={classes.header}>
                <Group justify="space-between" h="100%">
                    <Group h="100%" gap={0} visibleFrom="sm">
                        <a href="/" className={classes.link}>
                            Home
                        </a>
                        <a href="/products" className={classes.link}>
                            Products
                        </a>
                        <a href="/contact" className={classes.link}>
                            Contact us
                        </a>
                    </Group>

                    <Group visibleFrom="sm">
                        <Button onClick={() => { navigate("/login") }} variant="default">Log in</Button>
                        <Button onClick={() => { navigate("/register") }} >Sign up</Button>
                    </Group>

                    <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
                </Group>
            </header>
            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="100%"
                padding="md"
                title="Navigation"
                hiddenFrom="sm"
                zIndex={1000000}
            >
                <ScrollArea h="calc(100vh - 80px" mx="-md">
                    <Divider my="sm" />
                    <a href="#" className={classes.link}>
                        Home
                    </a>
                    <a href="#" className={classes.link}>
                        Products
                    </a>
                    <a href="#" className={classes.link}>
                        Contact us 
                    </a>

                    <Divider my="sm" />
                    <Group justify="center" grow pb="xl" px="md">
                        <Button onClick={() => {navigate("/login") } } variant="default">Log in</Button>
                        <Button onClick={() => { navigate("/register") }} >Sign up</Button>
                    </Group>
                </ScrollArea>
            </Drawer>
        </Box>
    );
}