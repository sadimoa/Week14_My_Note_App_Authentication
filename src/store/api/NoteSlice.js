import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import BASE_URL from "./BaseUrl";

const getToken = () => {
  return Cookies.get("token");
};

export const noteSlice = createApi({
  reducerPath: "noteApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["Notes"],
  endpoints: (builder) => ({
    // Fetch Notes
    fetchNotes: builder.query({
      query: () => {
        return {
          url: "/notes",
          method: "GET",
        };
      },
      providesTags: ["Notes"],
    }),

    // Add Note
    addNote: builder.mutation({
      query: (newNote) => ({
        url: "/create_note",
        method: "POST",
        body: newNote,
      }),
      invalidatesTags: ["Notes"],
    }),

    // Edit Note
    editNote: builder.mutation({
      query: ({ noteId, updatedNote }) => ({
        url: `/update_note/${noteId}`,
        method: "PUT",
        body: updatedNote,
      }),
      invalidatesTags: ["Notes"],
    }),

    // Delete Note
    deleteNote: builder.mutation({
      query: (noteId) => ({
        url: `/delete_note/${noteId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notes"],
    }),
  }),
});

export const {
  useFetchNotesQuery,
  useAddNoteMutation,
  useEditNoteMutation,
  useDeleteNoteMutation,
} = noteSlice;

export default noteSlice.reducer;
