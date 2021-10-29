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

  if (this.date_of_death) {
    res += ' - ';
    res += DateTime.fromJSDate(this.date_of_death).toLocaleString(
      DateTime.DATE_MED
    );
  }
  return res;
});

AuthorSchema.virtual('url').get(function () {
  return '/catalog/author/' + this._id;
});

AuthorSchema.virtual('date_of_birth_input').get(function () {
  return DateTime.fromJSDate(this.date_of_birth).toFormat('yyyy-MM-dd');
});
AuthorSchema.virtual('date_of_death_input').get(function () {
  return DateTime.fromJSDate(this.date_of_death).toFormat('yyyy-MM-dd');
});

module.exports = mongoose.model('Author', AuthorSchema);
