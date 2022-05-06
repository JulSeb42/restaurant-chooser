// Packages
import React, { useState, useEffect, useContext } from "react"
import { Grid, Input, TabsContent } from "tsx-library-julseb"

// API
import { AuthContext } from "../../context/auth"
import deliveryService from "../../api/delivery.service"

// Components
import ListItems from "../ListItems"

const Deliveries = ({ active }) => {
    const { user } = useContext(AuthContext)

    // Get all restaurants
    const [deliveries, setDeliveries] = useState([])
    const [allCities, setAllCities] = useState([])
    const [allAreas, setAllAreas] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        deliveryService
            .allDeliveries()
            .then(res => {
                setDeliveries(res.data)
                setAllCities([
                    ...new Set(res.data.map(delivery => delivery.city).sort()),
                ])
                setAllAreas([
                    ...new Set(res.data.map(delivery => delivery.area).sort()),
                ])
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }, [])

    // Search
    const [search, setSearch] = useState("")
    const [filterCity, setFilterCity] = useState(user.city)
    const [filterArea, setFilterArea] = useState(user.area)

    const handleSearch = e => setSearch(e.target.value)
    const handleCity = e => setFilterCity(e.target.value)
    const handleArea = e => setFilterArea(e.target.value)

    let results = deliveries.filter(restaurant =>
        restaurant.name.toLowerCase().includes(search.toLowerCase())
    )

    if (filterCity !== "all") {
        results = results.filter(restaurant => restaurant.city === filterCity)
    }

    if (filterArea !== "all") {
        results = results.filter(restaurant => restaurant.area === filterArea)
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
                    id="searchDelivery"
                    onChange={handleSearch}
                    value={search}
                />

                <Input
                    label="Filter by city"
                    id="filterCityDelivery"
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
                    label="Filter by area"
                    id="filterAreaDelivery"
                    type="select"
                    onChange={handleArea}
                    value={filterArea}
                >
                    <option value="all">All</option>

                    {allAreas.map((area, i) => (
                        <option value={area} key={i}>
                            {area}
                        </option>
                    ))}
                </Input>
            </Grid>

            <ListItems
                items={results}
                type="deliveries"
                isLoading={isLoading}
            />
        </TabsContent>
    )
}

export default Deliveries
