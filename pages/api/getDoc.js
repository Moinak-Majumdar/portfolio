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

    if (req.method === 'POST') {
        const name = req.body.name

        if(!name) {
            return res.status(422).json({error:"Project name is missing !!"})
        }

        try{
            const project = await Projects.findOne({"name": name})

            if(project) {
                return res.status(200).json(project)
            } else {
                res.status(404).json({error: 'Project not found !!'})
            }
        } catch(err) {
            res.status(400).json({error: err})
        }   

    } else {
        res.status(400).json({error : "Invalid requested method"})
    }

}