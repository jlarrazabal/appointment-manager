const router = require('express').Router();
const {User, Appointment, Service, Calendar} = require('../models');
const withAuth = require('../utils/auth');

router.get("/", async (req, res) => {
  try {
    const servicesData = await Service.findAll({});
    if(!servicesData.length){
      if(!req.session.logged_in) {
        const response = {
          about_us: true,
          business_hours: true
        }
        res.render("notFound", response);
      } else {
        const response = {
          about_us: true,
          business_hours: true,
          logged_in: req.session.logged_in,
          user_id: req.session.user_id,
        }
        res.render("notFound", response);
      }
    } else {
      const services = servicesData.map(service => service.get({plain: true}));
      if(!req.session.logged_in) {
        const response = {
          services: {services},
          about_us: true,
          business_hours: true
        }
        res.render("homepage", response);
      } else {
        const response = {
          services: {services},
          about_us: true,
          business_hours: true,
          logged_in: req.session.logged_in,
          user_id: req.session.user_id,
        }
        res.render("homepage", response);
      }
    }
  } catch(err) {
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get("/lady-lash-admin-homepage", async (req, res) => {
  try {
    const appointmentsData = await Appointment.findAll({
      include: [{
        model: "user",
        attributes: ["id","first_name","last_name","appoiments_counter"]
      },
    {
      model: "service",
      attributes: ["id","name"]
    },
    {
      model: "calendar",
      attributes: ["id","day","hour","start_date","end_date"]
    }],
      where: {date: req.body.date}
    });
    const appointments = appointmentsData.map(appointment => appointment.get({plain: true}));
    res.status(200).json({appointments});
  } catch(err) {
    res.status(500).json(err);
  }
});

//Avaliability GET
router.get("/avaliability", async (req, res) => {
  try {
    const appointmentData = await Appointment.findAll({
    include: [
    {
      model: Calendar,
      attributes: ["id", "day", "hour", "start_date", "end_date"]
    }]
   });
    if(!req.session.logged_in){
    if (!appointmentData.length) {
      const availability = {
        h08: false,
        h10: false,
        h12: false,
        h14: false,
        h16: false,
        h18: false,
        h20: false,
        h22: false,
      };
      res.render("avaliability", availability);
    }} else {
      res.redirect("/appointment");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/lady-lash-admin-homepage/service', (req, res) => {
  res.render('createService.handlebars');
});

module.exports = router;
