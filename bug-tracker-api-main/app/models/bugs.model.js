const { Schema, model } = require("mongoose");

const bugSchema = new Schema(
  {
    bugname: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    severity: {
      type: String,
    },
    status: {
      type: Boolean,
    },
    updatedby: {
      type: String,
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
module.exports = model("bug", bugSchema);
