// Server
import http from "./http-common"

class DeliveryService {
    allDeliveries() {
        return http.get("/delivery/all-deliveries")
    }

    delivery(id) {
        return http.get(`/delivery/delivery/${id}`)
    }

    newDelivery(requestBody) {
        return http.post("/delivery/new-delivery", requestBody)
    }

    editDelivery(id, requestBody) {
        return http.put(`/delivery/edit-delivery/${id}`, requestBody)
    }

    deleteDelivery(id) {
        return http.delete(`/delivery/delete-delivery/${id}`)
    }
}

export default new DeliveryService()
