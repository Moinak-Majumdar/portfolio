import Admin from "../schema/admin";

async function verify(): Promise<string> {

    type responseType = { _id: string, apiKey: string, secret: string, __v: number } | null;

    try {
        const data: responseType = await Admin.findOne({ secret: process.env.NEXT_PUBLIC_DB_SECRET });
        if (data != null) {
            return data.apiKey;
        }
    } catch (error) {
        console.log(error)
    }
    return '';
}

export default verify;