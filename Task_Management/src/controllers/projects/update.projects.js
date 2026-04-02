import { AllRequiredFields } from "../../utils/allfields";
import { ErrorHandler } from "../../utils/Error";
import { TryCatchHandler } from "../../utils/TryCatch";

export const updateProject = TryCatchHandler(async (req, res, next) => {
  const user = req.user
  const { id } = req.params
  const { name } = req.body || {}
  AllRequiredFields(req, 1)

  const valid = await sql`
SELECT * from projects WHERE id=${id} AND owner_id=${user.id}
`
  if (valid.length <= 0) {
    throw new ErrorHandler(404, "Project Not found")
  }

  const data = await sql`
UPDATE projects SET name =${name} WHERE 
id=${id} AND owner_id =${user.id}
RETURNING *
`
  res.json({
    message: "project updated Successfully",
    data
  })


})
