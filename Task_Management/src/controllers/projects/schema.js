import { sql } from "../../config/db.js";

export const ProjectTable = async () => {
  await sql`
    CREATE TABLE IF NOT EXISTS projects(
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR(244) NOT NULL,
      owner_id UUID,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_owner
        FOREIGN KEY(owner_id)
        REFERENCES users(id) ON DELETE CASCADE
    )
  `;
  console.log('project table created');
};
