import express from "express";

const app = express();
const mockUsers = [
  {
    id: 1,
    username: "John Doe",
    email: "john@example.com",
  },
  { id: 2, username: "Maira", email: "maria@example.com" },
  { id: 3, username: "Laiba", email: "laiba@example.com" },
];
// creating the routes
app.get("/", (req, res) => {
  res.json("Hello World");
});

app.get("/api/users", (req, res) => {
  res.send(mockUsers);
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

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
