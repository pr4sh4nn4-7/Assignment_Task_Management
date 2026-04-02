import { ErrorHandler } from "../../utils/Error.js"
import { TryCatchHandler } from "../../utils/TryCatch.js"

export const getAllProjects = TryCatchHandler(async (req, res, next) => {
  const user = req.user
  if (!user) {
    throw new ErrorHandler(404, "Only valid users are allowed")
  }
  const data = await sql`
SELECT * from projects where owner_id=${user.id}
`

  res.json({
    message: "Project deleted successfully",
    success: true,
    data
  })


})
