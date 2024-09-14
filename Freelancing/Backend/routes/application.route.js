import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { applyJob, getApllicants, getAplliedJobs, updateStatus } from "../controllers/application.controller.js";

const router = express.Router();

router.route("/apply/:id").get(isAuthenticated, applyJob);
router.route("/get").get(isAuthenticated, getAplliedJobs);
router.route("/:id/applicants").get(isAuthenticated, getApllicants);
router.route("/status/:id/update").post(isAuthenticated, updateStatus);


export default router;
