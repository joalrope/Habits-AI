const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { dbConnection } = require('./database/config');

const app = express();
dbConnection();
app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use('/api/users', require('./routes/users'));

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto: ${process.env.PORT}`);
});
