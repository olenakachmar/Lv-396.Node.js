const mongoose = require('mongoose');
require('mongoose-moment')(mongoose);

const { Schema } = mongoose;

const issueSchema = new Schema(
  {
    title: { type: String, required: true },
    type: { type: String, required: true },
    priority: { type: String, required: true },
    assignTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    created: { type: Number },
    value: { type: String, required: true },
    ownerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    reassigned: { type: String },
  },
);


const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;
