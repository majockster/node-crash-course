const http = require('http')
const fs = require('fs')
const _ = require('lodash')

const server = http.createServer((req, res) => {
    //console.log('request made')//Callback function once the server has been created (acts as a GET request)

    //lodash
    const num = _.random(0,20)
    console.log(num)

    //more lodash...
    const greet = _.once(() => {//Can only be called once
        console.log('hello test1')
    })

    //set content type
    res.setHeader('Content-Type', 'text/html')

    //Write to the response
    // res.write('<b>hello world</b>')

    let path = './views/'
    //Basic routing system
    switch(req.url){
        case '/':
            path += 'index.html'
            res.statusCode = 200
            break
        case '/about':
            path += 'about.html'
            res.statusCode = 200
            break
        case '/about-us'://Redirect
            res.statusCode = 301
            res.setHeader('Location', '/about')
            break
        default:
            path += '404.html'
            res.statusCode = 404
            break
    }

    //send html file
    fs.readFile(path, (err,data) => {
        if(err){
            console.log(err)
        }
        else{
            res.write(data)
        }
        //Ending the response
        res.end()
    } )

    
})
//Not yet actively listening for request being sent to the server

//then...

server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000')
})

//Page hangs on browser because we are not sending response via res object

