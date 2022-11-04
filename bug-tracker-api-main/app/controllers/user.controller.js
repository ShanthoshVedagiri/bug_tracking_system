const userbusiness = require("../business/user-business");
try {
  exports.signup = async (req, res) => {
    try {
      if (await userbusiness.userfindbyemail(req.body.useremail)) {
        return res.status(400).send({
          data: false,
          message: "Email Exist",
          error: true,
        });
      }

      const userbody = {
        ...req.body,
      };
      await userbusiness.usersave(userbody);
      let userinfo = {
        password: req.body.userpasswordhash,
        email: req.body.useremail,
      };
      return res.status(200).send({ userinfo });
      // res.send(userinfo);
    } catch (e) {
      console.log(e);
      return res.status(500).send({
        data: e.toString(),
        exception: true,
      });
    }
  };

  exports.signin = async (req, res) => {
    try {
      const user = await userbusiness.userfindbyemail(req.body.useremail);

      if (!user) {
        return res.status(401).send({
          data: "Invalid username / password",
          error: true,
        });
      }
      if (user?.userenabled == false) {
        return res.status(401).send({
          message: "User Disabled",
          error: true,
          data: false,
        });
      }
      const passwordIsValid =
        req.body.userpasswordhash == user.userpasswordhash ? true : false;

      if (!passwordIsValid) {
        return res.status(401).send({
          data: "invalid username / password",
          error: true,
        });
      }
      let userdata = { ...user, role: user.userroles[0] };
      return res.status(200).send({
        data: userdata,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).send({
        data: e.toString(),
        exception: true,
      });
    }
  };

  exports.enableuser = async (req, res) => {
    try {
      if (!(await userbusiness.userfindbyemail(req.body.useremail))) {
        return res.status(400).send({
          data: false,
          message: "Email not Exist",
          error: true,
        });
      }
      await userbusiness.enableuser(req.body.useremail);

      return res.status(200).send(true);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  };
  exports.disableuser = async (req, res) => {
    try {
      if (!(await userbusiness.userfindbyemail(req.body.useremail))) {
        return res.status(400).send({
          data: false,
          message: "Email not Exist",
          error: true,
        });
      }
      await userbusiness.disableuser(req.body.useremail);

      return res.status(200).send(true);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  };
  exports.getAllUsers = async (req, res) => {
    try {
      // if (!(await userbusiness.userfindbyemail(req.body.useremail))) {
      //   return res.status(400).send({
      //     data: false,
      //     message: "Email not Exist",
      //     error: true,
      //   });
      // }
      let users = await userbusiness.getAllUser();
      users = users.map((x) => {
        return { ...x, role: x.userroles[0] };
      });
      //  { ...user, role: user.userroles[0] };

      return res.status(200).send(users);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  };
} catch (e) {
  console.log(e);
}
