import Letter from "../models/letter.model.js";

export const createletter = async (req, res) => {
    try {
      const letter = await Letter.create(req.body);
      return res.status(201).json(letter);
    } catch (error) {
      console.error("Error handling inquiry:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  