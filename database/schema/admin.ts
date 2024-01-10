import { Schema, model, models } from "mongoose";

const adminSchema = new Schema({
    apiKey : {
        type: String,
        require: true
    }
});

const Admin = models.admin || model('admin', adminSchema)

export default Admin