console.log('Welcome to the Improved Cocktail Database!')

const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

const PORT = 1984

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'cocktail-database'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName}!`)
        db = client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.subscribe(express.json())

app.post('/addCocktail', (request, response) => {
    db.collection('cocktail-collection').insertOne({name:request.body.name, ingredients1:request.body.ingredients1, ingredients2:request.body.ingredients2, ingredients3:request.body.ingredients3, ingredients4:request.body.ingredients4, ingredients5:request.body.ingredients5, ingredients6:request.body.ingredients6, ingredients7:request.body.ingredients7, glassware:request.body.glassware, garnish:request.body.garnish, instructions:request.body.instructions})
        .then(result => {
            console.log('Cocktail added')
            //This redirect stops the infinite loading
            response.redirect('/')
        })
        .catch(error => console.error(error))
})

/*
app.delete('/deleteCocktail', (request, response) => {
    db.collection('cocktail-collection').deleteOne({name:request.body.name})
    .then(result => {
        console.log('Cocktail deleted')
        response.json('Cocktail deleted')
    })
    .cath(error => console.error(error))
})
*/

app.get('/', (req, res) => {
    db.collection('cocktail-database').find().toArray()
        .then(results => {
            console.log(results)
        })
        .catch(error => console.error(error))
    res.render('index.ejs', {})
})


app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})