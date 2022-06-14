const express = require('express');
const index = express();
const livereload = require("livereload");
const path = require('path');

index.use('/static', express.static(path.resolve(__dirname,'./public')));
index.use('/images', express.static(path.resolve(__dirname,'./public/images')));
index.use('/css', express.static(path.resolve(__dirname,'./public/css')));
index.use('/views', express.static(path.resolve(__dirname,'./views')));

const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, '/views'));
index.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/views/index.html'))
});
index.get('/products', (req,res) => {
    res.sendFile(path.join(__dirname, '/views/productDetail.html'))
});
index.get('/cart', (req,res) => {
    res.sendFile(path.join(__dirname, '/views/productCart.html'))
});
index.get('/register', (req,res) => {
    res.sendFile(path.join(__dirname, './views/register.html'))
});
index.get('/login', (req,res) => {
    res.sendFile(path.join(__dirname, './views/login.html'))
});
index.get('/notFound', (req,res) => {
    res.sendFile(path.join(__dirname, './views/notFound.html'))
});


index.listen(3000, () => {
    console.log('Server up')
    console.log(__dirname)
})