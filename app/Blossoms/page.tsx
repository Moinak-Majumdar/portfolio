import { Metadata } from "next";
import DevFlag from "@/app/components/others/DevFlag";
import Details from "./components/Details";
import Bg from "./components/Bg";
import { photographyModel } from "@/app/utils/models";
import { ServerData } from "../utils/ServerData";

async function fetchBlossoms() {
    const data = new ServerData('getAllPhotography');

    const res = await data.get();

    if (!res.ok) {
        throw new Error('Failed to fetch hobby data.');
    }

    return await res.json();
}

export default async function Blossoms() {

    
    const photo: photographyModel[] = await fetchBlossoms();

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
        openGraph: {
            type: 'website',
            title: `Moinak Majumdar | Blossoms`,
            description: 'Some memories from my roof top garden.',
            images: 'https://avatars.githubusercontent.com/u/99950805?v=4',
        }
    }
}