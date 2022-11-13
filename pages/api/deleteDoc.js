import connectMongo from '../../src/connectMongo'
import Projects from '../../schema/project'
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
        const name = req.body.name;
    
        if(!name) {
            return res.status(500).json({error: 'Project Name is required'})
        }
        
        const exist = await Projects.findOne({"name": name})

        if(exist) {
            try {
                const promise = await Projects.deleteOne({"name" : name})
                if(promise) {
                    return res.status(200).json({success: "Project deleted successfully"})
                } else {
                    return res.status(500).json({error: "Failed to delete"})
                }
            } catch (err) {
                return res.status(400).json({error: err})
            }

        } else {
            return res.status(404).json({error: "Project not found"})
        }
    } else {
        return res.status(400).json({error : "Invalid requested method"})
    }

}