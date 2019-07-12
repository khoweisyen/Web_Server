const mongoose = require('mongoose');

var server =
  'mongodb+srv://Kho:wei@cluster0-7n0zi.mongodb.net/Testing?retryWrites=true&w=majority';
  
mongoose
  .connect(`${server}`, { useNewUrlParser: true })
  .then(res => {
    console.log('Mongoose connected. ');
  })
  .catch(err => {
    console.log('Unable to connect mongoose server!');
  });

module.exports = mongoose;
