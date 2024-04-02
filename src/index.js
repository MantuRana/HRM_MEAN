const express = require("express")
const path = require("path")
const app = express()
const hbs = require("hbs")
const collection = require("./mongodb")
const doonerdata1 = require("./blooddb")

const e = require("express")
const tempelatePath= path.join(__dirname,'../tempelates')

app.use(express.json())


// Serve static files from the 'public' directory
app.use(express.static('public'));

app.set("view engine","hbs")
app.set("views",tempelatePath)
app.use(express.urlencoded({extended:false}))



app.get('/', (req, res) => {
    res.render('signup')
})

app.get('/login', (req, res) => {
    res.render('login')
})





app.post('/signup', async (req, res) => {

    const data = {
        name: req.body.name,
        email:req.body.email,
        password: req.body.password,
        number: req.body.number,
        gender: req.body.gender,
    }

    await collection.insertMany([data])
    // const formData = req.body;

    res.render("login",{ profile: req.body.name,
        email:req.body.email,
        number: req.body.number,
        gender: req.body.gender})
 
    } );



    app.post('/login', async (req, res) => {

           try {
        const check = await collection.findOne({ name: req.body.name })

        if (check.password === req.body.password) {

            res.render("index",{
                profile : req.body.name,
               
            }
            );
            // res.status(201).render("home", { naming: `${req.body.password}+${req.body.name}` })
        }

        else {
            res.send({ name: req.body.name })
        }
    } 
    
    catch {

        res.send("Please enter correct details")
    }
     
        } )
    

    // // get data of donor from home.hbs
    app.post('/home', async (req, res) => {

        const data1 = {
            name: req.body.name,
            phone:req.body.phone,
            email: req.body.email,
            blood_type: req.body.blood_type,
            city:req.body.city,
            state:req.body.state

        }
    
        await doonerdata1.insertMany([data1])
        // const formData = req.body;
    
        res.render("home")
     
        } )





app.listen(3000, () => {
    console.log('port connected');
})






