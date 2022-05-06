// Server
import http from "./http-common"

class RecipeService {
    allRecipes() {
        return http.get("/recipes/all-recipes")
    }

    recipe(id) {
        return http.get(`/recipes/recipe/${id}`)
    }

    newRecipe(requestBody) {
        return http.post("/recipes/new-recipe", requestBody)
    }

    editRecipe(id, requestBody) {
        return http.put(`/recipes/edit-recipe/${id}`, requestBody)
    }

    deleteRecipe(id) {
        return http.delete(`/recipe/delete-recipe/${id}`)
    }
}

export default new RecipeService()
