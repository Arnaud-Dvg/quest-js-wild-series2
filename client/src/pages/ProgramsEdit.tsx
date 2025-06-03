import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import CategoryForm from "../components/CategoryForm";

type Program = {
  id: number;
  name: string;
};

function ProgramEdit() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [program, setProgram] = useState(null as null | Program);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/programs/${id}`)
      .then((response) => response.json())
      .then((data: Program) => {
        setProgram(data);
      });
  }, [id]);

  return (
    program && (
      <CategoryForm
        defaultValue={program}
        onSubmit={(programData) => {
          fetch(
            `${import.meta.env.VITE_API_URL}/api/categories/${program.id}`,
            {
              method: "put",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(programData),
            },
          ).then((response) => {
            if (response.status === 204) {
              navigate(`/programs/${program.id}`);
            }
          });
        }}
      >
        Modifier
      </CategoryForm>
    )
  );
}

export default ProgramEdit;
