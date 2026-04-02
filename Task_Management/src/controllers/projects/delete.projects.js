import { sql } from "../../config/db.js"
import { ErrorHandler } from "../../utils/Error.js"
import { TryCatchHandler } from "../../utils/TryCatch.js"

export const deleteProject = TryCatchHandler(async (req, res, next) => {
  const { id } = req.params
  if (!id) {
    throw new ErrorHandler(" project ID is required")
  }
  const user = req.user
  if (!user) {
    throw new ErrorHandler(404, "Only valid users are allowed")
  }
  const isProjectAvailable = await sql`
SELECT id,name,owner_id from projects where id=${id}
`

  if (isProjectAvailable.length <= 0) {
    throw new ErrorHandler(404, "Project not found")
  }
  if (user.id !== isProjectAvailable[0].owner_id) {
    throw new ErrorHandler(401, "Invalid user")
  }


  const data = await sql`
DELETE FROM projects WHERE id=${id}
RETURNING *
`


  res.json({
    message: "Project deleted successfully",
    success: true,
    data
  })


})
