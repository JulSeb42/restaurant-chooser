// Server
import http from "./http-common"

class RestaurantService {
    allRestaurants() {
        return http.get("/restaurant/all-restaurants")
    }

    restaurant(id) {
        return http.get(`/restaurant/restaurant/${id}`)
    }

    newRestaurant(requestBody) {
        return http.post("/restaurant/new-restaurant", requestBody)
    }

    editRestaurant(id, requestBody) {
        return http.put(`/restaurant/edit-restaurant/${id}`, requestBody)
    }

    deleteRestaurant(id) {
        return http.delete(`/restaurant/delete-restaurant/${id}`)
    }
}

export default new RestaurantService()
