import { all } from "redux-saga/effects";
import watchtodoSagas from "./sagas";

export default function* rootSaga() {
    yield all([
        watchtodoSagas()
    ])
}
