import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import logger from "redux-logger";
import rootReducer from "./modules";

export const store = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  });
  return store;
};

const wrapper = createWrapper(store, {
  debug: process.env.NODE_ENV === "development",
});

export default wrapper;
