// import express from "express";
const express = require("express");
const  {
  getAllPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer,
} = require("../controller/index");

// const router = require("../routers/index");
const router = express.Router();

// Define all the routes
router.get("/", getAllPlayers);
router.get("/:id", getPlayerById);
router.post("/", createPlayer);
router.put("/:id", updatePlayer);
router.delete("/:id", deletePlayer);

module.exports = router;
