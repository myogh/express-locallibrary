const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const AuthorSchema = new mongoose.Schema({
  first_name: { type: String, required: true, maxlength: 100 },
  family_name: { type: String, required: true, maxlength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

// Virtual for authro's full name
AuthorSchema.virtual("name").get(function () {
  return `${this.first_name}, ${this.family_name}`;
});

// Virtual for author's URL
AuthorSchema.virtual("lifespan").get(function () {
  return (
    this.date_of_death.getYear() - this.date_of_birth.getYear()
  ).toString();
});

// Virtual for author's DOB and DOD pretty format
AuthorSchema.virtual("dob_formated").get(function () {
  return this.date_of_birth
    ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED)
    : "";
});

AuthorSchema.virtual("dod_formated").get(function () {
  return this.date_of_death
    ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED)
    : "";
});

// Virtual for author's URL
AuthorSchema.virtual("url").get(function () {
  return "/catalog/author/" + this._id;
});

module.exports = mongoose.model("Author", AuthorSchema);
