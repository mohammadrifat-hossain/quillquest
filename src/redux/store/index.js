import { configureStore} from '@reduxjs/toolkit'
import rootReducer from './RootReducer'

const store = configureStore({
    reducer: rootReducer,
    devTools:true,
    middleware: getDefautMiddleware =>{
        return getDefautMiddleware({
            serializableCheck:false
        })
    }
})
export default store