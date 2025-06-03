import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import ProgramsDeleteForm from "../components/ProgramDeleteForm";

type Program = {
  id: number;
  title: string;
};

function ProgramsDetails() {
  const { id } = useParams();
  const [program, setProgram] = useState<Program | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/programs/${id}`)
      .then((response) => response.json())
      .then((data: Program) => setProgram(data));
  }, [id]);

  return (
    program && (
      <hgroup className="details-hgroup">
        <h1>{program.title}</h1>
        <Link to={`/programs/${program.id}/edit`}>Modifier</Link>
        <ProgramsDeleteForm id={program.id}>Supprimer</ProgramsDeleteForm>
      </hgroup>
    )
  );
}

export default ProgramsDetails;
