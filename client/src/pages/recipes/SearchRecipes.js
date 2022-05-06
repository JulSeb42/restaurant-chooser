// Packages
import React, { useState, useEffect } from "react"
import {
    Font,
    PageLoading,
    Button,
    Input,
    Grid,
    Variables,
} from "tsx-library-julseb"
import { getRandom, unslugify } from "js-utils-julseb"

// API
import recipeService from "../../api/recipe.service"

// Components
import Page from "../../components/layouts/Page"

const SearchRecipes = () => {
    // Get all recipes
    // cuisine, ingredients, preparationTime => max time, cookingTime => max time
    const [allRecipes, setAllRecipes] = useState([])
    const [allCuisines, setAllCuisines] = useState([])
    const [allIngredients, setAllIngredients] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        recipeService
            .allRecipes()
            .then(res => {
                setAllRecipes(res.data)
                setAllCuisines([
                    ...new Set(
                        res.data
                            .map(recipe => recipe.cuisine)
                            .sort()
                            .flat()
                    ),
                ])
                setAllIngredients([
                    ...new Set(
                        res.data
                            .map(recipe => recipe.ingredients)
                            .sort()
                            .flat()
                    ),
                ])
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }, [])

    // Form items
    const [cuisine, setCuisine] = useState("all")
    const [ingredient, setIngredient] = useState("all")
    const [preparationTime, setPreparationTime] = useState(0)
    const [cookingTime, setCookingTime] = useState(0)

    // Form handles
    const handleCuisine = e => setCuisine(e.target.value)
    const handleIngredient = e => setIngredient(e.target.value)
    const handlePreparationTime = e => setPreparationTime(e.target.value)
    const handleCookingTime = e => setCookingTime(e.target.value)

    // Results
    let results = allRecipes

    if (cuisine !== "all") {
        results = results.filter(recipe => recipe.cuisine.includes(cuisine))
    }

    if (ingredient !== "all") {
        results = results.filter(recipe =>
            recipe.ingredients.includes(ingredient)
        )
    }

    if (preparationTime > 0) {
        results = results.filter(
            recipe => recipe.preparationTime <= preparationTime
        )
    }

    if (cookingTime > 0) {
        results = results.filter(recipe => recipe.cookingTime <= cookingTime)
    }

    const randomId = getRandom(results.map(recipe => recipe._id))

    return (
        <Page title="Search a recipe">
            {isLoading ? (
                <PageLoading />
            ) : (
                <>
                    <Font.H1>Search a recipe</Font.H1>

                    <Grid col={2} gap={Variables.Spacers.XS}>
                        <Input
                            label="Cuisine"
                            id="cuisine"
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

                        <Input
                            label="Ingredients"
                            id="ingredient"
                            type="select"
                            onChange={handleIngredient}
                            value={ingredient}
                        >
                            <option value="all">All</option>

                            {allIngredients.map((ingredient, i) => (
                                <option value={ingredient} key={i}>
                                    {unslugify(ingredient)}
                                </option>
                            ))}
                        </Input>

                        <Input
                            label="Max preparation time"
                            id="preparationTime"
                            type="number"
                            onChange={handlePreparationTime}
                            value={preparationTime}
                            min={0}
                            step={5}
                        />

                        <Input
                            label="Max cooking time"
                            id="cookingTime"
                            type="number"
                            onChange={handleCookingTime}
                            value={cookingTime}
                        />
                    </Grid>

                    <Button to={`/recipes/${randomId}`}>
                        Get a random recipe ({results.length} recipes)
                    </Button>
                </>
            )}
        </Page>
    )
}

export default SearchRecipes
