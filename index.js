// import express, { json } from "express";
// const app = express();
// const port = 3000;

// app.use(json());

// // Data store in memory
// let sampleJson = [
//   {
//     id: "55e5ed51-0213-49e8-bc77-1056a972ef27",
//     name: "Di-maria",
//     team: "Argentina",
//   },
//   {
//     id: "043f1d0e-5bcc-474b-adad-42e918525ce0",
//     name: "Ousmane Dembele",
//     team: "France",
//   },
//   {
//     id: "cb7d409d-9bdc-49f7-bd01-fafc10126cdc",
//     name: "Toni Kroos",
//     team: "Germany",
//   },
// ];

// // GET API
// app.get("/items", (req, res) => {
//   res?.send({
//     success: true,
//     message: "Players Fetched Successfully!",
//     data: sampleJson,
//   });
// });

// // GET by ID
// app.get("/items/:id", (req, res) => {
//   const { id } = req?.params;
//   const data = sampleJson?.find((i) => i?.id === id);
//   if (!data) {
//     res?.status(402).send({
//       success: false,
//       message: "Player Not Found",
//     });
//   } else {
//     res?.status(200).send({
//       success: true,
//       message: "Player Fetched Successfully!",
//       data: data,
//     });
//   }
// });

// // POST API
// app.post("/items", (req, res) => {
//   const { name, team } = req.body;

//   // Collect all errors
//   const errors = [];

//   // Validate that the name field is present
//   if (!name) {
//     errors.push({
//       field: "name",
//       message: "Name field is required",
//     });
//   }

//   // Validate that the team field is present
//   if (!team) {
//     errors.push({
//       field: "team",
//       message: "Team field is required",
//     });
//   }

//   // If there are errors, return a 400 status with the errors
//   if (errors.length > 0) {
//     return res.status(400).send({
//       success: false,
//       errors: errors,
//     });
//   }

//   // If no errors, proceed to add the new item
//   const newItem = {
//     id: new Date().getTime().toString(), // Create a unique ID (for example purposes)
//     name,
//     team,
//   };

//   sampleJson.push(newItem);

//   res.status(201).send({
//     success: true,
//     message: "Player added successfully!",
//     data: newItem,
//   });
// });

// // PUT API
// app.put("/items/:id", (req, res) => {
//   const { id } = req.params;
//   const { name, team } = req.body;

//   // Find the item by id
//   const data = sampleJson.find((i) => i.id === id);

//   // If item is not found, return 404
//   if (!data) {
//     return res.status(404).send({
//       success: false,
//       message: "Player Not Found",
//     });
//   }

//   // Collect validation errors
//   const errors = [];

//   // Validate that the name field is present
//   if (!name) {
//     errors.push({
//       field: "name",
//       message: "Name field is required",
//     });
//   }

//   // Validate that the team field is present
//   if (!team) {
//     errors.push({
//       field: "team",
//       message: "Team field is required",
//     });
//   }

//   // If there are validation errors, return 400 with the errors
//   if (errors.length > 0) {
//     return res.status(400).send({
//       success: false,
//       errors: errors,
//     });
//   }

//   // Update the item
//   data.name = name;
//   data.team = team;

//   // Return success response
//   res.status(200).send({
//     success: true,
//     message: "Player Updated Successfully!",
//     data: data,
//   });
// });

// // DELETE API
// app.delete("/items/:id", (req, res) => {
//   const { id } = req?.params;
//   const deleteItem = sampleJson?.findIndex((i) => i?.id === id);

//   if (deleteItem === -1) {
//     res?.status(404)?.send({
//       success: false,
//       message: "Player Not Found",
//     });
//   }

//   sampleJson?.splice(deleteItem, 1);

//   res?.status(200)?.send({
//     success: true,
//     message: "Player Deleted Successfully!",
//     data: deleteItem,
//   });
// });

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });
// import express, { json } from "express";

// import router from "./routers/index.js";

const express = require("express");
const router = require("./routers/index");
const app = express();
const port = 3000;

app.use(express.json());

// Use the players router
app.use("/items", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
