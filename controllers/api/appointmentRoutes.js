const router = require('express').Router();
const {
  User,
  Appointment,
  Service,
  Calendar
} = require('../../models');
const withAuth = require('../../utils/auth');

router.post("/create", withAuth, async (req, res) => {
  try {
    console.log(req.body.service, req.body.app_hour, req.body.app_date, req.session.user_id);

    const date = req.body.app_date;
    const dateArray = date.split("-");
    const dayOfWeek = parseInt(dateArray[1]);
    console.log(dayOfWeek);
    const appHour = parseInt(req.body.app_hour);
    console.log(appHour);

    const serviceData = await Service.findAll({where: {name: req.body.service}});

    const calendarData = await Calendar.findAll({where: {day: dayOfWeek, hour: appHour}});

    const service = serviceData.map(item => item.get({plain: true}));
    console.log(service);

    const calendar = calendarData.map(item => item.get({plain: true}));
    console.log(calendar);

    const newAppointment = await Appointment.create({
        user_id: req.session.user_id,
        app_date: date,
        app_day: dayOfWeek,
        app_hour: appHour,
        service_id: service[0].id,
        calendar_id: calendar[0].id
    });
    res.render("userAppointments", {logged_in: req.session.logged_in, user_id: req.session.user_id});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
