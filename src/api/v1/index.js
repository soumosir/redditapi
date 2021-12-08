import express from 'express';
import bodyParser from 'body-parser';
import blogRoutes from './routes/blogRoutes.js';
import cors from 'cors';
// const keys = require('./config/keys');

// require('./models/User');
// require('./models/Blog');
const app = express();
app.use(cors())
app.use(bodyParser.json());

// require('./routes/authRoutes')(app);
app.use(blogRoutes);
// require('./routes/blogRoutes')(app);

if (['production'].includes(process.env.NODE_ENV)) {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port`, PORT);
});