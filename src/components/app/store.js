import { configureStore } from '@reduxjs/toolkit';
import generalPropertiesReducer from '../slices/general/generalProperties'

export default configureStore({
  reducer: {
    generalProperties: generalPropertiesReducer,
   
  },
})