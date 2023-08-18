import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://6j2m3t-6000.csb.app/api/",
  credentials: "include",

  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.refreshToken;
    console.log("🚀 ~ file: apiSlice.js:10 ~ token:", token)
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;

  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log("🚀 ~ file: apiSlice.js:19 ~ baseQueryWithReauth ~ result?.error?:", result?.error?.status)


  if (result?.error?.status === 401) {
    console.log("sending refresh token");
    // send refresh token to get new access token
    const refreshResult = await baseQuery("auth/refresh", api, extraOptions);
    console.log(refreshResult);
    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data, user }));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({

  }),
});
