import { Schema, model, models } from "mongoose"

const cloudImgSchema = new Schema({
    url: {
        type: String,
        require: true,
    },
    imgName: {
        type: String,
        require: true,
    },
    projectName: {
        type: String,
        require: true,
    },
})

const CloudImage = models.cloudImage || model('cloudImage', cloudImgSchema)

export default CloudImage;