import { configureStore } from '@reduxjs/toolkit';
import {userReducer} from "./reducers/user"
import {cartReducer} from "./reducers/cart"
import { wishlistReducer } from './reducers/wishlist';
import { orderReducer } from './reducers/order'

const Store = configureStore({
    reducer:{
        user: userReducer,
        cart: cartReducer,
        wishlist: wishlistReducer,
        order: orderReducer
    },
});

export default Store; 