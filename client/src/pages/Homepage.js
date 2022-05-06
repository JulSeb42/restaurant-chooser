// Packages
import React, { useContext } from "react"
import { Font, Grid } from "tsx-library-julseb"
// import { getFirstName } from "ts-utils-julseb"

// API
import { AuthContext } from "../context/auth"

// Components
import Page from "../components/layouts/Page"
import CardLink from "../components/ui/CardLink"

const Homepage = () => {
    const { user } = useContext(AuthContext)

    const cards = [
        {
            to: "/restaurants",
            text: "Eat outside",
            img: "/images/restaurant.jpg",
        },
        {
            to: "/deliveries",
            text: "Order food",
            img: "/images/delivery.jpg",
        },
        {
            to: "/recipes",
            text: "Cook",
            img: "/images/cooking.jpg",
        },
    ]

    return (
        <Page title="Homepage">
            {/* <Font.H1>Hello {getFirstName(user.fullName)}</Font.H1> */}
            <Font.H1>Hello {user.fullName}</Font.H1>

            <Font.H2>Tonight, you want to:</Font.H2>

            <Grid col={3}>
                {cards.map((item, i) => (
                    <CardLink item={item} key={i} />
                ))}
            </Grid>
        </Page>
    )
}

export default Homepage
