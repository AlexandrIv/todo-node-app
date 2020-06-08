const express = require('express');
const mongoos = require('mongoose');
const path = require('path');
const exphbs = require('express-handlebars');
const todosRoutes = require('./routes/todos');

const PORT = process.env.PORT || 3000;

const app = express();
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(todosRoutes);

async function start() {
    try {
        await mongoos.connect('mongodb+srv://alex:1qaz2wsx@cluster0-n0uos.mongodb.net/todos', {
           useNewUrlParser: true,
           useFindAndModify: false,
           useUnifiedTopology: true,
        });
        app.listen(PORT, () => {
            console.log('Server has been started...');
        });
    } catch (e) {
        console.log(e);
    }
}

start();

