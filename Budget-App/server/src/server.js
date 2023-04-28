const app = require('./app');

PORT = process.env.port || 5151;

app.listen(PORT, ()=>{
    console.log("server running on port", PORT)
})