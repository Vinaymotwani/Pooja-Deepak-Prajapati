const express = require("express");
const Hotel = require("../models/Hotel");

const router = express.Router();

// CREATE - Add a new hotel
router.post("/", async (req, res) => {
  try {
    const hotel = new Hotel(req.body);
    const savedHotel = await hotel.save();

    res.status(201).json(savedHotel);
  } catch (error) {
    res.status(400).json({
      message: "Error creating hotel",
      error: error.message
    });
  }
});

// READ - Get all hotels
router.get("/", async (req, res) => {
  try {
    const hotels = await Hotel.find();

    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching hotels",
      error: error.message
    });
  }
});

// READ - Get hotel by ID
router.get("/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
      return res.status(404).json({
        message: "Hotel not found"
      });
    }

    res.status(200).json(hotel);
  } catch (error) {
    res.status(400).json({
      message: "Invalid hotel ID",
      error: error.message
    });
  }
});

// UPDATE - Update hotel by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedHotel) {
      return res.status(404).json({
        message: "Hotel not found"
      });
    }

    res.status(200).json(updatedHotel);
  } catch (error) {
    res.status(400).json({
      message: "Error updating hotel",
      error: error.message
    });
  }
});

// DELETE - Delete hotel by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);

    if (!deletedHotel) {
      return res.status(404).json({
        message: "Hotel not found"
      });
    }

    res.status(200).json({
      message: "Hotel deleted successfully",
      hotel: deletedHotel
    });
  } catch (error) {
    res.status(400).json({
      message: "Error deleting hotel",
      error: error.message
    });
  }
});

module.exports = router;
