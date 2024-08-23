import { createClient } from "@libsql/client/web";
import { Member } from "../types";

const turso = createClient({
  url: import.meta.env.VITE_TURSO_DATABASE_URL,
  authToken: import.meta.env.VITE_TURSO_AUTH_TOKEN,
});

export const getMemberById = async (id: string): Promise<Member> => {
  const result = await turso.execute({
    sql: `SELECT * FROM members WHERE id = ?`, // Usa 'sql' en lugar de 'query'
    args: [id] // Usa 'args' en lugar de 'params'
  });

  // Asegúrate de que el resultado tenga la estructura esperada
  const member = result.rows[0] as unknown as Member;
  return member;
};
