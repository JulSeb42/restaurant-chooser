// Packages
import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { PageLoading, Grid, Variables, Flexbox, Font } from "tsx-library-julseb"
import { unslugify } from "ts-utils-julseb"

// API
import restaurantService from "../../api/restaurant.service"

// Components
import Page from "../../components/layouts/Page"
import Cover from "../../components/Cover"
import TextIcon from "../../components/ui/TextIcon"

const RestaurantDetail = () => {
    const { id } = useParams()

    // Get restaurant info
    const [restaurant, setRestaurant] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        restaurantService
            .restaurant(id)
            .then(res => {
                setRestaurant(res.data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }, [id])

    const infos = [
        {
            icon: "map",
            text: isLoading ? "Area" : restaurant.area,
        },
        {
            icon: "city",
            text: isLoading ? "City" : restaurant.city,
        },
    ]

    return (
        <Page title={isLoading ? "Restaurant" : restaurant.name}>
            {isLoading ? (
                <PageLoading />
            ) : (
                <>
                    <Cover item={restaurant} />

                    <Grid col={2} gap={Variables.Spacers.XS}>
                        {infos.map((info, i) => (
                            <TextIcon icon={info.icon} key={i}>
                                {info.text}
                            </TextIcon>
                        ))}

                        {restaurant.website && (
                            <TextIcon icon="browser" to={restaurant.website}>
                                Website
                            </TextIcon>
                        )}

                        {restaurant.menu && (
                            <TextIcon icon="menu" to={restaurant.menu}>
                                Menu
                            </TextIcon>
                        )}
                    </Grid>

                    {restaurant.cuisine.length > 0 && (
                        <Grid gap={Variables.Spacers.XS}>
                            <Font.H2>
                                Cuisine{restaurant.cuisine.length > 1 && "s"}
                            </Font.H2>

                            <Flexbox gap={Variables.Spacers.S} wrap="wrap">
                                {restaurant.cuisine.map((cuisine, i) => (
                                    <Font.P key={i}>
                                        {unslugify(cuisine)}
                                    </Font.P>
                                ))}
                            </Flexbox>
                        </Grid>
                    )}
                </>
            )}
        </Page>
    )
}

export default RestaurantDetail
