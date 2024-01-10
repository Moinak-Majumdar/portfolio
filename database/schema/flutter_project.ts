import { Schema, model, models } from "mongoose"

const flutterProjectSchema = new Schema({
    name: {
        type :String,
        require: true,
        unique : true,
    },
    intro: {
        type: String,
        require: true,
    },
    gitRepo: {
        type :String,
        require: true
    },
    release: {
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
    cover : {
        type: String,
        require: true
    },
    img: {
        type :Array,
        require: true
    },
    status: {
        type: String, 
        require: true,
    },
    libraries: {
        type: Array,
        require: true
    },
    badge: {
        type: Array,
        require: true,
    }
});

const FlutterProjects= models.FlutterProjects || model('FlutterProjects', flutterProjectSchema);

export default FlutterProjects;