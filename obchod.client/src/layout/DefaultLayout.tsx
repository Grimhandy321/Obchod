import {
    Box,
    Container
} from "@mantine/core";
import { Outlet } from "react-router-dom";
import { WebsiteFooter } from "./WebsiteFooter";
import { WebsiteHeader } from "./WebsiteHeader";

export default function DefaultLayout() {
    return (
        <>
            <Container size={"100vw"} p={0} m={0}>
                <WebsiteHeader />
                <Box mx={20}>
                    <Outlet />
                </Box>
                <div id={"consent_blackbar"}></div>
            </Container>
            <WebsiteFooter />
        </>
    );
}