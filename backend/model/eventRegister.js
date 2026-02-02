const mongoose = require("mongoose")

const eventRegisterSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "events",
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "register",
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model("eventRegister", eventRegisterSchema)
