import { api as generatedApi } from './lcddbackend-api.generated';

const api = generatedApi;
export default api;
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// export const api = createApi({
//     baseQuery: fetchBaseQuery({ baseUrl: '/' }),
//     endpoints: () => ({}),
// });
// api.injectEndpoints({ endpoints: generatedApi.endpoints, overrideExisting: false });

//TODO FSA
// const formData = new FormData();
// formData.append("avatar", avatar);
// formData.append("name", name);

// jwtRefreshingFetch(
//     `${process.env.REACT_APP_BACKEND_BASE_URL}/api/activities/`,
//     {
//       method: "POST",
//       credentials: "include",
//       headers: {
//         accept: "*/*",
//       },
//       body: formData,
//     }
