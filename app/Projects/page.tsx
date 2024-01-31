import DevFlag from "@/app/components/others/DevFlag";
import Web from "./components/Web";
import Flutter from "./components/Flutter";
import Bg from "./components/Bg";
import { Metadata } from "next";

type T_Web = { _id: string, name: string, type: string, role: string, intro: string, liveUrl: string, gitRepo: string, slug: string, description: string, img: string[], tools: string[], toolsLogo: string[], __v: number, status: string, cover: string };
type T_Flutter = { _id: string, __v: number, name: string, intro: string, gitRepo: string, slug: string, description: string, release: string, cover: string, img: string[], status: string, badge: string[], libraries: string[] }
type data = { web: T_Web[], flutter: T_Flutter[] }

async function fetchData(): Promise<data> {
    const webUri = process.env.NEXT_PUBLIC_TEST_DB ? `${process.env.NEXT_PUBLIC_SERVER}/getAllWeb?testDb=${process.env.NEXT_PUBLIC_TEST_DB}` : `${process.env.NEXT_PUBLIC_SERVER}/getAllWeb`;
    const web = await fetch(webUri, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey: process.env.NEXT_PUBLIC_DB_KEY }),
        next: { revalidate: 3600 }
    });
    
    const flutterUri = process.env.NEXT_PUBLIC_TEST_DB ? `${process.env.NEXT_PUBLIC_SERVER}/getAllFlutter?testDb=${process.env.NEXT_PUBLIC_TEST_DB}` : `${process.env.NEXT_PUBLIC_SERVER}/getAllFlutter`;
    const flutter = await fetch(flutterUri, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey: process.env.NEXT_PUBLIC_DB_KEY }),
        next: { revalidate: 3600 }
    });

    if (!web.ok) {
        throw new Error("Failed to fetch web project data.");
    }

    if (!flutter.ok) {
        throw new Error('Failed to fetch flutter project data.');
    }

    const data: data = {
        web: await web.json(),
        flutter: await flutter.json(),
    }

    return data;
}

export default async function Projects() {

    const data = await fetchData();

    return (
        <>
            <DevFlag />
            <main className='flex flex-col dark:text-gray-300 text-gray-800'>
                <Web web={data.web} />
                <Flutter flutter={data.flutter} />
                <Bg />
            </main>
        </>
    )
}

export async function generateMetadata(): Promise<Metadata> {


    return {
        title: `Moinak Majumdar | Projects`,
        description: 'Explore a showcase of innovative web and Flutter projects on this page. Immerse yourself in cutting-edge technologies and seamless user experiences crafted by Moinak Majumdar. From dynamic web applications to responsive Flutter mobile apps, discover the future of digital solutions',
        authors: [{ name: 'Moinak Majumdar', url: 'https://www.linkedin.com/in/moinak-majumdar' }],
        keywords: ['Web Development', 'Flutter Projects', 'Responsive Design', 'Mobile App Development', 'Innovative Technology', 'User Experience (UX)', 'Front-end Development', 'Full-stack Development', 'Web Applications', 'Flutter Apps', 'UI/UX Design', 'Cross-Platform Development', 'Interactive Interfaces', 'Digital Innovation',],
        openGraph: {
            type: 'website',
            title: `Moinak Majumdar | Projects`,
            description: 'Explore a showcase of innovative web and Flutter projects on this page. Immerse yourself in cutting-edge technologies and seamless user experiences crafted by Moinak Majumdar. From dynamic web applications to responsive Flutter mobile apps, discover the future of digital solutions',
            images: 'https://avatars.githubusercontent.com/u/99950805?v=4',
        }
    }
}