import { Metadata } from "next";
import DevFlag from "@/app/components/others/DevFlag";
import Details from "./components/Details";
import Bg from "./components/Bg";
import { photographyModel } from "@/app/utils/models";
import { ServerData } from "../utils/ServerData";

function shuffle(array: photographyModel[]) {
    let currentIndex = array.length;
  
    while (currentIndex != 0) {

      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

async function fetchBlossoms() {
    const data = new ServerData({ path: 'getAllPhotography' });

    const res = await data.get();

    if (!res.ok) {
        throw new Error('Failed to fetch hobby data.');
    }

    return await res.json();
}

export default async function Blossoms() {


    const photo: photographyModel[] = shuffle(await fetchBlossoms());

    return (
        <>
            <DevFlag />
            <main className='relative overflow-hidden'>
                <div className='myContainer py-[5rem] dark:text-gray-300 text-gray-800'>
                    <Details photo={photo} />
                </div>
                <Bg />
            </main>
        </>
    )
}


export async function generateMetadata(): Promise<Metadata> {

    return {
        title: `Moinak Majumdar | Blossoms`,
        description: 'Some memories from my roof top garden.',
        authors: [{ name: 'Moinak Majumdar', url: 'https://www.linkedin.com/in/moinak-majumdar' }],
        keywords: ['photography', 'mobile photography', 'gardening', 'flowers'],
        creator: "Moinak Majumdar",
        publisher: "Vercel",
        metadataBase: new URL('https://moinak05.vercel.app/'),
        openGraph: {
            type: 'website',
            title: `Moinak Majumdar | Blossoms`,
            description: 'Some memories from my roof top garden.',
            images: 'https://avatars.githubusercontent.com/u/99950805?v=4',
        }
    }
}