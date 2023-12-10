// import { Express  } from "express";

import express from 'express'
import { deleteUser, getUser } from '../controller/user.controller.js';
import { verifyToken } from '../middlewares/jwt.js';

const router = express.Router();

router.delete("/:id", verifyToken, deleteUser)
router.get("/:id", getUser);


export default router