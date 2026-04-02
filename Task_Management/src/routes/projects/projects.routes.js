import express from 'express'
import { createProjects } from '../../controllers/projects/create.projects.js'
import { isValidUser } from '../../middlewares/verify.js'
import { deleteProject } from '../../controllers/projects/delete.projects.js'
import { getAllProjects } from '../../controllers/projects/read.projects.js'

const router = express.Router()

router.post('/create', isValidUser, createProjects)
router.post('/delete/:id', isValidUser, deleteProject)
router.get('/readall', isValidUser, getAllProjects)
export default router
