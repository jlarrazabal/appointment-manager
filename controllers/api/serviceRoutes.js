const router = require('express').Router();
const { Service, Appointment, User, Calendar } = require('../../models');
const withAuth = require('../../utils/auth');



router.post('/create', withAuth, async (req, res) => {
   try {
       const findService = await Service.findOne({where: {name: req.body.name}});
       if(findService) {
           res.status(400).json({message: "This service already exists, please try again!"})
        return;
        }
        const newService = await Service.create({
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

module.exports= router;