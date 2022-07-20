const express = require('express');
const app = express();
const path = require('path');
const methodOverride =  require('method-override');
const puerto = process.env.PORT || 3000;

/* npm start (node)
npm run dev (nodemon)*/

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');


app.use('/static', express.static(path.join(__dirname, '../public')))
app.use('/images', express.static(path.join(__dirname, '../public/images')))
app.use('/css', express.static(path.join(__dirname, '../public/css')))
app.use('/views', express.static(path.join(__dirname, './views')))
app.use('/partials', express.static(path.join(__dirname, './views/partials')))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));


const mainRouter = require('./routes/mainRouter');
app.use('/', mainRouter)

const userRouter = require('./routes/userRouter');
app.use('/user', userRouter)

const productsRouter = require('./routes/productsRouter');
app.use('/products', productsRouter)

//Ruta para el error 404
app.all('*', (req, res) => {
    res.render('notFound');
} // end of 404 route
);

app.listen(puerto, ()=>{
    console.log('http://localhost:' + puerto);
})