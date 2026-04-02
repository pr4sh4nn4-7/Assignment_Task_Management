import { sql } from "../../config/db.js";
import { AllRequiredFields } from "../../utils/allfields.js";
import { ErrorHandler } from "../../utils/Error.js";
import { TryCatchHandler } from "../../utils/TryCatch.js";

export const createProjects = TryCatchHandler(async (req, res, next) => {
  const user = req.user
  if (!user) {
    throw new ErrorHandler(404, "Only valid users are allowed")
  }
  const { pName } = req.body || {}
  AllRequiredFields(req, 1)

  const data = await sql`
INSERT INTO projects(name,owner_id) VALUES (${pName},${user.id}) RETURNING *
`
  res.json({
    message: "Project created successfully",
    success: true,
    data
  })


})
