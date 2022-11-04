const bugs = require("../models/bugs.model");
const severity = require("./severity.enum");
try {
  module.exports = {
    bugsave: (payloads) => {
      return bugs.create({
        bugname: payloads.bugname,
        description: payloads.description,
        severity: payloads.severity,
        status: (payloads?.status)?payloads.status:true,
        updatedby: payloads.updatedby,
        updatedat: payloads.updatedat,
      });
    },
    bugfindbyid: (_id) =>
      bugs
        .findById({
          _id,
        })
        .lean(),
        // bugfindbyid: (_id) =>
        // bugs
        //   .findById({
        //     _id,
        //   })
        //   .lean(),
    findallbugs: (_id) => bugs.find({}).lean(),

    updatebuginformation: (payload) =>
      bugs.findOneAndUpdate(
        { _id: payload._id },
        {
          bugname: payload.bugname,
          description: payload.description,
          severity: payload.severity,
          status: payload.status,
          updatedby: payload.updatedby,
          updatedat: payload.updatedat,
        },
        { new: true }
      ),
    deletebug: (bugid) => bugs.deleteOne({ _id: bugid }),
  };
} catch (e) {
  console.log(e);
}
