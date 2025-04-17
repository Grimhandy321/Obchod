import {
    Box,
    Burger,
    Button,
    Divider,
    Drawer,
    Group,
    ScrollArea,
    Text
} from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import classes from '../style/HeaderMegaMenu.module.css';
import { useNavigate } from 'react-router-dom';
import { useObjectStore } from '../lib/context/userDataStore';
import { authService } from '../lib/misc/authService'




export function WebsiteHeader() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const navigate = useNavigate();
    const { data } = useObjectStore();

    return (
        <Box >
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
                    {!authService.isLoggedIn() ?
                        <Group visibleFrom="sm">
                            <Button onClick={() => { navigate("/login") }} variant="default">Log in</Button>
                            <Button onClick={() => { navigate("/register") }} >Sign up</Button>
                        </Group> :
                        <Group>
                            <IconShoppingCart size={18} onClick={() => { navigate("/checkout") }} />
                            <Text>{data.firstName + " " + data.lastName}</Text>
                        </Group>
                    }

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
                    {!authService.isLoggedIn() ?
                        <Group visibleFrom="sm">
                            <Button onClick={() => { navigate("/login") }} variant="default">Log in</Button>
                            <Button onClick={() => { navigate("/register") }} >Sign up</Button>
                        </Group> :
                        <Group>
                            <IconShoppingCart size={18} onClick={() => { navigate("/checkout") }} />
                            <Text>{data.firstName + " " + data.lastName}</Text>
                        </Group>
                    }
                </ScrollArea>
            </Drawer>
        </Box>
    );
}