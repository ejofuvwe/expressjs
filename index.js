
const express = require ('express');
const app = express();
const userRoute = require('./routes/user')

app.use(express.json());
app.use(express.urlencoded({extended:true}));


// app.use('/api/product', require('./routes/api/product') )



const PORT = 3000;


app.use('/user', userRoute)
   


app.listen(PORT, ()=>{
    console.log(`server starting on port http://127.0.0.1:${PORT}`);
});