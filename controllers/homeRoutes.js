const router = require('express').Router();
const {User, Appointment, Service, Calendar} = require('../models');
const withAuth = require('../utils/auth');

router.get("/", async (req, res) => {
  try {
    const servicesData = await Service.findAll({});
    if(!servicesData.length){
      if(!req.session.logged_in) {
        res.render("notFound");
      } else {
        res.render("notFound", {logged_in: req.session.logged_in, user_id: req.session.user_id});
      }
    } else {
      const services = servicesData.map(service => service.get({plain: true}));
      if(!req.session.logged_in) {
        res.render("homepage", {services: {services}});
      } else {
        res.render("homepage", {logged_in: req.session.logged_in, user_id: req.session.user_id, services: {services}});
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



module.exports = router;
