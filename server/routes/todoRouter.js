import { pool } from "../helper/db.js"
import { Router } from "express"

const router = Router()

// GET
router.get("/", (req, res, next) => {
  pool.query("SELECT * FROM task", (err, result) => {
    if (err) return next(err)
    res.status(200).json(result.rows || [])
  })
})

// POST
router.post("/create", (req, res, next) => {
  const { task } = req.body
  if (!task) {
    const error = new Error("Task is required")
    error.status = 400
    return next(error)
  }

  pool.query(
    "INSERT INTO task (description) VALUES ($1) RETURNING *",
    [task.description],
    (err, result) => {
      if (err) return next(err)
      res.status(201).json(result.rows[0])
    }
  )
})

// DELETE
router.delete("/delete/:id", (req, res, next) => {
  const { id } = req.params
  pool.query("DELETE FROM task WHERE id = $1", [id], (err, result) => {
    if (err) return next(err)
    if (result.rowCount === 0) {
      const error = new Error("Task not found")
      error.status = 404
      return next(error)
    }
    res.status(200).json({ id })
  })
})

export default router
