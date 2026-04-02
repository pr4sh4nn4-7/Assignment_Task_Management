import { sql } from './../../config/db.js';

export const TaskTable = async () => {
  try {
    await sql`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`;

    await sql`
      DO $$ 
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'task_status') THEN
          CREATE TYPE task_status AS ENUM (
            'todo', 'in_progress', 'review', 'done', 'blocked'
          );
        END IF;
      END
      $$;
    `;

    await sql`
      DO $$ 
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'task_priority') THEN
          CREATE TYPE task_priority AS ENUM (
            'low', 'medium', 'high', 'critical'
          );
        END IF;
      END
      $$;
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS tasks (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(255) NOT NULL,
        description TEXT,
        status task_status DEFAULT 'todo',
        priority task_priority DEFAULT 'low',
        due_date TIMESTAMP,
        project_id UUID NOT NULL,
        created_by UUID NOT NULL,
        CONSTRAINT task_project_fk FOREIGN KEY (project_id)
          REFERENCES projects(id) ON DELETE CASCADE,
        CONSTRAINT task_user_fk FOREIGN KEY (created_by)
          REFERENCES users(id) ON DELETE CASCADE
      );
    `;

    console.log(' tasks table and enums are ready.');
  } catch (err) {
    console.error(' Error creating tasks table:', err);
    throw err;
  }
};
