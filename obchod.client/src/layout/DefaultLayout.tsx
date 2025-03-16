import {
    AppShell,
    Burger,
    Group,
    UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { Outlet } from "react-router-dom";
import classes from '../style/MobileNavbar.module.css';
import { WebsiteHeader } from "./WebsiteHeader";


export default function DefaultLayout() {
    const [opened, { toggle }] = useDisclosure();

    const buttons = [
        <UnstyledButton mx={"xs"} className={classes.control}>Home</UnstyledButton>,
        <UnstyledButton mx={"xs"} className={classes.control}>Blog</UnstyledButton>,
        <UnstyledButton mx={"xs"} className={classes.control}>Contacts</UnstyledButton>,
        <UnstyledButton mx={"xs"}  className={classes.control}>Support</UnstyledButton>,
    ]

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
            padding="md"
        >
            <AppShell.Header>
                <WebsiteHeader/>
            </AppShell.Header>

            <AppShell.Navbar py="md" px={4}>
                {buttons}
            </AppShell.Navbar>
     
            <AppShell.Main>
                <Outlet/>
            </AppShell.Main>
        </AppShell>
    );
}