const express = require('express');
const bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
const app = express();
const user = require('./models/user');
const client = require('./models/client')
const jwt = require('jsonwebtoken')
const {jwtkey} = require('./config/keys')
var http = require('http');
const requireToken = require('./middleware/requireToken')

// Database
const db = require('./config/database');
app.use(bodyParser.json())
// Test DB
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err))
 


// Index route
app.get('/',requireToken,(req,res)=>{
  res.send({email:req.us.email})
})
app.get('/all',async (req,res)=>{
    // const {cname} = req.body
    const use = await client.findAll()
    res.send(use)
    if(!use){
        return res.status(422).send({error :"must provide username or password2"})
    }
    try{
      console.log(use)
    }catch(err){
        return res.status(422).send({error :"must provide username or password3"})
    }
})
// app.get('/', (req, res) => 
//   user.findAll()
//     .then(user => res.send(user))
//     .catch(err => console.log(err)));

app.post('/signup',async (req, res) => {
        let { fname,lname,email,phone,username,password } = req.body;
        try{
            const hash = await bcrypt.hash(password, 10);
              // bcrypt.genSalt(10, function(err, salt) {
              //   bcrypt.hash(password, salt, async(err, hash)=> {
                    // Store hash in your password DB.
                    const use = new user({fname,lname,email,phone,username,password:hash});
                await  use.save();
                const token = jwt.sign({userId:use.id},jwtkey)
                res.send({token})
            //     });
            // });
          
    
        }catch(err){
          return res.status(422).send(err.message)
        }
});

app.post('/signin',async (req,res)=>{
  const {username,password} = req.body
  if(!username || !password){
      return res.status(422).send({error :"must provide username or password"})
  }
  const use = await user.findOne({ where: { username } })
  // res.send(use)
  if(!use){
      return res.status(422).send({error :"must provide username or password2"})
  }
  try{
    console.log(use.hash)
    // await user.comparePassword(password);
    const validPass = await bcrypt.compare(password, use.password);
            if(validPass) {
                const token = jwt.sign({userId:use.id},jwtkey)
                res.send({token})
              // res.status(200).json('Valid Email and pass!');
            } else {
                res.status(400).json('Wrong password!');
            }    
    
  }catch(err){
      return res.status(422).send({error :"must provide username or password3"})
  }
})


app.post('/clien', async (req, res) => {
  let { name, address, city, state, pincode, email, phone } = req.body;
  try{
    const con = new client({ name, address, city, state, pincode, email, phone });
    await  con.save();
    res.send("Success")
  }catch(err){
    return res.status(422).send(err.message)
  }
}); 


app.post('/searc',async (req,res)=>{
    const {category} = req.body
    // const use=[];
    console.log(category)
    // if(!use){
      //   return res.status(422).send({error :"must provide username or password2"})
      // }
      try{
        const use = await client.findAll({ where: { category } })
        // use.push(one)
        res.send(use)
        console.log(use)
        // return use
      }catch(err){
        return res.status(422).send({error :"Error"})
    }
    // res.send(use)
  })

const port = process.env.PORT;

app.listen(port, console.log(`Server started on port ${port}`));