const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')




const express = require('express')
const path=require('path')
const hbs=require('hbs')
const { query } = require('express')


//define paths for express config
const publicDirectory=path.join(__dirname,'../public')
const viewspath =path.join(__dirname,'../templates/views')
const partialpath=path.join(__dirname,'../templates/partials')

const app=express()
const port = process.env.PORT || 3000


//setup handlebars engine and view location
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialpath)

//setup static directory to use
app.use(express.static(publicDirectory))


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather app',
        name:'yogeeta paryani'
    })
})

app.get('/help',(req,res)=>{
     res.render('help',{
        title:'Help',
         message:'how can i help you',
         name:'yogeeta paryani'
     })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'yogeeta paryani'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address)
     {
         return res.send({
             error:'You must provide a address term'
         })
     }
     geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
          
            if(error){
                return res.send({error})
            }
            forecast(latitude,longitude,(error,forecastData)=>{
                if(error){
                    return res.send({error})
                }
                res.send({

                    forecast:forecastData,location,
                    address:req.query.address
                })
        
            })


     })
    })
     

app.get('/help/*',(req,res)=>{
    res.render('helpArticle',{
        message:'help article does not exist',
        name:'yogeeta paryani',
        title:'page not found'
    })
})


app.get('*',(req,res)=>{
    res.render('404',{
        message:'page not found',
        name:'yogeeta paryani',
        title:'404'
    })
})

app.listen(port,()=>{
    console.log('Server is starting on port 3000')
})