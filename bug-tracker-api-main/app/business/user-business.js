const user = require("../models/user.model");
const rolesenum = require("./roles.enum");
try {
  module.exports = {
    usersave: (payloads) => {
      return user.create({
        useremail: payloads.useremail,
        userpasswordhash: payloads.userpasswordhash,
        userfirstname: payloads.userfirstname,
        userlastname: payloads.userlastname,
        userdateofbirth: (payloads?.userdateofbirth)?new Date(payloads?.userdateofbirth):new Date(),
        phonenumber: payloads.phonenumber,
        userroles:
          payloads?.userroles?.length > 0
            ? payloads.userroles
            : [rolesenum.TESTER],

        userenabled: true,
      });
    },
    userfindbyemail: (useremail) =>
      user
        .findOne(
          {
            useremail,
          },
          { passwordhash: 0 }
        )
        .lean(),

    userfindbyid: (userid) =>
      user
        .findOne({
          userid,
        })
        .lean(),

    updateuserinformation: (payload) =>
      user.findOneAndUpdate(
        { useremail: payload.useremail },
        {
          userpasswordhash: payload.userpasswordhash,
          userfirstname: payload.userfirstname,
          userlastname: payload.userlastname,
          usergender: payload.usergender,

          location: payload.location,
          phonenumber: payload.phonenumber,
          userdateofbirth: payload.userdateofbirth,
          defaulttheme: payload.defaulttheme,
          userenabled: payload.userenabled,
          userroles: payload.userroles,
          useractivated: payload.useractivated,
        },
        { new: true }
      ),
    updateuserroles: (payload) =>
      user.findOneAndUpdate(
        { userid: payload.userid },
        {
          userroles: payload.userroles,
        },
        { new: true }
      ),
      
    enableuser: (useremail) =>
    user.findOneAndUpdate(
      {useremail },
      {
        userenabled: true,
      },
      { new: true }
    ),
    disableuser: (useremail) =>
    user.findOneAndUpdate(
      {useremail },
      {
        userenabled: false,
      },
      { new: true }
    ),
    deleteUser: (userid) => user.deleteOne({ userid: userid }),
    getAllUser: () => user.find({}, { userpasswordhash: 0, _id: 0 }).lean(),
    getUserByID: (userid) =>
      user.findOne({ userid }, { userpasswordhash: 0, _id: 0 }).lean(),
  };
} catch (e) {
  console.log(e);
}
