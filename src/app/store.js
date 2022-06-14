import { configureStore } from '@reduxjs/toolkit';
import generalPropertiesReducer from '../components/slices/general/generalPropertiesSlice'

export default configureStore({
  reducer: {
    generalProperties: generalPropertiesReducer,
   
  },
})