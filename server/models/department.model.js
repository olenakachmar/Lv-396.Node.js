const mongoose = require('mongoose');

const { Schema } = mongoose;

const departmentSchema = new Schema(
  {
    title: { type: String, required: true },
    employees: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }],
  },
);


const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
