import Image from "next/image";
import Loading from "./loading";
import Hero from "@/Components/DashboardComponent/Hero";



export default function Home() {
  return (
    <main className="min-h-screen p-24">
      <Loading/>
      <Hero/>
    </main>
  );
}
