const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../src/utils/geocode')
const forecast = require('../src/utils/forecast')
const app = express()
const port = process.env.PORT || 3000;
// defining paths
const pathToDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setting handlebar
app.set('views', viewsPath)
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath)

//setting up static folder to be served
app.use(express.static(pathToDir))

//below are the paths to be served
app.get('', (req, res) => {
    res.render('index', { title: 'Weather', name: 'Sakshi Soni' })
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About page', aboutImage: 'images/cat.jpg', name: 'Sakshi Soni' })
})

app.get('/help', (req, res) => {
    res.render('help', { title: 'Help page', name: 'Sakshi Soni' })
})


app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
      return res.send({error: 'Please provide address to get weather information required'})
    }
    geocode(req.query.address, (error, {latitude, longitude, placeName} = {}) => {
        if (error) {
            return res.send({error: error})
        }
    
        forecast(latitude, longitude, (error, {text}) => {
            if (error) {
                return res.send({error: error})
            }
            res.send({placeName: placeName, forecast: text, address: req.query});
        });
    });
})

app.get('/help/*', (req, res) => {
    res.render('error', {title: 'Help page not found', name: 'Sakshi Soni', error: 'Help article not found'})
})

app.get('*', (req, res) => {
    res.render('error', {title: 'Your page not found', name: 'Sakshi Soni', error: 'Page not found'})
})

app.listen(port, () => {
    console.log('server is up on 3000 port')
})