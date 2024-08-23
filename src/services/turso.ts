import { createClient } from "@libsql/client/web";
import { Member } from "../types";

// Create the Turso client
export const turso = createClient({
  url: import.meta.env.VITE_TURSO_DATABASE_URL,
  authToken: import.meta.env.VITE_TURSO_AUTH_TOKEN,
});

// Function to get a member by their ID
export const getMemberById = async (id: string): Promise<Member | null> => {
  const result = await turso.execute(`SELECT * FROM members WHERE id = '${id}'`);

  if (result.rows.length === 0) {
    return null; // Handle case where no member is found
  }

  const member = result.rows[0] as unknown as Member;
  return member;
};

// Function to get all members
export const getMembers = async (): Promise<Member[]> => {
  const result = await turso.execute(`SELECT * FROM members`);

  return result.rows as unknown as Member[]; // Return the array of members
};
