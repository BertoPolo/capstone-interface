import { configureStore } from '@reduxjs/toolkit';
import citiesSlice from '../components/slices/cities/citiesSlice'
import usersSlice from '../components/slices/users/usersSlice'
import routesSlice from '../components/slices/routes/routesSlice'

export default configureStore({
  reducer: {
    citiesSlice: citiesSlice,
    usersSlice: usersSlice,
    routesSlice: routesSlice,
  },
})