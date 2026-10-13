const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.static("public"));

const recordSchema = new mongoose.Schema({
    name: { type: String, required: true },
    department: { type: String, required: true },
    year: { type: String, required: true }
});

const Record = mongoose.model("Record", recordSchema);

// Add record
app.post("/records", async (req, res) => {
    try {
        const record = await Record.create(req.body);
        res.status(201).json(record);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// View records
app.get("/records", async (req, res) => {
    try {
        const records = await Record.find();
        res.json(records);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update record
app.put("/records/:id", async (req, res) => {
    try {
        const record = await Record.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!record) {
            return res.status(404).json({ message: "Record not found" });
        }

        res.json(record);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete record
app.delete("/records/:id", async (req, res) => {
    try {
        const record = await Record.findByIdAndDelete(req.params.id);

        if (!record) {
            return res.status(404).json({ message: "Record not found" });
        }

        res.json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");

        app.listen(process.env.PORT || 3000, () => {
            console.log("Server running at http://localhost:3000");
        });
    })
    .catch(error => console.error("MongoDB connection failed:", error));
