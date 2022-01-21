import Sidebar from "../components/Sidebar";

const Layout=({ children })=>{
return (
    <div className="grid grid-cols-12 gap-6 lg:px-48 my-14 px-48">
        <div className="p-4 text-center lg:col-span-3 bg-white rounded-2xl col-span-12">
           <Sidebar/>
        </div>
        <div className="lg:col-span-9 bg-white rounded-2xl col-span-12">
            {children}
        </div>
    </div>
)
}

export default Layout;