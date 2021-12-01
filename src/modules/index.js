import { combineReducers } from "redux";
import userSliceReducer from "./redux/User";
import todosSliceReducer from "./redux/Todos";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import sessionStorage from "redux-persist/es/storage/session";
import localStorage from "redux-persist/es/storage";

const persistConfig = {
  key: "root",
  storage: localStorage,

  // auth, board, studio 3개의 reducer 중에 auth reducer만 localstorage에 저장합니다.
  //   whitelist: ["signInReducer"],
  // blacklist -> 그것만 제외합니다
  whitelist: ["userSliceReducer"],
};

const rootReducer = combineReducers({ userSliceReducer, todosSliceReducer });

export default persistReducer(persistConfig, rootReducer);
