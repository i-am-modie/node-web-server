const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public_html'));

app.use( (req, res, next)=> {
    let now = new Date().toString();
    let log =`${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err)=>{
        if(err){
            console.log('Unable to append to server log');
        }
    });
    next();
});

// app.use((req,res,next)=> {
//     res.render('maintance.hbs');
//     }
// )
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', text => text.toUpperCase());

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!</h1>');
    res.render('home.hbs', {
        pageTitle: 'Welcome Page',
        welcomeMessage: 'Hello Express'
    });
} );

app.get('/about', (req, res)=> {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});
app.get('/portfolio', (req, res)=> {
    res.render('portfolio.hbs', {
        pageTitle: 'Portfolio',
        portfolioLink: 'http://github.com/modestroy'
    });
});

app.get('/bad', (req, res)=> {
    res.send({
        error: 404,
        errorMessage: 'blad'
    });
});

app.listen(port, ()=> {
    console.log(`Server rises like a phoenix from the ashes In ${port} universe`)
});