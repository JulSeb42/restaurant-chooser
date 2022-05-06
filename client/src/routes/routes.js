// Basic pages
import Homepage from "../pages/Homepage"
import NotFound from "../pages/NotFound"

// Auth
import Signup from "../pages/auth/Signup"
import ThankYou from "../pages/auth/ThankYou"
import Verify from "../pages/auth/Verify"
import Login from "../pages/auth/Login"
import ForgotPassword from "../pages/auth/ForgotPassword"
import ForgotSent from "../pages/auth/ForgotSent"
import ResetPassword from "../pages/auth/ResetPassword"
import Goodbye from "../pages/auth/Goodbye"

// User
import EditAccount from "../pages/user/EditAccount"
import EditPassword from "../pages/user/EditPassword"

// Add items
import AddRestaurant from "../pages/add/AddRestaurant"
import AddDelivery from "../pages/add/AddDelivery"
import AddRecipe from "../pages/add/AddRecipe"

// Restaurants
import SearchRestaurants from "../pages/restaurants/SearchRestaurants"
import RestaurantDetail from "../pages/restaurants/RestaurantDetail"

// Deliveries
import SearchDeliveries from "../pages/deliveries/SearchDeliveries"
import DeliveryDetail from "../pages/deliveries/DeliveryDetail"

// Recipes
import SearchRecipes from "../pages/recipes/SearchRecipes"
import RecipeDetail from "../pages/recipes/RecipeDetail"

// All places
import AllPlaces from "../pages/AllPlaces"

// Routes
const routes = [
    // Basic pages
    {
        path: "/",
        element: Homepage,
        protected: true,
        anon: false,
        edit: false,
    },
    {
        path: "*",
        element: NotFound,
        protected: false,
        anon: false,
        edit: false,
    },

    // Auth
    {
        path: "/signup",
        element: Signup,
        protected: false,
        anon: true,
        edit: false,
    },
    {
        path: "/thank-you",
        element: ThankYou,
        protected: false,
        anon: false,
        edit: false,
    },
    {
        path: "/verify/:token/:id",
        element: Verify,
        protected: false,
        anon: false,
        edit: true,
    },
    {
        path: "/login",
        element: Login,
        protected: false,
        anon: true,
        edit: false,
    },
    {
        path: "/login/forgot-password",
        element: ForgotPassword,
        protected: false,
        anon: true,
        edit: false,
    },
    {
        path: "/login/forgot-password/email-sent",
        element: ForgotSent,
        protected: false,
        anon: true,
        edit: false,
    },
    {
        path: "/reset-password/:token/:id",
        element: ResetPassword,
        protected: false,
        anon: true,
        edit: false,
    },
    {
        path: "/goodbye",
        element: Goodbye,
        protected: false,
        anon: false,
        edit: false,
    },

    // User
    {
        path: "/edit-account",
        element: EditAccount,
        protected: true,
        anon: false,
        edit: true,
    },
    {
        path: "/edit-account/password",
        element: EditPassword,
        protected: true,
        anon: false,
        edit: true,
    },

    // Add items
    {
        path: "/new-restaurant",
        element: AddRestaurant,
        protected: true,
        anon: false,
        edit: false,
    },
    {
        path: "/new-delivery",
        element: AddDelivery,
        protected: true,
        anon: false,
        edit: false,
    },
    {
        path: "/new-recipe",
        element: AddRecipe,
        protected: true,
        anon: false,
        edit: false,
    },

    // Restaurants
    {
        path: "/restaurants",
        element: SearchRestaurants,
        protected: true,
        anon: false,
        edit: false,
    },
    {
        path: "/restaurants/:id",
        element: RestaurantDetail,
        protected: true,
        anon: false,
        edit: false,
    },

    // Deliveries
    {
        path: "/deliveries",
        element: SearchDeliveries,
        protected: true,
        anon: false,
        edit: false,
    },
    {
        path: "/deliveries/:id",
        element: DeliveryDetail,
        protected: true,
        anon: false,
        edit: false,
    },

    // Recipes
    {
        path: "/recipes",
        element: SearchRecipes,
        protected: true,
        anon: false,
        edit: false,
    },
    {
        path: "/recipes/:id",
        element: RecipeDetail,
        protected: true,
        anon: false,
        edit: false,
    },

    // All places
    {
        path: "/all-places",
        element: AllPlaces,
        protected: true,
        anon: false,
        edit: false,
    },
]

export default routes
