import { Schema, model, models } from "mongoose"

const projectSchema = new Schema({
    name: {
        type :String,
        require: true
    },
    type: {
        type: String,
        require: true,
    },
    status: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        require: true,
    },
    intro: {
        type: String,
        require: true,
    },
    liveUrl: {
        type :String,
        require: true
    },
    gitRepo: {
        type :String,
        require: true
    },
    slug: {
        type :String,
        require: true
    },
    description: {
        type :String,
        require: true
    },
    img: {
        type :Array,
        require: true
    },
    tools:{
        type: Array,
        require: true
    },
    toolsLogo: {
        type: Array,
        require: true
    },
    
})

const Projects =  models.Projects || model('Projects', projectSchema)


export default Projects
