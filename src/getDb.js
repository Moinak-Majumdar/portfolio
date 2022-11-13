import { doc, getDoc } from 'firebase/firestore'
import { db } from './Firebase'

async function getDb () {
    try {
        const docRef = doc(db, "admin", process.env.NEXT_PUBLIC_DB_SECRET);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            return data.apiKey
        } else {
            return("No such document!");
        }
    } catch(err) {
        console.log(err);
    }
}

export default getDb