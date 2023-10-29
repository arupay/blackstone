const db = require("../db/dbConfig.js")


const getBookings = async () =>{
    try {
        const bookings = await db.any('SELECT * FROM booking');
        return bookings;
    } catch (error) {
        console.log(error.message || error);
        return error;
    }
}

const getBookingById = async (id) => {
    try {
        const booking = await db.oneOrNone('SELECT * FROM booking WHERE id = $1', [id]);
        return booking;
    } catch (error) {
        console.log(error.message || error);
        return error;
    }
};

const createBooking = async (bookingData) => {
    const { start_date, end_date, attendees, meeting_room_id } = bookingData;
    try {
        const conflictingBooking = await db.oneOrNone(
            'SELECT * FROM booking WHERE meeting_room_id = $1 AND ((start_date, end_date) OVERLAPS ($2, $3))',
            [meeting_room_id, start_date, end_date]
        );

        if (conflictingBooking) {
            return { error: true, message: 'The room is already booked for the desired time slot.' };
        }

        const newBooking = await db.one(
            'INSERT INTO booking (start_date, end_date, attendees, meeting_room_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [start_date, end_date, attendees, meeting_room_id]
        );
        return { success: true, payload: newBooking };
    } catch (error) {
        console.log(error.message || error);
        return { error: true, message: 'Database error.' }; 
    }
};


const deleteBooking = async (id) => {
    try {
        const deletedBooking = await db.result('DELETE FROM booking WHERE id = $1', [id]);
        return deletedBooking.rowCount;  // Returns the number of rows affected by the last executed statement!
    } catch (error) {
        console.log(error.message || error);
        return error;
    }
};


module.exports = {getBookings,getBookingById, createBooking, deleteBooking}