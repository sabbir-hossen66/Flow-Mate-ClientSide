// import { useState } from "react";
// import { CardWithForm } from "../projectCard/CardWithForm";

// const ProjectCreate = () => {
//   const [create, setCreate] = useState(false)
//   const toggleCreateProject = () => {
//     setCreate(!create);
//   };
//     return (
//         <div>
//        <div className="absolute top-16 text-left left-32 m-1 bg-white shadow-lg rounded-md p-4 w-80 z-10">
//           <div onClick={toggleCreateProject} className="p-2 hover:bg-gray-100 border-b">
//             <h2 className="font-bold text-gray-700">📝 Create board</h2>
//             <p className="text-gray-500 text-sm">
//               A board is made up of cards ordered on lists. Use it to manage projects, track information, or organize anything.
//             </p>
//           </div>
//           {create && (
//             <div>
//               <CardWithForm></CardWithForm>
//             </div>
//           )}
//           <div className="p-2 mt-2 hover:bg-gray-100">
//             <h2 className="font-bold text-gray-700">📋 Start with a template</h2>
//             <p className="text-gray-500 text-sm">
//               Get started faster with a board template.
//             </p>
//           </div>
//         </div>
//         </div>
//     );
// };

// export default ProjectCreate;

import { useState } from "react";
import { CardWithForm } from "../projectCard/CardWithForm";

const ProjectCreate = () => {
  const [create, setCreate] = useState(false);

  const toggleCreateProject = () => {
    setCreate(!create);
  };

  // close form 
  const closeForm = () => {
    setCreate(false); // Hide the form when the X button is clicked
  };
  return (
    <div>
      <div className="absolute top-16 text-left left-32 m-1 bg-white shadow-lg rounded-md  w-80 z-10">
        {/* Conditionally render the Create board section */}
        {!create && (
          <div onClick={toggleCreateProject} className="p-4 hover:bg-gray-100 cursor-pointer">
            <h2 className="font-bold text-gray-700">📝 Create board</h2>
            <p className="text-gray-500 text-sm">
              A board is made up of cards ordered on lists. Use it to manage projects, track information, or organize anything.
            </p>
          </div>
        )}

        {/* Conditionally render the CardWithForm component when "Create board" is clicked */}
        {create && (
          <div>
            <CardWithForm closeForm={closeForm} />
          </div>
        )}

        
      </div>
    </div>
  );
};

export default ProjectCreate;
