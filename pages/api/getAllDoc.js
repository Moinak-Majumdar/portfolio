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

    if (req.method === 'GET') {
        const type = req.query.type;

        if(!type) {
            return res.status(422).json({error:"Project type is missing !!"})
        }

        try{
            const projects = await Projects.find({type: type})
    
            if(projects) {
                return res.status(200).json(projects)
            } else {
                return res.status(404).json({error:'no projects to show'})
            }
        } catch(err) {
            return res.status(400).json({error: err})
        }   
    } else {
        return res.status(400).json({error : "Invalid requested method"})
    }

}