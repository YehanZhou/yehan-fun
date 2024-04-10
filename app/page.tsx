import {getData} from "@/actions/todoActions";
// import AddTodo from "@/components/AddTodo";
import Todos from "@/components/Todos";
export default async function Home() {
  const data = await getData();
  return <Todos todos={data} />;
}