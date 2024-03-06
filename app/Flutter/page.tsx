import { ServerData } from "../utils/ServerData";
import { flutterProjectModel } from "../utils/models";
import MainSection from "./components/Main";

async function getFlutterProjects() {
  const data = new ServerData('getAllFlutter');

  const res = await data.get();

  if(!res.ok) {
      throw new Error('Failed to fetch flutter project data.');
  }

  return [...await res.json()];
}

const page = async () => {

  const flutterProjects:flutterProjectModel[] = await getFlutterProjects();  

  return (
    <MainSection data={flutterProjects} />
  )
}

export default page