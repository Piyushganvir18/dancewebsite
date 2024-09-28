const express = require("express")
const app = express();
const path = require("path")
const port = 80;
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
// const { Router } = require("express");
// const router = express.Router();

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/piyushkart');
}
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String
});
const Contact = mongoose.model('contacts', contactSchema);

// app.use("/",router);
app.use(express.static(path.join(__dirname,'/static')))
// app.use(express.urlencoded());
// set template engine pug
// app.set('view engine', 'pug')

// // set directory
// app.set('views', path.join(__dirname, "views"))

// // SET END POINT
// app.get("/", (req, res) => {
//     const para = {}
//     res.status(200).sendFile("index.pug", para)
// })
// app.get("/contact", (req, res) => {
//     const para = {}
//     res.status(200).sendFile("contact.pug", para)
// })

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname,'/views/index.html'));
  //__dirname : It will resolve to your project folder.
});

app.get('/contact',function(req,res){
  res.sendFile(path.join(__dirname,'/views/contact.html'));
});

app.post("/contact",(req,res)=>{
    const myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("This item has been saved to the database")
    }).catch(() => {
        res.status(400).send("this form cannot be summited try again!!")
    })
});




app.listen(port, () => {
    console.log(`run successfully on ${port}`)
});