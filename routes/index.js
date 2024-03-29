const router = require ('express').Router();
const passport = require('passport');

router.use('/', require('./swagger'));

router.use('/authors', require('./authors'));
router.use('/books', require('./books'));
router.use('/loans', require('./loans'));
router.use('/users', require('./users'));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next){
    req.logout(function(err) {
        if (err) { return next(err);}
        res.redirect('/');
    })
});

module.exports = router;

// router.get('/', (req,res) => { 
//     //#swagger.tags=['Hello World']
//     res.send('Hello World');
// });