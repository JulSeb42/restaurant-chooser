// Packages
import React, { useState, useContext, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Font, Form, Input, Autocomplete, Alert } from "tsx-library-julseb"
import { getRandom } from "ts-utils-julseb"

// API
import { AuthContext } from "../../context/auth"
import deliveryService from "../../api/delivery.service"

// Components
import Page from "../../components/layouts/Page"

// Data
import picturesDelivery from "../../data/pictures-delivery.json"

const AddDelivery = () => {
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
    const [area, setArea] = useState("")
    const [city, setCity] = useState(user.city)
    const [app, setApp] = useState("")
    const [link, setLink] = useState("")
    const [picture, setPicture] = useState("")
    const [errorMessage, setErrorMessage] = useState(undefined)

    // Form handles
    const handleName = e => setName(e.target.value)
    const handleCuisine = e => setCuisine(e.target.value)
    const handleArea = e => setArea(e.target.value)
    const handleApp = e => setApp(e.target.value)
    const handleLink = e => setLink(e.target.value)
    const handlePicture = e => setPicture(e.target.value)

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

    // Submit form
    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = {
            name,
            cuisine: cuisine.includes(",")
                ? cuisine.replaceAll(", ", ",").split(",")
                : cuisine,
            area,
            city,
            app,
            link,
            picture: picture === "" ? getRandom(picturesDelivery) : picture,
            poster: user,
        }

        deliveryService
            .newDelivery(requestBody)
            .then(() => navigate("/"))
            .catch(err => setErrorMessage(err.response.data.message))
    }

    return (
        <Page title="Add a new delivery place" template="form">
            <Font.H1>Add a new delivery place</Font.H1>

            <Form
                onSubmit={handleSubmit}
                btnPrimary="Add a new place"
                btnCancel={-1}
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
                    helperBottom="Separate all cuisines with a comma"
                    onChange={handleCuisine}
                    value={cuisine}
                />

                <Input
                    label="Area"
                    id="area"
                    onChange={handleArea}
                    value={area}
                />

                <Autocomplete
                    label="City"
                    id="city"
                    onChange={handleFilterLocation}
                    value={city}
                    items={resultsCities}
                    onMouseDown={handleClickSuggestion}
                />

                <Input label="App" id="app" onChange={handleApp} value={app} />

                <Input
                    label="Link"
                    id="link"
                    type="url"
                    onChange={handleLink}
                    value={link}
                />

                <Input
                    label="Picture*"
                    id="picture"
                    onChange={handlePicture}
                    value={picture}
                    helperBottom="Not mandatory"
                />
            </Form>

            {errorMessage && (
                <Alert color="danger" as={Font.P}>
                    {errorMessage}
                </Alert>
            )}
        </Page>
    )
}

export default AddDelivery
