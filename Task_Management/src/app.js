
import 'dotenv/config'
import { sql } from './config/db.js'
import express from 'express'
import registerrouter from './routes/auth/register.js'
import loginrouter from './routes/auth/login.js'
import projectrouter from './routes/projects/projects.routes.js'
import { ProjectTable } from './controllers/projects/schema.js'
const app = express()


/// user table
const TableCreation = async () => {
  try {
    await sql`
CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; 

`
    await sql` CREATE TABLE IF NOT EXISTS users(
id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
name VARCHAR(25) NOT NULL,
email VARCHAR(66) UNIQUE Not NULL ,
password VARCHAR(222) NOT NULL

)

`
    console.log(`successfully created`)

  } catch (err) {
    console.log(err)

  }
}
TableCreation()
//project creation

ProjectTable()



app.use(express.json({
  limit: '5mb'
}))
app.use('/api/v1/auth', registerrouter)
app.use('/api/v1/auth', loginrouter)
app.use('/api/v1/project', projectrouter)

export default app
