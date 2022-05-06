// Packages
import React, { useState, useEffect, useContext } from "react"
import { Font, PageLoading, Button, Input, Grid } from "tsx-library-julseb"
import { getRandom, unslugify } from "ts-utils-julseb"

// API
import { AuthContext } from "../../context/auth"
import restaurantService from "../../api/restaurant.service"

// Components
import Page from "../../components/layouts/Page"

const SearchRestaurants = () => {
    const { user } = useContext(AuthContext)

    // Get all restaurants
    const [allRestaurants, setAllRestaurants] = useState([])
    const [allCities, setAllCities] = useState([])
    const [allAreas, setAllAreas] = useState([])
    const [allCuisines, setAllCuisines] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        restaurantService
            .allRestaurants()
            .then(res => {
                setAllRestaurants(res.data)
                setAllCities([
                    ...new Set(
                        res.data.map(restaurant => restaurant.city).sort()
                    ),
                ])
                setAllAreas([
                    ...new Set(
                        res.data.map(restaurant => restaurant.area).sort()
                    ),
                ])
                setAllCuisines([
                    ...new Set(
                        res.data
                            .map(restaurant => restaurant.cuisine)
                            .sort()
                            .flat()
                    ),
                ])
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }, [])

    // Form items
    const [city, setCity] = useState(user.city)
    const [area, setArea] = useState("all")
    const [cuisine, setCuisine] = useState("all")

    // Form handles
    const handleCity = e => setCity(e.target.value)
    const handleArea = e => setArea(e.target.value)
    const handleCuisine = e => setCuisine(e.target.value)

    // Results
    let results = allRestaurants

    if (city !== "all") {
        results = results.filter(restaurant => restaurant.city === city)
    }

    if (area !== "all") {
        results = results.filter(restaurant => restaurant.area === area)
    }

    if (cuisine !== "all") {
        results = results.filter(restaurant =>
            restaurant.cuisine.includes(cuisine)
        )
    }

    const randomId = getRandom(results.map(restaurant => restaurant._id))

    return (
        <Page title="Search Restaurants">
            {isLoading ? (
                <PageLoading />
            ) : (
                <>
                    <Font.H1>Search Restaurants</Font.H1>

                    <Grid col={3} align="start">
                        <Input
                            label="City"
                            type="select"
                            onChange={handleCity}
                            value={city}
                        >
                            <option value="all">All</option>
                            {allCities.map((city, i) => (
                                <option value={city} key={i}>
                                    {unslugify(city)}
                                </option>
                            ))}
                        </Input>

                        <Input
                            label="Area"
                            type="select"
                            onChange={handleArea}
                            value={area}
                        >
                            <option value="all">All</option>

                            {allAreas.map((area, i) => (
                                <option value={area} key={i}>
                                    {unslugify(area)}
                                </option>
                            ))}
                        </Input>

                        <Input
                            label="Cuisine"
                            type="select"
                            onChange={handleCuisine}
                            value={cuisine}
                        >
                            <option value="all">All</option>

                            {allCuisines.map((cuisine, i) => (
                                <option value={cuisine} key={i}>
                                    {unslugify(cuisine)}
                                </option>
                            ))}
                        </Input>
                    </Grid>

                    <Button to={`/restaurants/${randomId}`}>
                        Get a random restaurant ({results.length} restaurants)
                    </Button>
                </>
            )}
        </Page>
    )
}

export default SearchRestaurants
