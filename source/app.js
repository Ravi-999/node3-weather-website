const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./geocode.js')

const app = express()

//define paths for express config
const route = path.join(__dirname,'../public')
const viewspath = path.join(__dirname,'../templates/views')
const partialspath = path.join(__dirname,'../templates/partials')

//setup handle bars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)

app.use(express.static(route))

app.get('',(req,res)=>{
    res.render('index',{
        title:'weather app',
        name:'nani babu'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about me',
        name:'fasak'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message:'Need help!!!',
        title:'help',
        name:'helping'
    })
})
// app.get('/help', (req, res) => {
//     res.send('Help page')
// })

// app.get('/about', (req, res) => {
//     res.send('About')
// })
app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
        return res.send({
            error:'please provide address'
        })
    }
    geocode(req.query.address,(error,response)=>{
           if(error)
             {
                return  res.send({
                     error:'couldnt fetch data'
                 })
             }
             res.send({
                latitude:response.latitude,
                longitude:response.longitude,
                location:response.location
            })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search)
    {
        return res.send({
            error:'please provide search'
        })
    }
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
      res.render('404',{
          errormessage:'help article not found'
      })
})

app.get('*',(req,res)=>{
  res.render('404',{
      errormessage:'page not found'
  })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})