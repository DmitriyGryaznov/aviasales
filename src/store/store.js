import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import rootReducer from "./reducers/rootReducer";
// import { ticketsApi } from "./api/api";




// функция `setupStore` создает Redux store
//  с помощью `configureStore` из библиотеки 
//  Redux Toolkit. В этой функции указывается 
//  корневой редьюсер (rootReducer), который 
//  объединяет все редьюсеры Вашего приложения. 
//  Когда Redux выполняет действие (action), 
//  он передает текущее состояние (state) 
//  и это действие в каждый редьюсер, чтобы обновить 
//  состояние в соответствии с этим действием.
export const setupStore = ()=>{
    return configureStore({
        reducer: rootReducer, 
        // middleware: getDefaultMiddleware(),
        // middleware: (getDefualtMiddleware)=>{}
        // middleware: (getDefaultMiddleware) =>
            // getDefaultMiddleware().concat(ticketsApi.middleware)
    })
}





