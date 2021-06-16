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
    res.redirect('/service');
    return;
  }
  res.render('login');
});

router.get("/lady-lash-admin-page", async (req, res) => {
  try {
    const appointmentData = await Appointment.findAll({
      include: [{
        model: "user",
        attributes: ["id","first_name","last_name","appoiments_counter"]
      },
    {
      model: "service",
      attributes: ["id","name"]
    }],
      where: {date: req.body.date}
    });
  } catch(err) {
    res.status(500).json(err);
  }
});


module.exports = router;
