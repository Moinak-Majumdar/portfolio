import connectMongo from '@/database/functions/connectMongo'
import WebProjects from '@/database/schema/web_project';
import Photography from '@/database/schema/photography';
import verify from '@/database/functions/verify';
import { NextApiRequest, NextApiResponse } from 'next';
import FlutterProjects from '@/database/schema/flutter_project';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    function shuffle(array: any[]): any[] {
        let currentIndex = array.length, randomIndex: number;
        while (currentIndex > 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    if (req.method === 'POST') {

        await connectMongo()
        const dbKey = await verify();
        const apiKey = req.body.apiKey

        if (!apiKey) {
            return res.status(420).json({ badRequest: 'Api Key is missing !!' })
        }

        if (apiKey !== dbKey) {
            return res.status(420).json({ badRequest: 'Invalid Api Key !!' })
        }

        const { manager } = req.query;

        switch (manager) {
            case 'getAllWeb': {
                try {
                    const projects = await WebProjects.find()

                    if (projects) {
                        return res.status(200).json(projects)
                    } else {
                        return res.status(400).json({ error: 'no projects to show' })
                    }
                } catch (err) {
                    return res.status(400).json({ error: err })
                }

            } break;

            case 'getWeb': {
                const slug = req.body.slug

                if (!slug) {
                    return res.status(400).json({ error: "Project name is missing !!" })
                }

                try {
                    const project = await WebProjects.findOne({ "slug": slug })

                    if (project) {
                        return res.status(200).json(project)
                    } else {
                        return res.status(400).json({ error: 'Project not found !!' })
                    }
                } catch (err) {
                    return res.status(400).json({ error: err })
                }
            } break;

            case 'getAllFlutter': {
                try {
                    const flutter = await FlutterProjects.find();
                    if (flutter) {
                        return res.status(200).json(flutter);
                    }
                    return res.status(400).json({ error: 'Flutter projects are currently unavailable.' });
                } catch (error) {
                    return res.status(400).json({ error });
                }
            } break;

            case 'getFlutter': {
                const slug = req.body.slug

                if (!slug) {
                    return res.status(400).json({ error: "slug is missing !!" })
                }

                try {
                    const project = await FlutterProjects.findOne({ "slug": slug })

                    if (project) {
                        return res.status(200).json(project)
                    } else {
                        return res.status(400).json({ error: 'Project not found !!' })
                    }
                } catch (err) {
                    return res.status(400).json({ error: err })
                }
            } break;

            case 'getAllPhotography': {

                try {
                    const photography = await Photography.find();

                    if (photography) {
                        return res.status(200).json(shuffle(photography));
                    } else {
                        return res.status(400).json({ error: 'no photography to show' })
                    }
                } catch (err) {
                    return res.status(400).json({ error: err })
                }
            } break;

            default:
                return res.status(400).json({ error: 'Invalid request params.' })
                break;
        }

    } else {
        return res.status(400).json({ error: "Invalid requested method!" })
    }

}