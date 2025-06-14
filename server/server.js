import cors from 'cors';
import express from "express"
import mongoose from 'mongoose'
import dotenv from "dotenv"
dotenv.config()
import breedsRoute from "./routes/breedRoute.js"
import authRoute from "./routes/authRoute.js"
// import './config/passport.js'; // Import Passport config
// import authGoogleRoutes from './routes/authGoogleRoutes.js';
import passport from 'passport';



const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
// app.use(passport.initialize())

app.use(cors({
  origin: ["http://localhost:5173","http://localhost:5174", "http://localhost:3000"],
  credentials: true
}))

const start=async()=>{
  mongoose.connect('mongodb://localhost:27017/PawApp')
  .then(() => console.log("MongoDB connecté"))
.catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Serveur tournant sur http://localhost:${port}`);
});
}





start()

// Connecter MongoDB

//Users
app.use("/api/users", authRoute)


//Breeds
app.use("/breeds",breedsRoute)

//Auth Google
// app.use(authGoogleRoutes);




// Démarrer le serveur

