import {
    AppShell,
    UnstyledButton,
} from "@mantine/core";
import { Outlet } from "react-router-dom";
import classes from '../style/MobileNavbar.module.css';
import { WebsiteHeader } from "./WebsiteHeader";


export default function DefaultLayout() {

    const buttons = [
        <UnstyledButton key={1} mx = { "xs"} className = { classes.control } > Home</UnstyledButton >,
        <UnstyledButton key={2} mx = { "xs"} className = { classes.control } > Blog</UnstyledButton >,
        <UnstyledButton key={3} mx = { "xs"} className = { classes.control } > Contacts</UnstyledButton >,
        <UnstyledButton key={4} mx={"xs"} className={classes.control}>Support</UnstyledButton>,
    ]

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true } }}
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