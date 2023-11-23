const express = require("express");
const {
  getAllRooms,
  createRoom,
  bookingRoom,
  getBookedRooms,
  getBookedCustomers,
  getCustomer,
} = require("../Controllers/rooms.controllers");
const router = express.Router();

//getting all rooms
router.get("/", getAllRooms);

//create room
router.post("/rooms/create", createRoom);

//booking room
router.post("/rooms", bookingRoom);

//List all rooms with booked status

router.get("/bookedRooms", getBookedRooms);

//List all customer details with booking details
router.get("/customers", getBookedCustomers);

// list no of times customer booked a room
router.get("/customers/:customerID", getCustomer);

module.exports = router;
