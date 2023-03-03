import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../Reducer/Reducer";
const Store = configureStore({ reducer: loginReducer });
export default Store;
