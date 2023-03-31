const {userAuth} = require('../middlewares/Auth')
const router = express.Router();



//login route
router.post('/login',userLogin)

//signup
router.post('/signup',userSignup)

//middleware to check login
router.use(userAuth)
//user profile
router.get('/profile',userProfile)

module.exports = router