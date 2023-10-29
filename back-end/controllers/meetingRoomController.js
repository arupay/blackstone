const express = require("express")
const meetingRooms = express.Router();

const {getRooms, createRoom, getRoomById, getFutureBookingsForRoom} = require("../queries/meetingRoomQueries")

meetingRooms.get("/", async (req, res) => {
    try {
        const allRooms = await getRooms();
        res.status(200).json({ success: true, payload: allRooms });
    } catch (error) {
        console.error(error.message || error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});


meetingRooms.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const room = await getRoomById(id);
        if (room && room.length > 0) {  
            res.status(200).json({ success: true, payload: room[0] });  
        } else {
            res.status(404).json({ success: false, error: "Meeting room not found" });  
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: "Internal server error" }); 
    }
});

meetingRooms.get("/:id/bookings", async (req, res) => {
    const { id } = req.params;
    try {
        const bookings = await getFutureBookingsForRoom(id);
        if (bookings && bookings.length > 0) {  
            res.status(200).json({ success: true, payload: bookings });  
        } else {
            res.status(404).json({ success: false, error: "No future bookings found for this meeting room." });  
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: "Internal server error" }); 
    }
});


meetingRooms.post("/", async (req,res)=>{
    const {name, capacity, floor } = req.body;
    try {
        const newRoom = await createRoom(name, capacity, floor);
        res.status(200).json({success: true, payload : newRoom});
    } catch (error){
        console.log(error.message || error)
        res.status(500).json({success : false, message: "Could not make room"})
    }
})

module.exports = meetingRooms;