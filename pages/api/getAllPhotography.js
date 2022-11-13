import connectMongo from '../../src/connectMongo'
import Photography from '../../schema/photography'
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
            const photography = await Photography.find()
    
            if(photography) {
                return res.status(200).json(photography)
            } else {
                return res.status(404).json({error:'no photography to show'})
            }
        } catch(err) {
            return res.status(400).json({error: err})
        }   
    } else {
        return res.status(400).json({error : "Invalid requested method"})
    }

}