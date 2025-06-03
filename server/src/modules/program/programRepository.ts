import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Program = {
  id: number;
  title: string;
};

class ProgramRepository {
  async readAll() {
    // Execute the SQL SELECT query to retrieve all programs from the "program" table
    const [rows] = await databaseClient.query<Rows>("select * from program");

    // Return the array of programs
    return rows as Program[];
  }

  async update(program: Partial<Program> & { id: number }) {
    const [result] = await databaseClient.query<Result>(
      "update program set title = ? where id = ?",
      [program.title, program.id],
    );
    return result.affectedRows;
  }

  async create(program: Omit<Program, "id">) {
    // Execute the SQL INSERT query to add a new category to the "category" table
    const [result] = await databaseClient.query<Result>(
      "insert into category (name) values (?)",
      [program.title],
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }

  async delete(id: number) {
    // Execute the SQL DELETE query to delete an existing category from the "category" table
    const [result] = await databaseClient.query<Result>(
      "delete from category where id = ?",
      [id],
    );

    // Return how many rows were affected
    return result.affectedRows;
  }

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific category by its ID
    const [rows] = await databaseClient.query<Rows>(
      `
        select 
          programs.*, 
          JSON_ARRAYAGG(
            JSON_OBJECT(
              "id", program.id, "title", program.title
            )
          ) as programs 
        from 
          program
          left join program on program_id = program.id 
        where 
          program.id = ? 
        group by 
          program.id
        `,
      [id],
    );

    // Return the first row of the result, which represents the category
    return rows[0] as Program;
  }
}

export default new ProgramRepository();
