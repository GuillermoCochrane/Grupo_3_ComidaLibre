const express = require('express');
const app = express();
const path = require('path');
const puerto = process.env.PORT || 3000;

/* npm start (node)
npm run dev (nodemon)*/

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');


app.use('/public', express.static(path.join(__dirname, '../public')))
app.use('/images', express.static(path.join(__dirname, '../public/images')))
app.use('/css', express.static(path.join(__dirname, '../public/css')))
app.use('/views', express.static(path.join(__dirname, '/public/views')))
app.use('/partials', express.static(path.join(__dirname, '/views/partials')))


const mainRouter = require('./routes/mainRouter');
app.use(mainRouter)

const userRouter = require('./routes/userRouter');
app.use(userRouter)

const productsRouter = require('./routes/productsRouter');
app.use(productsRouter)



app.listen(puerto, ()=>{
    console.log('http://localhost:' + puerto);
})