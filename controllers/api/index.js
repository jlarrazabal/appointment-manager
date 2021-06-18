const router = require('express').Router();
const userRoutes = require('./userRoutes');
const serviceRoutes= require('./serviceRoutes');
const appointmentRoutes = require('./appointmentRoutes');

router.use('/users', userRoutes);
router.use('/service', serviceRoutes);
router.use('/appointment', appointmentRoutes);



module.exports = router;
