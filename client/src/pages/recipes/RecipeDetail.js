// Packages
import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import {
    PageLoading,
    Font,
    Grid,
    Flexbox,
    Variables,
    MarkdownContainer,
} from "tsx-library-julseb"
import { unslugify } from "js-utils-julseb"

// API
import recipeService from "../../api/recipe.service"

// Components
import Page from "../../components/layouts/Page"
import Cover from "../../components/Cover"
import TextIcon from "../../components/ui/TextIcon"

const RecipeDetail = () => {
    const { id } = useParams()

    // name,
    // cuisine,
    // ingredients,
    // preparationTime,
    // cookingTime,
    // picture,
    // instructions,
    // link

    // Get recipe
    const [recipe, setRecipe] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        recipeService
            .recipe(id)
            .then(res => {
                setRecipe(res.data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }, [id])

    // Info
    const infos = [
        {
            icon: "stopwatch",
            text: isLoading
                ? "Preparation time"
                : `${recipe.preparationTime} minute${
                      recipe.preparationTime > 1 ? "s" : ""
                  }`,
        },
        {
            icon: "restaurant",
            text: isLoading
                ? "Cooking time"
                : `${recipe.cookingTime} minute${
                      recipe.cookingTime > 1 ? "s" : ""
                  }`,
        },
    ]

    return (
        <Page title={isLoading ? "Recipe" : recipe.name}>
            {isLoading ? (
                <PageLoading />
            ) : (
                <>
                    <Cover item={recipe} />

                    <Grid col={recipe.link ? 3 : 2}>
                        {infos.map((info, i) => (
                            <TextIcon icon={info.icon} key={i}>
                                {info.text}
                            </TextIcon>
                        ))}

                        {recipe.link && (
                            <TextIcon icon="browser" to={recipe.link}>
                                Link to recipe
                            </TextIcon>
                        )}
                    </Grid>

                    <Grid gap={Variables.Spacers.XS}>
                        <Font.H2>Cuisines</Font.H2>

                        <Flexbox
                            wrap="wrap"
                            gap={`${Variables.Spacers.S} ${Variables.Spacers.XS}`}
                        >
                            {recipe.cuisine.map((cuisine, i) => (
                                <Font.P key={i}>{unslugify(cuisine)}</Font.P>
                            ))}
                        </Flexbox>
                    </Grid>

                    <Grid gap={Variables.Spacers.XS}>
                        <Font.H2>Ingredients</Font.H2>

                        <Flexbox
                            wrap="wrap"
                            gap={`${Variables.Spacers.S} ${Variables.Spacers.XS}`}
                        >
                            {recipe.ingredients.map((ingredient, i) => (
                                <Font.P key={i}>{unslugify(ingredient)}</Font.P>
                            ))}
                        </Flexbox>
                    </Grid>

                    {recipe.instructions && (
                        <Grid gap={Variables.Spacers.XS}>
                            <Font.H2>Instructions</Font.H2>

                            <MarkdownContainer>
                                {recipe.instructions}
                            </MarkdownContainer>
                        </Grid>
                    )}
                </>
            )}
        </Page>
    )
}

export default RecipeDetail
