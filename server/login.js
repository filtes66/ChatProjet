const jwt = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');

const router = express.Router();

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } }).catch(
        (err) => {
            console.log("Error: ", err);
        }
    );

    if (!user)
        return res
            .status(400)
            .json({ message : "Email or password does not match" });

    if (user.password !== password)
        return res
            .status(400)
            .json( { message: "Email or password does not match!" });

    const jwtToken = jsonwebtoken.sign(
        { id: user.id, username: user.username },
       /* process.env.JWT_SECRET*/'secret123',
        );

    res.cookie('token', token, { httpOnly: true });
    //res.json({ token });

   // res.json({ message: "Welcome Back", token: jwtToken });
});

    module.exports = router;