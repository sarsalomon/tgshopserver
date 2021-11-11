require('dotenv').config()
const mongoose     = require('mongoose')
const express      = require('express')
const cors         = require('cors')
const router       = require('./routes/index')
const telegrambot  = require('./bot/tg')
const fileUpload = require('express-fileupload')
const path = require('path')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const PORT        =  process.env.PORT || 4000
const mongooseUri = process.env.MONGOOSE_URL

const app = express();
app.use(cors())
app.use(express.json())
app.use('/api',express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api',router)

app.use(errorHandler)

app.get('/',(req,res)=>{
    res.status(200).json({message: 'Working'})
})

const start = async() =>{
    try{
        await mongoose.connect(`${mongooseUri}`,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`))
    }catch(e){
        console.log(e)
    }
}
start()