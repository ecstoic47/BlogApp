const express = require ('express');
const dotenv = require ('dotenv');
const bodyParser = require ('body-parser');
const mongoose = require ('mongoose');
const authRoute = require('./routes/auth');
const usersRoute = require('./routes/users');
const postsRoute = require('./routes/posts');
const categoriesRoute = require('./routes/categories');
const multer = require ('multer');
const path = require("path");

dotenv.config();
const app = express();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

///For API call from Front End

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});


///Database Connection


///Local DB


// mongoose.connect("mongodb://localhost:27017/blogAppDB", {

//   useUnifiedTopology: true,

//   useNewUrlParser: true,

//   useCreateIndex: true
 
// })
// .then(console.log("Assalamualaikum Boss, your app is connected to MongoDB"))
// .catch(err => console.log(err)); 


///MongoDB Cloud


mongoose.connect(process.env.MONGO_URL, {

  useUnifiedTopology: true,

  useNewUrlParser: true,

  useCreateIndex: true,
  
  useFindAndModify: false

})
  .then(console.log("Assalamualaikum Boss, your app is connected to MongoDB"))
  .catch(err => console.log(err));

  ///For uploading image from here

const storage = multer.diskStorage({
  destination:(req, file, cb) =>{
    cb(null,"images");
  }, filename: (req,file,cb)=>{
    cb(null,req.body.name);
  }
});

const upload = multer ({storage:storage});

app.post("/api/upload", upload.single("file"), (req, res) =>{
  res.status(200).json("Image has been uploaded");
});

///API Routes


app.use("/api/auth", authRoute);
app.use("/api/users",usersRoute);
app.use("/api/posts",postsRoute);
app.use("/api/categories",categoriesRoute);


///Port 

app.listen(process.env.PORT || 5000, function(){
    console.log("This sever is running on port 5000");
}); 