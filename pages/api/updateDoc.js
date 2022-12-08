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
        const { id, name, type, status, intro, role, liveUrl, gitRepo, slug, description, img, tools, toolsLogo } = req.body;

        if(!id || !name || !type || !status || !intro || !role || !liveUrl || !gitRepo || !slug || !description || !img || !tools || !toolsLogo) {
            return res.status(422).json({error: "all fields are required"})
        }

        try {
            const exist = await Projects.findOne({"_id": id})
        
            if(exist) {
                const query = {"_id" : id}
                const update = { "$set" : { "name":name, "type":type, "status":status, "role":role, "intro":intro, "liveUrl":liveUrl, "gitRepo":gitRepo, "slug":slug, "description":description, "img":img, "tools":tools, "toolsLogo":toolsLogo }}
                const options = { "upsert": false };

                Projects.updateOne(query, update, options).then(result => {
                    const { matchedCount, modifiedCount } = result;
                    if(matchedCount && modifiedCount) {
                        return res.status(200).json({success: 'project updated successfully'})
                    }
                }).catch(err => {
                    return res.status(400).json({error : err})
                })

            } else {
                return res.status(404).json({error: "project not found"})
            }

        } catch(err) {
            return res.status(400).json({error: err})
        }    
    } else {
        return res.status(400).json({"error" : "Invalid requested method"})
    }

}