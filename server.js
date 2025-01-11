const { PrismaClient } = require("@prisma/client");
const express = require("express");
const app = express();
const prisma = new PrismaClient();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Prismatic Employees Api.");
});

app.get("/employees", async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();
    res.json(employees);
  } catch (error) {
    console.error(error);
  }
});

app.post("/employees", async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
  try {
    const newEmployee = await prisma.employee.create({ data: { name } });
    res.status(201).json(newEmployee);
  } catch (error) {
    console.error(error);
  }
});

app.get("/employee/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await prisma.employee.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json(employee);
  } catch (error) {
    console.error(error);
  }
});

app.put("/employee/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Name is required girl" });
  }
  try {
    const updatedEmployee = await prisma.employee.update({
      where: { id: Number(id) },
      data: { name },
    });
    res.status(200).json(updatedEmployee);
  } catch (error) {
    return res.status(404).json({ error: "Employee not found" });
  }
});

app.delete("/employee/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.employee.delete({ where: { id: Number(id) } });
    res.sendStatus(204);
  } catch (error) {
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    console.error(error);
    res.status(500).json({ error: "Failed to delete employee..." });
  }
});
const PORT = 3034;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
