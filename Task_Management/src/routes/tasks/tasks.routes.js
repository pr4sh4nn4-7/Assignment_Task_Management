import express from 'express'
import { isValidUser } from '../../middlewares/verify.js'
import { CreateTask } from '../../controllers/tasks/create.task.js'
import { ReadAllProjectTasks, ReadAllTasks, readSignleTask } from '../../controllers/tasks/read.tasks.js'

const router = express()
router.post('/create', isValidUser, CreateTask)
router.get('/readall', isValidUser, ReadAllTasks)
router.get('project/readall/:id', isValidUser, ReadAllProjectTasks)

router.get('/read/:id', isValidUser, readSignleTask)

export default router
