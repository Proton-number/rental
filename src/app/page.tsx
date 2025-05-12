import Featured from "@/components/Featured";
import Hero from "@/components/Hero";
import Reason from "@/components/Reason";
import Started from "@/components/Started";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col ">
      <div className=" p-4">
        <Hero />
        <Reason />
        <Featured />
        <Started />
      </div>
    </div>
  );
}
