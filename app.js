const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes')
/**
 * CODE RUNS FROM TOP TO BOTTOM
 */

//express app
const app = express()

//Connect to mongodb
const dbURI = 'mongodb+srv://etiennetest:test1234@nodetuts.dqage.mongodb.net/node-tuts?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true}) //Options to avoid depreciation warning
    .then((result) => {//After db connection
        console.log('connected to db')
        app.listen(3000)//Listening for requests upon connection
    })
    .catch((err) => {
        console.log(err)
    })

//register view engine
app.set('view engine', 'ejs')

//Listen for requests
//app.listen(3000)

//middleware & static files (i.e. css and images)
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))//Attaches request data to body
app.use(morgan('dev'))//Similar to strapi logger

//mongoose and mongo sandbox routes
// app.get('/add-blog', (req,res) => {
//     const blog = new Blog({
//         title: 'new blog 2',
//         snippet: 'about my new blog',
//         body: 'more about my new blog'
//     })

//     blog.save()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err)
//         })
// })

// app.get('/all-blogs', (req,res) => {
//     Blog.find()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err)
//         })
// })

// app.get('/single-blog', (req,res) => {
//     Blog.findById("612bdb15fc5537520235c808")
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err)
//         })
// })
//Makes the browser hang since it doesnt know what to do next, we have to add 'next' parameter
// app.use((req,res,next) => {
//     console.log('New request made:')
//     console.log('host: ', req.hostname)
//     console.log('path: ', req.path)
//     console.log('method: ', req.method)
//     next()//move to the next handler
// })

// //Makes the browser hang since it doesnt know what to do next, we have to add 'next' parameter
// app.use((req,res,next) => {
//     console.log('In the next middleware')
//     next()//move to the next handler
// })

app.get('/', (req,res) => {
    // const blogs = [
    //     {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //   ];
    //Automatically sets content type, no need to specify, same for status code
    //res.send('<b>home page</p>')
    //res.sendFile('./views/index.html', { root: __dirname })
    
    //render ejs template
    //res.render('index', {title: 'home', blogs})//Like passing props
    res.redirect('/blogs')
})

app.get('/about', (req,res) => {
    
    //Automatically sets content type, no need to specify, same for status code
    //res.send('<b>about page</p>')
    //res.sendFile('./views/about.html', { root: __dirname })

    //render ejs template
    res.render('about', {title: 'about'})
})

//redirects
app.get('/about-us', (req,res) => {
    res.redirect('/about')
})

//blog routes
app.use('/blogs',blogRoutes)

//404 
// 'use' for create middleware and fire middleware functions, 
//use this function for every incoming request regardless the url AS LONG AS A RESPONSE HAS NOT YET BEEN SENT
//Function executed for any type of http request on any or a specific path
app.use((req, res) => {
    //res.status(404).sendFile('./views/404.html', { root: __dirname })

    //render ejs template
    res.status(404).render('404', {title: '404'})

})