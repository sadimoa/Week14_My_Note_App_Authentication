/* eslint-disable react/prop-types */

import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link} from "react-router-dom";
import { useFetchNotesQuery, useDeleteNoteMutation } from "../store/api/NoteSlice";
// import EditNote from './EditNote'


function Notes() {

  const { data: notes = [], status, error } = useFetchNotesQuery();
    
  console.log('Notes', notes)

  const [deleteNote] = useDeleteNoteMutation();


  const deleteNoteHandler = (id) => {
    deleteNote(id);
  };
  

  return (
    <div className="flex flex-wrap justify-center mt-28  rounded">
      {status === "loading" && <div className="relative p-5 bg-yellow-400 w-64 h-64 m-5 shadow-2xl overflow-hidden">Loading...</div>}
      {status === "failed" && <div className="relative p-5 bg-yellow-400 w-64 h-64 m-5 shadow-2xl overflow-hidden">Sorry, {error}</div>}
      {notes.map((note) =>  (
        <div
          className="relative bg-yellow-400 w-64 h-64 m-5 shadow-2xl overflow-hidden"
          key={note.id}
        >
          <div className="p-5">
            <h3 className="font-bold text-2xl mb-4">{note.title}</h3>
            <p>{note.content}</p>
          </div>
          <div className="absolute bg-yellow-400 w-12 h-12 rotate-45 -top-6 -left-6" />
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between mx-5 my-2">
          <Link to={`/notes/edit_note/${note.id}`}>
            <button className="mr-2">
              <FaEdit size={20} />
            </button>
            </Link>
            <button>
              <FaTrash size={20} onClick={() => deleteNoteHandler(note.id)} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Notes;