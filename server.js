const express =require ('express')
const app = express()
const port = 3000
const indexRoutes=require ('./router/index.js')
const connectDB=require('./config/db')


app.use(express.json())
app.use('/',indexRoutes)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))