const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  lectures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'lectures' }]
  // Other course details
});

module.exports = mongoose.model('courses', courseSchema);
