import { sql } from "../../config/db";
import { AllRequiredFields } from "../../utils/allfields";
import { ErrorHandler } from "../../utils/Error";
import { TryCatchHandler } from "../../utils/TryCatch";

export const CreateTask = TryCatchHandler(async (req, res, next) => {

  const user = req.user
  const { id } = req.params
  if (!id) {
    throw new ErrorHandler(404, "project id is required")
  }
  let { title, description, due_date, priority } = req.body || {}
  if (!priority) {
    priority = 'low'
  }
  AllRequiredFields(req, 2)

  const valid = await sql`SELECT * FROM projects WHERE id =${id} AND owner_id=${user.id}`
  if (valid.length <= 0) {
    throw new ErrorHandler("Project Not found")
  }

  //  id (PK)     | UUID      |
  // | title       | String    |
  // | description | Text      |
  // | status      | Enum      |
  // | priority    | Enum      |
  // | due_date    | Timestamp |
  // | project_id  | UUID      |
  // | created_by  | UUID      |
  //

  const data = await sql`
INSERT INTO tasks (
title,
description,
priority,
due_date,
project_id,
created_by
) VALUES(
${title},
${description},
${priority},
${due_date},
${id},
${user.id}


)
RETURNING *
`

  res.json({
    message: "Task created successfully",
    success: true,
    data
  })
})
