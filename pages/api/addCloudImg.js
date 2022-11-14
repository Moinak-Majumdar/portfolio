import connectMongo from '../../src/connectMongo'
import CloudImage from '../../schema/cloudImage'
import getDb from '../../src/getDb'

export default async function handler(req, res) {

    await connectMongo()
    const db = await getDb()

    const apiKey = req.query.apiKey

    if(!apiKey) {
        return res.status(420).json({badRequest: 'Api Key is missing !!'})
    }

    if(apiKey !== db){
        return res.status(420).json({badRequest: 'Invalid Api Key !!'})
    }

    if (req.method === 'POST') {
        const { projectName, imgName, url } = req.body;

        
        if(!projectName || !imgName || !url ) {
            return res.status(422).json({error: "all fields are required"})
        }

        try {
            const exist = await CloudImage.findOne({url: url})
        
            if(exist) {
                return res.status(500).json({error: "image already exist"})
            }

            const data = new CloudImage({ projectName, imgName, url })
            const newProject = await data.save()

            if(newProject) {
                return res.status(201).json({success: 'image uploaded successfully'})
            } else {
                return res.status(400).json({error: 'failed to add at mongo'})
            }
        }   
        catch(err) {
            return res.status(400).json({error: err})
        }    
    } else {
        return res.status(400).json({error : "Invalid requested method"})
    }

}