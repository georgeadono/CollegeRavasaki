const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { stringify } = require('querystring');

const serverless = require('serverless-http');

var cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '/index.html')));

module.exports = app;
module.exports.handler = serverless(app);

mongoose.connect("mongodb+srv://georgeadono:adono123@cluster0.rrqhofb.mongodb.net/?retryWrites=true&w=majority")




const contactSchema = {
    sender: Number,
    reciever: Number,
    message: String,

  };
  const Schema = mongoose.model("Schema",contactSchema)



app.post('/send', (req, res) => {
  const data = new Schema(req.body)

  try{
    data.save()
    res.status(200).json(data)
  }
  catch(error){
      res.status(400).json({message:error.message})
  }
  
});



app.get('/', (req, res) => {

    Schema.find({}).lean().exec((err, data) => {
        if (err) throw err;
        res.json(data);
      });

  
});



app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
