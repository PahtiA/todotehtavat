import { Router } from "express";
import { pool } from "../helper/db.js";
import { auth } from "../helper/auth.js";

const router = Router();

router.get("/", (req, res, next) => {
  pool.query("SELECT * FROM task", (err, result) => {
    if (err) return next(err);
    res.status(200).json(result.rows || []);
  });
});

router.post("/create", auth, (req, res, next) => {
  const { task } = req.body;
  if (!task || !task.description) return res.status(400).json({ error: "Task is required" });

  pool.query(
    "INSERT INTO task (description) VALUES ($1) RETURNING *",
    [task.description],
    (err, result) => {
      if (err) return next(err);
      res.status(201).json({ id: result.rows[0].id, description: task.description });
    }
  );
});

router.delete("/delete/:id", auth, (req, res, next) => {
  const { id } = req.params;

  pool.query("DELETE FROM task WHERE id=$1 RETURNING *", [id], (err, result) => {
    if (err) return next(err);
    if (result.rows.length === 0) return res.status(404).json({ error: "Task not found" });
    // palautetaan id (testisi odottaa id kenttää)
    res.status(200).json({ id: result.rows[0].id });
  });
});

export default router;
