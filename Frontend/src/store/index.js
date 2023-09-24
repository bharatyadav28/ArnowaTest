import { configureStore } from "@reduxjs/toolkit";

import currentUser from "./current-user";

const store = configureStore({
  reducer: { currentUser: currentUser },
});

export default store;
