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

//avaliabiliy  -GET
router.get("/avaliability", async (req, res) => {
  try {
    const calenderData = await Calender.findAll({});
      if(!req.session.logged_in) {
        const response = {
          avaliability: true,
        }
        res.render("notFound", response);
    } else {
      const response = {
        make_appointment: true,
      }
        res.render("homepage", response);
      }
  } catch(err) {
    res.status(500).json(err);
  }
});


router.get('/lady-lash-admin-homepage/service', (req, res) => {
  res.render('createService.handlebars');
});


//Route to the new appoiment page
router.get('/appointment', withAuth,  async (req, res) => {
  res.render('newAppointment.handlebars');  
});

//Route to get the appointment data
router.get('/appointment/date', withAuth, async (req, res) => {
  try {
    const appointmentsData = await Appointment.findAll({
      where: {app_date: req.body.app_date}
    });
    const appointments = appointmentsData.map(appointment => appointment.get({plain: true}));
    res.status(200).json({appointments});
  } catch(err) {
    res.status(500).json(err);
  }

} )

module.exports = router;
