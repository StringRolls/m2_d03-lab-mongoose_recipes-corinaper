const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb+srv://stringrolls:g61f6e1WppytuAX8@cluster0.dk3tr.mongodb.net/recipes?retryWrites=true&w=majority';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .catch(error => {
    console.error('Error connecting to the database', error)})

  .then(() => Recipe.insertMany(data))
  .then( (data) => 
  data.forEach((recepies)=>console.log(recepies.title)))

  .catch(()=>console.log("failed to insert"))

  .then(()=>{
  console.log("duration changed")
  
  return Recipe.findOneAndUpdate(
  {title: "Rigatoni alla Genovese"},
  {duration: 100},
  {new:true})})
 
  .catch(()=>console.log("failed to chage duration"))

  .then(()=> {
     console.log("deleted cake")
     return Recipe.deleteOne({title : "Carrot Cake"})
 })
  .catch(()=>console.log("failed to delete Cake"))

  .then(()=>{mongoose.connection.close()
  console.log("closed the mongoose")})
  .catch(()=>console.log("failed to close"))

