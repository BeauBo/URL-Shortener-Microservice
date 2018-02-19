const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShortenUrlSchema = new Schema({
  originalUrl: String,
  shortenUrl: String
},{timestamp: true});


const ShortenUrl = mongoose.model('shortenUrl', ShortenUrlSchema);

module.exports = ShortenUrl;
