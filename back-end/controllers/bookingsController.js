const express = require("express")
const bookings = express.Router();

const {getBookings,getBookingById, createBooking, deleteBooking} = require("../queries/bookingsQueries")

bookings.get("/", async (req,res)=>{
    try {
        const allBookings = await getBookings();
        res.status(200).json({success: true, payload: allBookings})
    } catch (error) {
        console.error(error.message || error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
})

bookings.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const booking = await getBookingById(id);
        if (booking) {
            res.status(200).json({ success: true, payload: booking });
        } else {
            res.status(404).json({ success: false, message: "Booking not found" });
        }
    } catch (error) {
        console.error(error.message || error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

bookings.post("/", async (req, res) => {
    try {
        const result = await createBooking(req.body);
        if (result.success) {
            res.status(201).json(result);
        } else if (result.error && result.message === 'The room is already booked for the desired time slot.') {
            res.status(409).json({ success: false, message: result.message }); // 409 stands for Conflict
        } else {
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    } catch (error) {
        console.error(error.message || error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});


bookings.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const rowCount = await deleteBooking(id);
        if (rowCount === 1) {
            res.status(200).json({ success: true, message: "Booking deleted successfully" });
        } else {
            res.status(404).json({ success: false, message: "Booking not found" });
        }
    } catch (error) {
        console.error(error.message || error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});


module.exports = bookings;