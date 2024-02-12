import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import Mainbar from "@/components/mainbar";

const Dashboard = () => {
  return (
    <div className="flex flex-col h-full relative">
      <Navbar/>

      <div className="flex  relative flex-row h-full">
        <Sidebar/>
        <Mainbar />
      </div>
    </div>
  );
};

export default Dashboard;
