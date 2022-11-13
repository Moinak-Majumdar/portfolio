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

    if (req.method === 'DELETE') {
        const url = req.body.url;
    
        if(!url) {
            return res.status(400).json({error: 'absolute cloud is required'})
        }
        
        const exist = await CloudImage.findOne({"url": url})

        if(exist) {
            try {
                const promise = await CloudImage.deleteOne({"url" : url})
                if(promise) {
                    return res.status(200).json({success: "image deleted successfully"})
                } else {
                    return res.status(400).json({error: "Failed to delete"})
                }
            } catch (err) {
                return res.status(400).json({error: err})
            }

        } else {
            return res.status(400).json({error: "image not found"})
        }
    } else {
        return res.status(400).json({error : "Invalid requested method"})
    }

}