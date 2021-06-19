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
    let date = "";
    if (!req.body.app_date) {
      let fullDate = new Date();
      console.log(fullDate);
      let day = fullDate.getDate();
      let month = fullDate.getMonth() + 1;
      let year = fullDate.getFullYear();
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      console.log(day, month, year);
      date = `${year}-${month}-${day}`;
      console.log(date);
    } else {
      console.log("Did not work");
    }

    const appointmentsData = await Appointment.findAll({
      include: [{
          model: User,
          attributes: ["id", "first_name", "last_name", "email"]
        },
        {
          model: Service,
          attributes: ["id", "name"]
        },
        {
          model: Calendar,
          attributes: ["id", "day", "hour", "start_date", "end_date"]
        },
      ]
    });

    const appointmentsPlain = appointmentsData.map(appointment => appointment.get({
      plain: true
    }));

    const dayAppointments = appointmentsPlain.filter(appointment => appointment.app_date === date);

    if (!dayAppointments.length) {
      const availability = {
        h08: false,
        h10: false,
        h12: false,
        h14: false,
        h16: false,
        h18: false,
        h20: false
      };
      res.render("adminHomepage", {
        availability: availability,
        logged_in: req.session.logged_in,
        user_id: req.session.user_id
      });
    } else {
      let h08 = false;
      let h10 = false;
      let h12 = false;
      let h14 = false;
      let h16 = false;
      let h18 = false;
      let h20 = false;

      dayAppointments.forEach((appointment, i) => {
        switch (appointment.app_hour) {
          case 8:
            h08 = true;
            break;
          case 10:
            h10 = true;
            break;
          case 12:
            h12 = true;
            break;
          case 14:
            h14 = true;
            break;
          case 16:
            h16 = true;
            break;
          case 18:
            h18 = true;
            break;
          case 20:
            h20 = true;
            break;
        }
      });

      const avaliability = {
        h08: h08,
        h10: h10,
        h12: h12,
        h14: h14,
        h16: h16,
        h18: h18,
        h20: h20,
      }
      res.render("adminHomepage", {availability: avaliability, appointments: {dayAppointments}, logged_in: req.session.logged_in, user_id: req.session.user_id});
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//Avaliability GET
router.get("/avaliability", async (req, res) => {
  try {
    const appointmentData = await Appointment.findAll({
      include: [{
        model: Calendar,
        attributes: ["id", "day", "hour", "start_date", "end_date"]
      }]
    });
    if (!req.session.logged_in) {
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
      }
    } else {
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
router.get('/appointment', withAuth, async (req, res) => {
  res.render('newAppointment.handlebars');
});

//Route to get the available hours given the selected date
router.get('/appointment/date', withAuth, async (req, res) => {
  try {
    const appointmentsData = await Appointment.findAll({
      include: {
          model: Service,
          attributes:["id", "name", "description", "price", "descounted_price" ],
          
        

      },
      where: {
        app_date: req.body.app_date
      }
    });
    const appointments = appointmentsData.map(appointment => appointment.get({
      plain: true
    }));
    res.status(200).json({
      appointments
    });
  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;
