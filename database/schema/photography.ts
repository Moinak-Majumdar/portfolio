import { Schema, model, models } from "mongoose"

const photographySchema = new Schema({
    url: {
        type: String,
        require: true,
    }
})

const Photography = models.photography || model('photography', photographySchema)

export default Photography;