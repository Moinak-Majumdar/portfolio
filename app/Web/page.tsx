import { ServerData } from "../utils/ServerData";
import { webProjectModel } from "../utils/models";
import { MainSection } from "./components/Main"

async function getWebProjects() {
    const data =new ServerData('getAllWeb');
  
    const res = await data.get();
  
    if (!res.ok) {
        throw new Error("Failed to fetch web project data.");
    }
  
    return [...await res.json()];
  }
  

const page = async () => {

   const webProjects: webProjectModel[] =  await getWebProjects();

    return (
        <MainSection data={webProjects} />
    )
}

export default page

