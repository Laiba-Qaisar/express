import express from "express";

const app = express();
app.use(express.json()); //in order to parse the data from the requestbody based on content type

const mockUsers = [
  {
    id: 1,
    username: "John Doe",
    email: "john@example.com",
  },
  { id: 2, username: "Maira", email: "maria@example.com" },
  { id: 3, username: "Laiba", email: "laiba@example.com" },
  { id: 4, username: "Aqsa", email: "aqsa@example.com" },
  { id: 5, username: "Ashir", email: "ashir@example.com" },
  { id: 6, username: "Zaid", email: "zaid@example.com" },
];
// creating the routes

app.get("/api/users", (req, res) => {
  console.log(req.query);
  const {
    query: { filter, value },
  } = req;
  if (!filter || !value) return res.send(mockUsers);
  if (filter && value)
    return res.send(
      mockUsers.filter((users) => {
        return users[filter].toLowerCase().includes(value.toLowerCase());
      })
    );
});

//get users based on the id
app.get("/api/users/:id", (req, res) => {
  const parsedId = parseInt(req.params.id);
  console.log(parsedId);
  if (isNaN(parsedId)) return res.status(404).send("Invalid Id-");
  const finduser = mockUsers.find((user) => user.id === parsedId);
  if (!finduser) return res.status(404).send("User not found");
  res.send(finduser);
});

// post requests
app.post("/api/users", (req, res) => {
  console.log(req.body);
  const newUser = { ...req.body };
  mockUsers.push(newUser);
  return res.sendStatus(201).send(newUser); //status 201 for post requests
});

//put request

app.put("/api/users/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req.body;
  const parsedId = parseInt(req.params.id);
  if (isNaN(parsedId)) return res.status(404).send("Invalid Id-");
  const finduserID = mockUsers.find((user) => user.id === parsedId);
  if (finduserID === -1) return res.status(404);
  mockUsers[finduserID] = { ...body, id: parsedId };
  return res.status(200).send("user updated");
});

//patch request
app.patch("/api/users/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  const parsedId = parseInt(req.params.id);
  if (isNaN(parsedId)) return res.status(404).send("Invalid Id-");
  const finduserID = mockUsers.find((user) => user.id === parsedId);
  // if (finduserID === -1) return res.status(404);
  mockUsers[finduserID] = { ...mockUsers[finduserID], ...body };
  return res.status(200).send(mockUsers);
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
