const express = require('express')
const db = require('.\\db')
const fileUpload = require('express-fileupload')

const router = require('.\\router')

const PORT = 5000

const app = express()

app.use(express.json())
app.use(fileUpload({}))
app.use('/api', router)

async function startApp() {
    try {
        app.listen(PORT, () => console.log(`Server is started on ${PORT}`))
    } catch (e){
        console.log(e)
    }
}

startApp()


