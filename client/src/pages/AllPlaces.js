// Packages
import React, { useState } from "react"
import {
    TabsContainer,
    TabsButtonsContainer,
    TabsButton,
} from "tsx-library-julseb"

// Components
import Page from "../components/layouts/Page"
import Restaurants from "../components/tabs/Restaurants"
import Deliveries from "../components/tabs/Deliveries"
import Recipes from "../components/tabs/Recipes"

const AllPlaces = () => {
    // Tabs
    const [active, setActive] = useState(1)

    const tabs = [
        {
            title: "Restaurants",
            component: Restaurants,
            index: 1,
        },
        {
            title: "Deliveries",
            component: Deliveries,
            index: 2,
        },
        {
            title: "Recipes",
            component: Recipes,
            index: 3,
        },
    ]

    return (
        <Page title="All places">
            <TabsContainer>
                <TabsButtonsContainer col={3}>
                    {tabs.map(tab => (
                        <TabsButton
                            onClick={() => setActive(tab.index)}
                            active={active === tab.index && true}
                            key={tab.index}
                        >
                            {tab.title}
                        </TabsButton>
                    ))}
                </TabsButtonsContainer>

                {tabs.map(tab => (
                    <tab.component
                        active={active === tab.index && true}
                        key={tab.index}
                    />
                ))}
            </TabsContainer>
        </Page>
    )
}

export default AllPlaces
