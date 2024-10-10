const { check, validationResult } = require("express-validator");
const client = require("../database");
let sampleJson = [
  {
    id: "55e5ed51-0213-49e8-bc77-1056a972ef27",
    name: "Di-maria",
    team: "Argentina",
  },
  {
    id: "043f1d0e-5bcc-474b-adad-42e918525ce0",
    name: "Ousmane Dembele",
    team: "France",
  },
  {
    id: "cb7d409d-9bdc-49f7-bd01-fafc10126cdc",
    name: "Toni Kroos",
    team: "Germany",
  },
];


// Get all players
exports.getAllPlayers = async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM players");
    res.send({
      success: true,
      message: "Players Fetched Successfully!",
      data: result.rows,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error fetching players",
      error: err.message,
    });
  }
};

// Get a player by ID
exports.getPlayerById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.query("SELECT * FROM players WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).send({
        success: false,
        message: "Player Not Found",
      });
    }
    res.send({
      success: true,
      message: "Player Fetched Successfully!",
      data: result.rows[0],
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error fetching player",
      error: err.message,
    });
  }
};


// Create a new player
exports.createPlayer = [
  check("name").notEmpty().withMessage("Name is required"),
  check("team").notEmpty().withMessage("Team is required"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({
        success: false,
        errors: errors.array().map((err) => ({
          field: err.param,
          message: err.msg,
        })),
      });
    }

    const { name, team } = req.body;
    try {
      const result = await client.query(
        "INSERT INTO players (name, team) VALUES ($1, $2) RETURNING *",
        [name, team]
      );

      res.status(201).send({
        success: true,
        message: "Player added successfully!",
        data: result.rows[0],
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: "Error adding player",
        error: err.message,
      });
    }
  },
];



// Update a player
exports.updatePlayer = [
  check("name").notEmpty().withMessage("Name is required"),
  check("team").notEmpty().withMessage("Team is required"),
  async (req, res) => {
    const { id } = req.params;
    const { name, team } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({
        success: false,
        errors: errors.array().map((err) => ({
          field: err.param,
          message: err.msg,
        })),
      });
    }

    try {
      const result = await client.query(
        "UPDATE players SET name = $1, team = $2 WHERE id = $3 RETURNING *",
        [name, team, id]
      );

      if (result.rows.length === 0) {
        return res.status(404).send({
          success: false,
          message: "Player Not Found",
        });
      }

      res.send({
        success: true,
        message: "Player updated successfully!",
        data: result.rows[0],
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: "Error updating player",
        error: err.message,
      });
    }
  },
];


// Delete a player
exports.deletePlayer = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.query("DELETE FROM players WHERE id = $1 RETURNING *", [id]);

    if (result.rows.length === 0) {
      return res.status(404).send({
        success: false,
        message: "Player Not Found",
      });
    }

    res.send({
      success: true,
      message: "Player deleted successfully!",
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error deleting player",
      error: err.message,
    });
  }
};



