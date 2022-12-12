const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];

  if (token) {
    const decode = jwt.verify(token, "masai");

    if (decode) {
      // *it will give which ever we provide at the time of token genratation
      // * we will we able to use that info for our use
      const userID = decode.userID;
      //   * we are adding user id to body
      //   * we also need to asign to userID  ---->
      req.body.userID = userID;
      //   console.log(decode);
      next();
    } else {
      res.send({ msg: "Login again" });
    }
  } else {
    res.send({ msg: "Login again" });
  }
};

module.exports = {
  authenticate,
};
