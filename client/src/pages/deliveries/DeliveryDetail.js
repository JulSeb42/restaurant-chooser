// Packages
import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { PageLoading, Grid, Variables, Flexbox, Font } from "tsx-library-julseb"
import { unslugify } from "js-utils-julseb"

// API
import deliveryService from "../../api/delivery.service"

// Components
import Page from "../../components/layouts/Page"
import Cover from "../../components/Cover"
import TextIcon from "../../components/ui/TextIcon"

const DeliveryDetail = () => {
    const { id } = useParams()

    // Get delivery info
    const [delivery, setDelivery] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        deliveryService
            .delivery(id)
            .then(res => {
                setDelivery(res.data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }, [id])

    // Info
    const infos = [
        {
            icon: "map",
            text: isLoading ? "Area" : delivery.area,
        },
        {
            icon: "city",
            text: isLoading ? "City" : delivery.city,
        },
        {
            icon: "app",
            text: isLoading ? "App" : delivery.app,
            to: isLoading ? "#" : delivery.link,
        },
    ]

    return (
        <Page title={isLoading ? "Delivery" : delivery.name}>
            {isLoading ? (
                <PageLoading />
            ) : (
                <>
                    <Cover item={delivery} />

                    <Grid col={3}>
                        {infos.map((item, i) => (
                            <TextIcon icon={item.icon} to={item.to} key={i}>
                                {item.text}
                            </TextIcon>
                        ))}
                    </Grid>

                    <Grid gap={Variables.Spacers.XS}>
                        <Font.H2>
                            Cuisine{delivery.cuisine.length > 1 && "s"}
                        </Font.H2>

                        <Flexbox gap={Variables.Spacers.S} wrap="wrap">
                            {delivery.cuisine.map((cuisine, i) => (
                                <Font.P key={i}>{unslugify(cuisine)}</Font.P>
                            ))}
                        </Flexbox>
                    </Grid>
                </>
            )}
        </Page>
    )
}

export default DeliveryDetail
