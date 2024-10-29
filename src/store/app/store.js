import storage from "redux-persist/lib/storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storageSession from "redux-persist/lib/storage/session";
import persistStore from "redux-persist/es/persistStore";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  FLUSH,
  PAUSE,
  PURGE,
  PERSIST,
  REGISTER,
  REHYDRATE,
  persistReducer,
} from "redux-persist";
import { baseApi } from "../api/baseApi";
import userReducer from "../features/userSlice";
import { imgbbApi } from "../service/imageUpload/imageUploadAPI";

const persistConfig = {
  key: "root",
  version: 1,
  storage: storage,
  blacklist: [baseApi.reducerPath],
};

const sessionConfig = {
  key: "session",
  version: 2,
  storage: storageSession,
};

const rootPersistReducers = combineReducers({
  userReducer,
});

const sessionReducers = combineReducers({
  userReducer,
});

const persistedReducers = persistReducer(persistConfig, rootPersistReducers);

const sessionReducer = persistReducer(sessionConfig, sessionReducers);

const store = configureStore({
  reducer: {
    local: persistedReducers,
    session: sessionReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    [imgbbApi.reducerPath]: imgbbApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(baseApi.middleware)
      .concat(imgbbApi.middleware),
});

export default store;
export const persistor = persistStore(store);
setupListeners(store.dispatch);
