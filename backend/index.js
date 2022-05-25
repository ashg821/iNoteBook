const connectToMongo=require('./db');
const express = require('express')
const app = express()
const port = 5000

connectToMongo();
//express.json() is a middleware function that deals with json formatted responses
app.use(express.json());

//endpoints that are created using routers 
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`iNotebook backend is listening on port ${port}`)
})