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

    if (req.method === 'GET') {
        try{
            const images = await CloudImage.find()
    
            if(images.length > 0) {
                return res.status(200).json(images)
            } else {
                return res.status(500).json({error:'no images to show'})
            }
        } catch(err) {
            return res.status(400).json({error: err})
        }   
    } else {
        return res.status(400).json({error : "Invalid requested method"})
    }

}