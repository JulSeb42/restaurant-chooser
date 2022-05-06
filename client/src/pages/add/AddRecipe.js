// Packages
import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Font, Form, Input, Alert } from "tsx-library-julseb"
import { slugify, getRandom } from "ts-utils-julseb"

// API
import { AuthContext } from "../../context/auth"
import recipeService from "../../api/recipe.service"

// Components
import Page from "../../components/layouts/Page"

// Config
import markdownInputConfig from "../../config/markdown-input.config"

// Data
import picturesDelivery from "../../data/pictures-delivery.json"

const AddRecipe = () => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    // Form items
    const [name, setName] = useState("")
    const [cuisine, setCuisine] = useState("")
    const [ingredients, setIngredients] = useState("")
    const [preparationTime, setPreparationTime] = useState()
    const [cookingTime, setCookingTime] = useState()
    const [picture, setPicture] = useState("")
    const [instructions, setInstructions] = useState("")
    const [link, setLink] = useState("")
    const [errorMessage, setErrorMessage] = useState(undefined)

    // Form handles
    const handleName = e => setName(e.target.value)
    const handleCuisine = e => setCuisine(e.target.value)
    const handleIngredients = e => setIngredients(e.target.value)
    const handlePreparationTime = e => setPreparationTime(e.target.value)
    const handleCookingTime = e => setCookingTime(e.target.value)
    const handlePicture = e => setPicture(e.target.value)
    const handleLink = e => setLink(e.target.value)

    // Submit form
    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = {
            name,
            cuisine: cuisine.includes(",")
                ? cuisine.split(",").map(cuisine => slugify(cuisine))
                : slugify(cuisine),
            ingredients: ingredients.includes(",")
                ? ingredients.split(",").map(ingredient => slugify(ingredient))
                : slugify(ingredients),
            preparationTime,
            cookingTime,
            picture: picture === "" ? getRandom(picturesDelivery) : picture,
            poster: user,
        }

        recipeService
            .newRecipe(requestBody)
            .then(res => {
                navigate(`/recipes/${res.data._id}`)
                window.location.reload(false)
            })
            .catch(err => setErrorMessage(err.response.data.message))
    }

    // Map inputs
    const inputs = [
        {
            label: "Name",
            id: "name",
            onChange: handleName,
            value: name,
        },
        {
            label: "Cuisine",
            id: "cuisine",
            onChange: handleCuisine,
            value: cuisine,
            helperBottom: "Separate all cuisines with a comma",
        },
        {
            label: "Ingredients",
            id: "ingredients",
            onChange: handleIngredients,
            value: ingredients,
            helperBottom: "Seperate all ingredients with a comma",
        },
        {
            label: "Preparation time",
            id: "preparationTime",
            onChange: handlePreparationTime,
            value: preparationTime,
            helperBottom: "In minutes",
            min: 0,
            step: 5,
            type: "number",
        },
        {
            label: "Cooking time",
            id: "cookingTime",
            onChange: handleCookingTime,
            value: cookingTime,
            helperBottom: "In minutes",
            min: 0,
            step: 5,
            type: "number",
        },
        {
            label: "Picture*",
            id: "picture",
            onChange: handlePicture,
            value: picture,
            helperBottom: "Not mandatory",
        },
        {
            label: "Instructions*",
            id: "instructions",
            onChange: setInstructions,
            value: instructions,
            helperBottom: "Not mandatory",
            type: "markdown",
        },
        {
            label: "Link to instructions",
            id: "link",
            onChange: handleLink,
            value: link,
            helperBottom: "Not mandatory",
        },
    ]

    return (
        <Page title="Add a new recipe" template="form">
            <Font.H1>Add a new recipe</Font.H1>

            <Form
                btnPrimary="Add a new recipe"
                btnCancel={-1}
                onSubmit={handleSubmit}
            >
                {inputs.map((input, i) => (
                    <Input
                        label={input.label}
                        id={input.id}
                        onChange={input.onChange}
                        value={input.value}
                        helperBottom={input.helperBottom && input.helperBottom}
                        min={input.min && input.min}
                        step={input.step && input.step}
                        type={input.type || "text"}
                        key={i}
                        commands={
                            input.type === "markdown" && markdownInputConfig
                        }
                    />
                ))}
            </Form>

            {errorMessage && (
                <Alert as={Font.P} color="danger">
                    {errorMessage}
                </Alert>
            )}
        </Page>
    )
}

export default AddRecipe
