const router = require('express').Router();
const {
  User,
  Appointment,
  Service,
  Calendar
} = require('../../models');
const withAuth = require('../../utils/auth');

router.post("/create", async (req, res) => {
  try {
    const newAppointment = await Appointment.create({
        user_id: req.body.user_id,
        app_date: req.body.app_date,
        app_day: req.body.app_day,
        app_hour: req.body.app_hour,
        service_id: req.body.service_id,
        calendar_id: req.body.calendar_id
    });
    res.status(200).json(newAppointment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
