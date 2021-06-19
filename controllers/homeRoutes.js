const router = require('express').Router();
const {
  User,
  Appointment,
  Service,
  Calendar
} = require('../models');
const withAuth = require('../utils/auth');

router.get("/", async (req, res) => {
  try {
    const servicesData = await Service.findAll({});
    if (!servicesData.length) {
      if (!req.session.logged_in) {
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
      const services = servicesData.map(service => service.get({
        plain: true
      }));
      if (!req.session.logged_in) {
        const response = {
          services: {
            services
          },
          about_us: true,
          business_hours: true
        }
        res.render("homepage", response);
      } else {
        const response = {
          services: {
            services
          },
          about_us: true,
          business_hours: true,
          logged_in: req.session.logged_in,
          user_id: req.session.user_id,
        }
        res.render("homepage", response);
      }
    }
  } catch (err) {
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

router.get("/lady-lash-admin-homepage", withAuth, async (req, res) => {
  try {
    const date = "2021-06-21";
    const appointmentsData = await Appointment.findAll({});

    if (!appointmentsData.length) {
      const availability = {
        h08: false,
        h10: false,
        h12: false,
        h14: false,
        h16: false,
        h18: false,
        h20: false
      };
      res.render("adminHomepage", {availability: availability, logged_in: req.session.logged_in, user_id: req.session.user_id});
    } else {
      const appointments = appointmentsData.map(appointment => appointment.get({
        plain: true
      }));
      res.send({appointments});
    }
  } catch (err) {
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
      res.redirect("/create-appointment");
    }
  } catch (err) {
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

//Route to get the available hours given the selected date
router.get('/appointment/date', withAuth, async (req, res) => {
  try {
    const appointmentsData = await Appointment.findAll({
      where: {
        app_date: req.body.app_date,
        [app_hour.not]: null,
      } 
    });
    const appointments = appointmentsData.map(appointment => appointment.get({plain: true}));
    if (!appointments.length) {
      res.status(200).json({message: "We don't have any available appointments for the selected date"});
      return;
    }
    else {
     const notAvailable=[];
     const availableHours=[];
     appointments.forEach(({app_hour}) => {
      if (app_hour === 8) {
        notAvailable.push(app_hour);
      }
      else {
        availableHours.push(8);
      }
      //
      if (app_hour === 10) {
        notAvailable.push(app_hour);
      }
      else {
        availableHours.push(10);
      }
      //
      if (app_hour === 12) {
        notAvailable.push(app_hour);
      }
      else {
        availableHours.push(12);
      }
      //
      if (app_hour === 2) {
        notAvailable.push(app_hour);
      }
      else {
        availableHours.push(2);
      }
      //
      if (app_hour === 4) {
        notAvailable.push(app_hour);
      }
      else {
        availableHours.push(4);
      }
      //
      if (app_hour === 6) {
        notAvailable.push(app_hour);
      }
      else {
        availableHours.push(6);
      }
      })
      res.status(200).json({notAvailable}, {availableHours});
    }  
  } catch(err) {
    res.status(500).json(err);
  }})

module.exports = router;
