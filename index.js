import app from './server.js'
// if (['production'].includes(process.env.NODE_ENV)) {
//   app.use(express.static('client/build'));

//   const path = require('path');
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve('client', 'build', 'index.html'));
//   });
// }
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Listening on port`, PORT);
});