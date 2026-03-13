const mongoose = require('mongoose')

const memberSchema = new mongoose.Schema({
  name:       { type: String, required: true },
  phone:      { type: String, required: true },
  email:      { type: String },
  idNumber:   { type: String, required: true },
  category:   { type: String, enum: ['nuclear','nuclear_parents','nuclear_both_parents'], required: true },
  package:    { type: String, enum: ['medical','last_expense','combined'], required: true },
  dependants: [{ name: String, relationship: String, dob: Date }],
  status:     { type: String, enum: ['pending','active','suspended'], default: 'pending' },
}, { timestamps: true })

module.exports = mongoose.model('Member', memberSchema)
