const { Schema, model } = require('mongoose'); 

const userSchema = new Schema(
	{
		 
		useremail: {
			type: String,
			required: true,
			unique: true,
		},
		userpasswordhash: {
			type: String,
		},
		userfirstname: {
			type: String,
			required: true,
		},
		userlastname: {
			type: String,
		},
		phonenumber: {
			type: String,
		},
		usergender: {
			type: String,
		},
		userdateofbirth: {
			type: Date,
		},
		 
		userenabled: {
			type: Boolean,
			default: false,
		},
		userroles: {
			type: [String],
			default: null
		},
		useractivated: {
			type: Boolean,
			default: false,
		},
		useractivateddate: {
			type: Date,
			default: null,
		},
		createdat: {
			type: Date,
			default: Date.now(),
		},
		updatedat: {
			type: Date,
			default: Date.now(),
		},
	},
	{
		versionKey: false,
	}
);
module.exports = model('user', userSchema);
