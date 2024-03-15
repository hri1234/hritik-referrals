import { configureStore } from '@reduxjs/toolkit'
import  authReducer from '../features/auth/authSlice'
import  productDetail  from '../features/products/productSlice'
import pointsReducer from "../features/points/pointsSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products : productDetail,
    points: pointsReducer
  },
})
