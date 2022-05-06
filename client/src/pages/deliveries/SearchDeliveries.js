// Packages
import React, { useState, useEffect, useContext } from "react"
import { Font, PageLoading, Button, Input, Grid } from "tsx-library-julseb"
import { getRandom, unslugify } from "ts-utils-julseb"

// API
import { AuthContext } from "../../context/auth"
import deliveryService from "../../api/delivery.service"

// Components
import Page from "../../components/layouts/Page"

const SearchDeliveries = () => {
    const { user } = useContext(AuthContext)

    // Get all deliveries
    const [allDeliveries, setAllDeliveries] = useState([])
    const [allCuisines, setAllCuisines] = useState([])
    const [allAreas, setAllAreas] = useState([])
    const [allCities, setAllCities] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        deliveryService.allDeliveries().then(res => {
            setAllDeliveries(res.data)
            setAllCuisines([
                ...new Set(
                    res.data
                        .map(delivery => delivery.cuisine)
                        .sort()
                        .flat()
                ),
            ])
            setAllAreas([
                ...new Set(res.data.map(delivery => delivery.area).sort()),
            ])
            setAllCities([
                ...new Set(res.data.map(delivery => delivery.city).sort()),
            ])
            setIsLoading(false)
        })
    }, [])

    // Form items
    const [city, setCity] = useState(user.city)
    const [area, setArea] = useState(user.area)
    const [cuisine, setCuisine] = useState("all")

    // Form handles
    const handleCity = e => setCity(e.target.value)
    const handleArea = e => setArea(e.target.value)
    const handleCuisine = e => setCuisine(e.target.value)

    // Results
    let results = allDeliveries

    if (city !== "all") {
        results = results.filter(delivery => delivery.city === city)
    }

    if (area !== "all") {
        results = results.filter(delivery => delivery.area === area)
    }

    if (cuisine !== "all") {
        results = results.filter(delivery => delivery.cuisine.includes(cuisine))
    }

    const randomId = getRandom(results.map(delivery => delivery._id))

    return (
        <Page title="Search Deliveries">
            {isLoading ? (
                <PageLoading />
            ) : (
                <>
                    <Font.H1>Search deliveries</Font.H1>

                    <Grid col={3}>
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

                    <Button to={`/deliveries/${randomId}`}>
                        Get a random restaurant ({results.length} restaurants)
                    </Button>
                </>
            )}
        </Page>
    )
}

export default SearchDeliveries
