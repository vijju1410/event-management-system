const express = require("express")
const router = express.Router()
const events = require("../model/events")
const EventRegister = require("../model/eventRegister")
const Verifytoken = require("../middleware/verifytoken")

router.post("/addevent",async(req,res)=>{
    const {title,description,date,time,location} = req.body
    try {
        const eventt  = new events({
            title,description,date,time,location
        })
        const data = await eventt.save()
        res.status(201).json({message:"event added successfully..",data})
    } catch (error) {
        console.log(error)
    }
})

router.get("/allevents", async (req, res) => {
  try {
    const data = await events.find().sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events" });
  }
});

router.get("/registrations/:eventId", async (req, res) => {
  try {
    const data = await EventRegister.find({ eventId: req.params.eventId })
      .populate("userId", "name email");

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching registrations" });
  }
});


router.put("/editevent/:id", async (req, res) => {
  try {
    const data = await events.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({ message: "Event updated", data });
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
});


router.delete("/deleteevent/:id", async (req, res) => {
  try {
    await events.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete event" });
  }
});



router.post("/registerevent", Verifytoken, async (req, res) => {
  const { eventId } = req.body
  const userId = req.user.userid

  try {
    const already = await EventRegister.findOne({ eventId, userId })

    if (already) {
      return res.status(201).json({ message: "Already registered" })
    }

    const registerEvent = new EventRegister({
      eventId,
      userId
    })

    await registerEvent.save()
    res.status(201).json({ message: "Event registered successfully" })

  } catch (error) {
    res.status(500).json({ message: "Something went wrong" })
  }
})


module.exports=router