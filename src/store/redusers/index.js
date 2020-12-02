import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storageSession from 'redux-persist/es/storage/session';
import todo from "./todo";

const persistConfig = {
    key: "root",
    storage: storageSession,
    whitelist: ["todo"]
}

const rootReduser = combineReducers({
    todo: todo
})

export default persistReducer(persistConfig, rootReduser)