import * as dotenv from "dotenv";
import cors from "cors";
import express from "express";
//const bodyParser = require('body-parser');
import { connectToDatabase } from "./database";
import { employeeRouter } from "./employee.routes";
dotenv.config();

const  URI  = "mongodb+srv://aman123:aman123@employee.kt2xpdz.mongodb.net/?retryWrites=true&w=majority";
//const  {URI}  = process.env;
 
if (!URI) {
   console.error("No URI environment variable has been defined in config.env");
   process.exit(1);
}
 
connectToDatabase(URI)
   .then(() => {
       const app = express();
       app.use(cors());
       app.options('*', cors());
       app.use("/employees", employeeRouter);
      
       // start the Express server
       app.listen(8000, () => {
           console.log(`Server running at http://localhost:8000🚀`);
       });
 
   })
   .catch(error => console.error(error));