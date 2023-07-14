import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useEditNoteMutation, useFetchNotesQuery} from "../store/api/NoteSlice";

const EditNote = () => {
  const navigate = useNavigate();
  const [currentNote, setCurrentNote] = useState({});

  const [ editNote ] = useEditNoteMutation();
  const { data: notes } = useFetchNotesQuery();

  const initialValues = {
    title: currentNote.title,
    content: currentNote.content,
  };

  const params = useParams();

  useEffect(() => {
      if (notes && notes.length > 0){
        const note = notes.find((note) => note.id === Number(params.id));
        if (note) {
          setCurrentNote(note);
          }
      }

    }, [notes, params.id]);

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("content is required"),
  });

  const handleSubmit = (values) => {
    editNote({
      noteId: params.id,
      updatedNote: values
    }).unwrap().then(() => {
      navigate("/");
    });
  };

  return (
      <div className="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto mt-[80px] lg:w-1/2">
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            {/* Title field */}
            <div className="mb-5">
              <Field
                type="text"
                id="title"
                name="title"
                placeholder="Title"
                className="border border-gray-300 shadow p-3 w-full rounded mb-"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500"
              />
            </div>

            {/* content field */}
            <div className="mb-5">
              <Field
                type="text"
                id="content"
                name="content"
                placeholder="content"
                className="border border-gray-300 shadow p-3 w-full rounded mb-"
              />
              <ErrorMessage
                name="content"
                component="div"
                className="text-red-500"
              />
            </div>


            {/* Submit button */}
            <button
              type="submit"
              className="block w-full bg-yellow-400 text-black font-bold p-4 rounded-lg hover:bg-yellow-500"
            >
              Edit Note
            </button>
          </Form>
        </Formik>
      </div>
  );
};

export default EditNote;





// return (
//   <div className="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto mt-[80px] lg:w-1/2">
//     <Formik
//       initialValues={initialValues}
//       validationSchema={validationSchema}
//       onSubmit={handleSubmit}
//     >
//       <Form>
//         <div className="mb-5">
//           <Field
//             type="text"
//             id="title"
//             name="title"
//             placeholder="Title"
//             className="border border-gray-300 shadow p-3 w-full rounded mb-"
//           />
//           <ErrorMessage name="title" component="div" className="text-red-500" />
//         </div>

//         <div className="mb-5">
//           <Field
//             as="textarea"
//             name="content"
//             placeholder="Body"
//             className="border border-gray-300 shadow p-3 w-full rounded mb-"
//           />
//           <ErrorMessage name="content" component="div" className="text-red-500" />
//         </div>

//         <button
//           type="submit"
//           className="block w-full bg-yellow-400 text-black font-bold p-4 rounded-lg hover:bg-yellow-500"
//         >
//           Edit Note
//         </button>
//       </Form>
//     </Formik>
//   </div>
// );
