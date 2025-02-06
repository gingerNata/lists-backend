import Router  from "express";

import ToDo from "../models/ToDo.js";

const router = Router();
router.get('/', async (req, res) => {
    try {
        const todos = await ToDo.find().sort({ createdAt: -1 });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    const todo = new ToDo({
        text: req.body.text
    });

    try {
        const newToDo = await todo.save();
        res.status(201).json(newToDo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const todo = await ToDo.findById(req.params.id);
        if (req.body.completed !== undefined) {
            todo.completed = req.body.completed;
        }
        const updatedToDo = await todo.save();
        res.json(updatedToDo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await ToDo.findByIdAndDelete(req.params.id);
        res.json({ message: 'ToDo deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;