//Run server by node api/index.js or npm start

import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send(
    '<br> Hello, NodeJS people, check <a href="http://localhost:3000/api/data">GET API URL</a> <br> <br> For Other Open Postman or any other API testing tool you prefer!'
  );
});

//static data
const data = [
  {
    name: "abc",
    age: 30,
    email: "abc@example.com",
  },
  {
    name: "pqr",
    age: 28,
    email: "pqr@example.com",
  },
  {
    name: "xyz",
    age: 35,
    email: "xyz@example.com",
  },
];

app.get(`/api/data`, (req, res) => {
  res.json(data);
});

//Input data for post req
/* {
    "name": "pankaj",
    "age": 25,
    "email": "pankaj@example.com"
  }
*/
app.post("/api/data", (req, res) => {
  const newData = req.body;
  data.push(newData);
  res.status(201).json({
    message:
      "Data added successfully,Check GET api for updated data,do not refresh server",
    newData,
  });
});

//Input data for delete req
//http://localhost:3000/api/data/abc
http: app.delete("/api/data/:name", (req, res) => {
  const nameToDelete = req.params.name;
  const indexToDelete = data.findIndex((item) => item.name === nameToDelete);

  if (indexToDelete === -1) {
    return res
      .status(404)
      .json({ error: "Item not found with the specified name." });
  }
  const deletedItem = data.splice(indexToDelete, 1);
  res.json({
    message:
      "Data deleted successfully,Check GET api for updated data,do not refresh server",
    deletedItem: deletedItem[0],
  });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

/*Code to use data as dynamic JSON FILE*/
/*
import express from "express";
import fs from "fs";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//JSON File as static data source
const dataFilePath = "data.json";

app.get("/api/data", (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(dataFilePath));
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error reading data" });
  }
});

app.post("/api/data", (req, res) => {
  try {
    const newData = req.body;
    const data = JSON.parse(fs.readFileSync(dataFilePath));
    data.push(newData);
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    res.json({ message: "Data added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error adding data" });
  }
});

// Delete
app.delete("/api/data/:name", (req, res) => {
  try {
    const nameToDelete = req.params.name;
    const data = JSON.parse(fs.readFileSync(dataFilePath));
    const indexToDelete = data.findIndex((item) => item.name === nameToDelete);
    if (indexToDelete >= 0) {
      data.splice(indexToDelete, 1);
      fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
      res.json({ message: "Data deleted successfully" });
    } else {
      res.status(404).json({ error: "Item not found with the specified name" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting data" });
  }
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
*/
