const mongoose = require('mongoose');

const { Schema } = mongoose;

const issueSchema = new Schema(
  {
    name: { type: String, required: true },
    excerpt: { type: String, required: true },
    status: { type: String, required: true },
    type: { type: String, required: true },
    date: { type: Number },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: { type: String, required: true },
    assignTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },


    reassigned: { type: String },

  },
);


const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;
