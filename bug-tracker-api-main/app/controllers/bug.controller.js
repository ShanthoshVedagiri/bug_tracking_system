const bugbusiness = require("../business/bugs-business");
try {
  exports.createbug = async (req, res) => {
    try {
      const bug = await bugbusiness.bugsave(req.body);

      res.send(bug);
    } catch (e) {
      console.log(e);
      return res.status(500).send({
        data: e.toString(),
        exception: true,
      });
    }
  };

  exports.updatebug = async (req, res) => {
    try {
      const bug = await bugbusiness.updatebuginformation(req.body);

      res.send(bug);
    } catch (e) {
      console.log(e);
      return res.status(500).send({
        data: e.toString(),
        exception: true,
      });
    }
  };
  exports.deletebug = async (req, res) => {
    try {
       await bugbusiness.deletebug(req.body._id);

      res.send(true);
    } catch (e) {
      console.log(e);
      return res.status(500).send({
        data: e.toString(),
        exception: true,
      });
    }
  };

  
  exports.getAllbug = async (req, res) => {
    try {
      const bug = await bugbusiness.findallbugs();

      res.send(bug);
    } catch (e) {
      console.log(e);
      return res.status(500).send({
        data: e.toString(),
        exception: true,
      });
    }
  };
} catch (e) {
  console.log(e);
}
