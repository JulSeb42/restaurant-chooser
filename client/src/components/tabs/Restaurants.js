// Packages
import React, { useState, useEffect, useContext } from "react"
import { Grid, Input, TabsContent } from "tsx-library-julseb"
import { unslugify } from "js-utils-julseb"

// API
import { AuthContext } from "../../context/auth"
import restaurantService from "../../api/restaurant.service"

// Components
import ListItems from "../ListItems"

const Restaurants = ({ active }) => {
    const { user } = useContext(AuthContext)

    // Get all restaurants
    const [restaurants, setRestaurants] = useState([])
    const [allCities, setAllCities] = useState([])
    const [allCuisines, setAllCuisines] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        restaurantService
            .allRestaurants()
            .then(res => {
                setRestaurants(res.data)
                setAllCities([
                    ...new Set(
                        res.data.map(restaurant => restaurant.city).sort()
                    ),
                ])
                setAllCuisines([
                    ...new Set(
                        res.data
                            .map(restaurant => restaurant.cuisine)
                            .flat()
                            .sort()
                    ),
                ])
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }, [])

    // Search
    const [search, setSearch] = useState("")
    const [filterCity, setFilterCity] = useState(user.city)
    const [filterCuisine, setFilterCuisine] = useState("all")

    const handleSearch = e => setSearch(e.target.value)
    const handleCity = e => setFilterCity(e.target.value)
    const handleCuisine = e => setFilterCuisine(e.target.value)

    let results = restaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(search.toLowerCase())
    )

    if (filterCity !== "all") {
        results = results.filter(restaurant => restaurant.city === filterCity)
    }

    if (filterCuisine !== "all") {
        results = results.filter(restaurant =>
            restaurant.cuisine.includes(filterCuisine)
        )
    }

    return (
        <TabsContent
            as={Grid}
            active={active}
            style={{ display: active ? "grid" : "none" }}
        >
            <Grid col={3}>
                <Input
                    label="Search by name"
                    id="searchNameRestaurant"
                    onChange={handleSearch}
                    value={search}
                />

                <Input
                    label="Filter by city"
                    id="filterCityRestaurant"
                    type="select"
                    onChange={handleCity}
                    value={filterCity}
                >
                    <option value="all">All</option>

                    {allCities.map((city, i) => (
                        <option value={city} key={i}>
                            {city}
                        </option>
                    ))}
                </Input>

                <Input
                    label="Filter by cuisine"
                    id="filterCuisineRestaurant"
                    type="select"
                    onChange={handleCuisine}
                    value={filterCuisine}
                >
                    <option value="all">All</option>

                    {allCuisines.map((cuisine, i) => (
                        <option value={cuisine} key={i}>
                            {unslugify(cuisine)}
                        </option>
                    ))}
                </Input>
            </Grid>

            <ListItems
                items={results}
                type="restaurants"
                isLoading={isLoading}
            />
        </TabsContent>
    )
}

export default Restaurants
