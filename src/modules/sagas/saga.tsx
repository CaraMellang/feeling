import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { SIGNIN_FAILED, SIGNIN_SUCCESS } from "../redux/User";
import { postGetTodoSaga } from "./todoSaga";
import { postUser } from "./userSaga";

const userSignInRequestType = "userReducer/SIGNIN_REQUEST";
const todoPostReadRequestType = "todosReducer/TODOS_REQUEST"; //read
// const todoPostReadRequestType = "todosReducer/TODOS_CREATE_REQUEST"; //create
// const todoPostReadRequestType = "todosReducer/TODOS_CREATE_REQUEST"; //update
// const todoPostReadRequestType = "todosReducer/TODOS_CREATE_REQUEST"; //remove

// async function postUserData(data: any) {
//   console.log("아 gg", data);
//   return await axios.post("http://localhost:5000/auth/signin", data);
// }

// function* postUser(action: any): Generator {
//   try {
//     console.log(action.payload);
//     const { data }: any = yield call(postUserData, action.payload);
//     console.log("user", data);
//     // yield put({
//     //   type: "signInReducer/SIGNIN_SUCCESS",
//     //   payload: data,
//     // });
//     yield put(SIGNIN_SUCCESS(data));
//   } catch (e) {
//     console.log("아니", e);
//     yield put(SIGNIN_FAILED(e));
//     // yield put({ type: "signInReducer/SIGNIN_FAILED", payload: e });
//   }
// }

function* mySaga() {
  yield takeLatest(userSignInRequestType, postUser);
  yield takeLatest(todoPostReadRequestType, postGetTodoSaga);
}

export default mySaga;
