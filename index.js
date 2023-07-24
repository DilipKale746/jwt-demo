const express = require('express');
const app = express();
const userRoutes = require('./routes/user')

app.use('/users',userRoutes);
app.listen(3000,()=>console.log('App running on port 3000'))