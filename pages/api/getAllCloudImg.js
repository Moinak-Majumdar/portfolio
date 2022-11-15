import connectMongo from '../../src/connectMongo'
import CloudImage from '../../schema/cloudImage'
import getDb from '../../src/getDb'

export default async function handler(req, res) {

    await connectMongo()
    const db = await getDb()

    const apiKey = req.query.apiKey

    if (!apiKey) {
        return res.status(420).json({ badRequest: 'Api Key is missing !!' })
    }

    if (apiKey !== db) {
        return res.status(420).json({ badRequest: 'Invalid Api Key !!' })
    }

    if (req.method === 'GET') {
        try {
            const images = await CloudImage.find().sort({ projectName: 1 })
            const pn = images.map((curr) => {
                return curr.projectName
            })
            const projectNames = [... new Set(pn)]
            let db = [];
            let projectNameVar = null;
            let j = -1
            for (let i = 0; i < images.length; i++) {
                const curr = images[i]
                if (curr.projectName === projectNameVar) {
                    db[j].push(curr)
                } else {
                    projectNameVar = curr.projectName;
                    j = j + 1;
                    if (db.length < 1) {
                        db.push([curr])
                    } else {
                        db = [...db, [curr]]
                    }
                }
            }
            const result = { allProjects : projectNames}
            for (let i = 0; i < projectNames.length; i++) {
                result[projectNames[i]] = db[i]
            }
            if (db.length > 0) {
                return res.status(200).json(result)
            } else {
                return res.status(500).json({ error: 'no images to show' })
            }
        } catch (err) {
            console.log(err)
            return res.status(400).json({ error: err })
        }
    } else {
        return res.status(400).json({ error: "Invalid requested method" })
    }

}