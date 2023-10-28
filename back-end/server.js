//Dependencies
const app = require("./app")


//configurations

require("dotenv").config();

const PORT = process.env.PORT;

//LISTEN
app.listen(PORT, ()=>{
    console.log(`We bookin on port ${PORT}`)
});
