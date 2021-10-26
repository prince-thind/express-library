const { DateTime } = require('luxon');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

AuthorSchema.virtual('name').get(function () {
  return this.first_name + ' ' + this.family_name;
});

AuthorSchema.virtual('lifespan').get(function () {
  let res = '';
  if (this.date_of_birth) {
    res = DateTime.fromJSDate(this.date_of_birth).toLocaleString(
      DateTime.DATE_MED
    );
  }
  res += '-';
  if (this.date_of_death) {
    res = DateTime.fromJSDate(this.date_of_death).toLocaleString(
      DateTime.DATE_MED
    );
  }
  return res;
});

AuthorSchema.virtual('url').get(function () {
  return '/catalog/author/' + this.id;
});

module.exports = mongoose.model('Author', AuthorSchema);
