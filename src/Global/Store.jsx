import storage from "redux-persist/lib/storage";
import myReducer from "./Features"
import { configureStore } from "@reduxjs/toolkit";
import { PERSIST, persistReducer } from "redux-persist";

const persistConfig ={
    key: "root",
    storage,
}

const persistedReducer= persistReducer(persistConfig,myReducer);

export const store = configureStore ({
    reducer:{persistedReducer},
    middleware:(getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck:{
            ignoreActions: [PERSIST]
        }
    })
})