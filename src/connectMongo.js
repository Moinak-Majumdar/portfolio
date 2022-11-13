import mongoose from 'mongoose'

const uri = process.env.NEXT_PUBLIC_MONGOOSE_URI

async function connectMongo () {
    
    mongoose.connect(uri).then(() => {
        console.log('connection OK')
    }).catch((error) => {
        console.log(error)
    })
}

export default connectMongo