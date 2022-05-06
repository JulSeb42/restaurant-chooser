// Packages
import React, { useState, useEffect } from "react"
import { Grid, Input, TabsContent } from "tsx-library-julseb"
import { unslugify } from "ts-utils-julseb"

// API
import recipeService from "../../api/recipe.service"

// Components
import ListItems from "../ListItems"

const Recipes = ({ active }) => {
    // Get all recipes
    const [recipes, setRecipes] = useState([])
    const [allCuisines, setAllCuisines] = useState([])
    const [allIngredients, setAllIngredients] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        recipeService
            .allRecipes()
            .then(res => {
                setRecipes(res.data)
                setAllCuisines([
                    ...new Set(
                        res.data
                            .map(recipe => recipe.cuisine)
                            .flat()
                            .sort()
                    ),
                ])
                setAllIngredients([
                    ...new Set(
                        res.data
                            .map(recipe => recipe.ingredients)
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
    const [filterCuisine, setFilterCuisine] = useState("all")
    const [filterIngredients, setFilterIngredients] = useState("all")

    const handleSearch = e => setSearch(e.target.value)
    const handleCuisine = e => setFilterCuisine(e.target.value)
    const handleIngredients = e => setFilterIngredients(e.target.value)

    let results = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(search.toLowerCase())
    )

    if (filterCuisine !== "all") {
        results = results.filter(recipe =>
            recipe.cuisine.includes(filterCuisine)
        )
    }

    if (filterIngredients !== "all") {
        results = results.filter(recipe =>
            recipe.ingredients.includes(filterIngredients)
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
                    id="searchRecipe"
                    onChange={handleSearch}
                    value={search}
                />

                <Input
                    label="Filter by cuisine"
                    id="filterCuisineRecipe"
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

                <Input
                    label="Filter by ingredients"
                    id="filterIngredientsRecipe"
                    type="select"
                    onChange={handleIngredients}
                    value={filterIngredients}
                >
                    <option value="all">All</option>

                    {allIngredients.map((ingredient, i) => (
                        <option value={ingredient} key={i}>
                            {unslugify(ingredient)}
                        </option>
                    ))}
                </Input>
            </Grid>

            <ListItems items={results} type="recipes" isLoading={isLoading} />
        </TabsContent>
    )
}

export default Recipes
