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

    if (req.method === 'POST') {
        const { url } = req.body;

        
        if(!url) {
            return res.status(422).json({error: "all fields are required"})
        }

        try {
            const exist = await Photography.findOne({url: url})
        
            if(exist) {
                return res.status(500).json({error: "photography already exist"})
            }

            const data = new Photography({ url })
            const newPhotography = await data.save()

            if(newPhotography) {
                return res.status(201).json({success: 'photography added successfully'})
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