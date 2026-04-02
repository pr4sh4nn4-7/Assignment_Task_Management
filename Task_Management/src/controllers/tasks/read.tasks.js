
import { sql } from "../../config/db.js";
import { ErrorHandler } from "../../utils/Error.js";
import { TryCatchHandler } from "../../utils/TryCatch.js";

export const ReadAllTasks = TryCatchHandler(async (req, res, next) => {
  const user = req.user
  const data = await sql`
SELECT * from tasks WHERE created_by=${user.id}

`


  res.json({
    message: "Task fetched successfully",
    success: true,
    data
  })
})

export const readSignleTask = TryCatchHandler(async (req, res, next) => {
  const user = req.user
  const { id } = req.params
  if (!id) {
    throw new ErrorHandler(400, "Task Id not found")
  }
  const data = await sql`
SELECT * from tasks WHERE id=${id} AND created_by=${user.id}
`
  if (data.length === 0) {
    throw new ErrorHandler("No tasks found")

  }

  res.json({
    message: `${data.title} fetched successfully`,
    success: true,
    data
  })

})



export const ReadAllProjectTasks = TryCatchHandler(async (req, res, next) => {
  const { id } = req.params

  if (!id) {
    throw new ErrorHandler(400, "Task Id not found")
  }
  const user = req.user
  const data = await sql`
SELECT * from tasks WHERE created_by=${user.id} and project_id=${id}

`

  if (data.length === 0) {
    throw new ErrorHandler("No tasks found")

  }

  res.json({
    message: "Task fetched successfully",
    success: true,
    data
  })
})
