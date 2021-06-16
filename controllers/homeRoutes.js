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
        res.render("service", response);
      } else {
        const response = {
          services: {services},
          about_us: true,
          business_hours: true,
          logged_in: req.session.logged_in,
          user_id: req.session.user_id,
        }
        res.render("service", response);
      }
    }
  } catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
