const router = require('express').Router();
const {User, Appointment, Service, Calendar} = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/new', withAuth, async (req, res) => {
    try {
        const findAppointments = await Appointment.findAll({where: {app_date: req.body.app_date}});
        if(findAppointments.length === 5) {
            res.status(400).json({message: "We don't have any available appointment for the selected date!"})
         return;
         }
         const newAppointment = await Appointment.create({
             name: req.body.name,
             description: req.body.description,
             price: req.body.price,
             descounted_price: req.body.price*0.7,
         });
         const serNewService = newService.get({plain: true})   
         res.status(200).json({serNewService});
 
     } catch (err) {
     console.log(err);
     res.status(500).json(err);
    };
 }); 


module.exports = router;
