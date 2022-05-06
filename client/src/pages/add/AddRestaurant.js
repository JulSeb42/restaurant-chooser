// Packages
import React, { useState, useContext, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Font, Form, Input, Autocomplete, Alert } from "tsx-library-julseb"
import { getRandom } from "js-utils-julseb"

// API
import { AuthContext } from "../../context/auth"
import restaurantService from "../../api/restaurant.service"

// Components
import Page from "../../components/layouts/Page"

// Data
import picturesRestaurants from "../../data/pictures-restaurant.json"

const AddRestaurant = () => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    // List suggestions
    const [allCities, setAllCities] = useState([])
    const [filteredCities, setFilteredCities] = useState("")

    useEffect(() => {
        axios
            .get("/citiesGermany.json")
            .then(res => setAllCities(res.data.map(city => city.name)))
            .catch(err => console.log(err))
    }, [])

    // Form items
    const [name, setName] = useState("")
    const [cuisine, setCuisine] = useState("")
    const [address, setAddress] = useState("")
    const [area, setArea] = useState("")
    const [city, setCity] = useState(user.city)
    const [picture, setPicture] = useState("")
    const [website, setWebsite] = useState("")
    const [menu, setMenu] = useState("")
    const [errorMessage, setErrorMessage] = useState(undefined)

    // Form handles
    const handleName = e => setName(e.target.value)
    const handleCuisine = e => setCuisine(e.target.value)
    const handleAddress = e => setAddress(e.target.value)
    const handleArea = e => setArea(e.target.value)
    const handlePicture = e => setPicture(e.target.value)
    const handleWebsite = e => setWebsite(e.target.value)
    const handleMenu = e => setMenu(e.target.value)

    const handleFilterLocation = e => {
        setCity(e.target.value)
        setFilteredCities(e.target.value)
    }

    let resultsCities = allCities.filter(city => {
        return city.toLowerCase().includes(filteredCities.toLowerCase())
    })

    const handleClickSuggestion = e => {
        setCity(e.target.innerText)
    }

    // Handle form
    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = {
            name,
            cuisine: cuisine.includes(",")
                ? cuisine.replaceAll(", ", ",").split(",")
                : cuisine,
            address,
            area,
            city,
            picture: picture === "" ? getRandom(picturesRestaurants) : picture,
            website,
            menu,
            poster: user,
        }

        restaurantService
            .newRestaurant(requestBody)
            .then(() => navigate("/"))
            .catch(err => setErrorMessage(err.response.data.message))
    }

    return (
        <Page title="Add a new restaurant" template="form">
            <Font.H1>Add a new restaurant</Font.H1>

            <Form
                btnPrimary="Add a new restaurant"
                btnCancel={-1}
                onSubmit={handleSubmit}
            >
                <Input
                    label="Name"
                    id="name"
                    onChange={handleName}
                    value={name}
                />

                <Input
                    label="Cuisine"
                    id="cuisine"
                    onChange={handleCuisine}
                    value={cuisine}
                    helperBottom="Separate all cuisines with a comma"
                />

                <Input
                    label="Address*"
                    id="address"
                    onChange={handleAddress}
                    value={address}
                    helperBottom="Not mandatory"
                />

                <Input
                    label="Area*"
                    id="area"
                    onChange={handleArea}
                    value={area}
                    helperBottom="Not mandatory"
                />

                <Autocomplete
                    label="City"
                    id="city"
                    onChange={handleFilterLocation}
                    value={city}
                    items={resultsCities}
                    onMouseDown={handleClickSuggestion}
                />

                <Input
                    label="Picture*"
                    id="picture"
                    onChange={handlePicture}
                    value={picture}
                    helperBottom="Not mandatory"
                />

                <Input
                    label="Website*"
                    id="website"
                    onChange={handleWebsite}
                    value={website}
                    helperBottom="Not mandatory"
                />

                <Input
                    label="Link to menu*"
                    id="menu"
                    onChange={handleMenu}
                    value={menu}
                    helperBottom="Not mandatory"
                />
            </Form>

            {errorMessage && (
                <Alert as={Font.P} color="danger">
                    {errorMessage}
                </Alert>
            )}
        </Page>
    )
}

export default AddRestaurant
