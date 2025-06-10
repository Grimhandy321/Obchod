import {Tabs } from "@mantine/core";
import Products from "../components/admin/Products";
import Orders from "../components/admin/Orders";


function Admin() {
    document.title = "Admin";

    return(
        <Tabs defaultValue="products">
            <Tabs.List>
                <Tabs.Tab value="products" >
                    Products
                </Tabs.Tab>
                <Tabs.Tab value="Orders">
                    Orders
                </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="products">
                <Products/>
            </Tabs.Panel>

            <Tabs.Panel value="Orders">
                <Orders/>
            </Tabs.Panel>

        </Tabs>
    );
}

export default Admin;