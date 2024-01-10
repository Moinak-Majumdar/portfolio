import mongoose from 'mongoose'

const uri : string = process.env.NEXT_PUBLIC_MONGOOSE_PORTFOLIO!

async function connectMongo () {
    mongoose.connect(uri).then(() => {
        console.log('Connection OK!')
    }).catch(err => console.log(err));
}


export default connectMongo