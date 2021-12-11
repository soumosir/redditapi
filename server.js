import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import blogRoutes from './src/api/v1/routes/blogRoutes.js';
import defaultRoutes from './src/api/v1/routes/defaultRoutes.js';
// const keys = require('./config/keys');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(blogRoutes);
app.use(defaultRoutes);

app.get('*', (req, res) => {
  res.redirect('/');
});
export default app;
