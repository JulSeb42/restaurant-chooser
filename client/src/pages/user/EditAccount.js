// Packages
import React, { useContext, useState, useEffect } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import { Font, Form, Input, Alert, Autocomplete } from "tsx-library-julseb"

// API
import { AuthContext } from "../../context/auth"
import userService from "../../api/user.service"

// Components
import Page from "../../components/layouts/Page"
import DangerZone from "../../components/DangerZone"

const EditAccount = ({ edited, setEdited }) => {
    const { user, setUser, setToken, logoutUser } = useContext(AuthContext)
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
    const [fullName, setFullName] = useState(user.fullName)
    const [city, setCity] = useState(user.city)
    const [area, setArea] = useState(user.area)
    const [errorMessage, setErrorMessage] = useState(undefined)

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

    // Form handles
    const handleFullName = e => setFullName(e.target.value)
    const handleArea = e => setArea(e.target.value)

    // Submit form
    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = { fullName, city, area }

        userService
            .editAccount(user._id, requestBody)
            .then(res => {
                setUser(res.data.user)
                setToken(res.data.authToken)
                setEdited(!edited)
                navigate(-1)
            })
            .catch(err => {
                setErrorMessage(err.response.data.message)
                console.log(err)
            })
    }

    // Delete account
    const handleDelete = e => {
        e.preventDefault()

        userService
            .deleteAccount(user._id)
            .then(() => {
                logoutUser()
                navigate("/goodbye")
            })
            .catch(err => console.log(err))
    }

    return (
        <Page title="Edit your account" template="form">
            <Font.H1>Edit your account</Font.H1>

            <Form
                btnPrimary="Save changes"
                btnCancel="/"
                onSubmit={handleSubmit}
            >
                <Input
                    label="Full name"
                    id="fullName"
                    onChange={handleFullName}
                    value={fullName}
                    autoFocus
                />

                <Input
                    label="Email"
                    value={user.email}
                    helperBottom="You can not edit your email"
                    disabled
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
                    label="Area"
                    id="area"
                    onChange={handleArea}
                    value={area}
                />
            </Form>

            {errorMessage && (
                <Alert as={Font.P} color="danger">
                    {errorMessage}
                </Alert>
            )}

            <Font.P>
                <Link to="/edit-account/password">Edit your password.</Link>
            </Font.P>

            <DangerZone
                textBtnOpen="Delete account"
                text="Are you sure you want to delete your account?"
                textBtnPrimary="Yes, delete my account"
                onClickPrimary={handleDelete}
            />
        </Page>
    )
}

export default EditAccount
