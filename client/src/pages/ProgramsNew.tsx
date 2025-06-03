import { useNavigate } from "react-router-dom";

import CategoryForm from "../components/CategoryForm";

function ProgramNew() {
  const navigate = useNavigate();

  const newProgram = {
    name: "",
  };

  return (
    <CategoryForm
      defaultValue={newProgram}
      onSubmit={(programData) => {
        fetch(`${import.meta.env.VITE_API_URL}/api/programs`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(programData),
        })
          .then((response) => response.json())
          .then((data) => {
            navigate(`/programs/${data.insertId}`);
          });
      }}
    >
      Ajouter
    </CategoryForm>
  );
}

export default ProgramNew;
