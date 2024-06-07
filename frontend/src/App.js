import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/layouts/Sidebar";
import Navbar from "./components/layouts/Navbar";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import About from "./pages/About";
//import Footer from "./components/layouts/Footer";
import Home from "./pages/Home";
import UsersList from "./pages/users/UsersList";
import EditUser from "./pages/users/EditUser";
import DeleteUser from "./pages/users/DeleteUser";
import Settings from "./pages/users/Settings";
import History from "./pages/History";
import TicketsList from "./pages/tickets/TicketsList";
import CreateTicket from "./pages/tickets/CreateTicket";
import RolesList from "./pages/roles/RolesList";
import CreateRole from "./pages/roles/CreateRole";
import DeleteRole from "./pages/roles/DeleteRole";
import EditRole from "./pages/roles/EditRole";
import PermissionsList from "./pages/permissions/PermissionsList";
import CreatePermission from "./pages/permissions/CreatePermission";
import EditPermission from "./pages/permissions/EditPermission";
import DeletePermission from "./pages/permissions/DeletePermission";
import Chat from "./pages/chat/Chat";
import TicketItemList from "./pages/ticketItems/TicketItemList";
import CreateTicketItem from "./pages/ticketItems/CreateTicketItem";
import DeleteTicketItem from "./pages/ticketItems/DeleteTicketItem";
import EditTicketItem from "./pages/ticketItems/EditTicketItem";
import DeleteTicket from "./pages/tickets/DeleteTicket";
import EditTicket from "./pages/tickets/EditTicket";
import Chatbot from "./pages/chatbot/Chatbot";
import CreateUser from "./pages/users/CreateUser";
import AgentsList from "./pages/users/AgentsList";
import WebMastersList from "./pages/users/WebMastersList";
import AdminsList from "./pages/users/AdminsList";
import ClientsList from "./pages/users/ClientsList";
import Dashboard from "./pages/dashboard/Dashboard";
import io from 'socket.io-client';
import Cookies from "js-cookie";
const socket = io('http://localhost:5000');
//const isLoggedIn = sessionStorage.getItem("token")!==null;
function App() {
 const userId= Cookies.get('userId');
  return (
<div className="flex">
  
      <Router>
       {userId &&  <Sidebar />}
       
        <div className="flex-1"> 
        {userId && <Navbar />}
        <div className="flex-1 p-6">
          <Routes>
          <Route path="/Chat/:id" element={<Chat  socket={socket} />} />
          <Route path="/PermissionsList" element={<PermissionsList />} />
          <Route path="/CreateUser" element={<CreateUser />} />
          <Route path="/Chatbot" element={<Chatbot />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/DeleteTicket/:id" element={<DeleteTicket />} />
          <Route path="/AgentsList" element={<AgentsList />} />
          <Route path="/AdminsList" element={<AdminsList />} />
          <Route path="/ClientsList" element={<ClientsList />} />
          <Route path="/WebMastersList" element={<WebMastersList />} />
          <Route path="/CreatePermission" element={<CreatePermission />} />
          <Route path="/EditPermission/:id" element={<EditPermission />} />
          <Route path="/EditTicketItem/:id" element={<EditTicketItem />} />
          <Route path="/DeleteTicketItem/:id" element={<DeleteTicketItem />} />
          <Route path="/EditTicket/:id" element={<EditTicket />} />
          <Route path="/DeletePermission/:id" element={<DeletePermission />} />
          <Route path="/CreateRole" element={<CreateRole />} />
          <Route path="/TicketItemList" element={<TicketItemList />} />
          <Route path="/Settings" element={<Settings />} />
          <Route path="/CreateTicketItem" element={<CreateTicketItem />} />
          <Route path="/DeleteRole/:id" element={<DeleteRole />} />
          <Route path="/CreateTicket" element={<CreateTicket />} />
          <Route path="/RolesList" element={<RolesList />} />
          <Route path="/EditRole/:id" element={<EditRole />} />
            <Route path="/" element={<Login />} />
            <Route path="/EditUser/:id" element={<EditUser />} />
            <Route path="/DeleteUser/:id" element={<DeleteUser />} />
            <Route path="/history" element={<History />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<Register />} />
            <Route path="/TicketsList" element={<TicketsList />} />
            <Route path="/UsersList" element={<UsersList />} />
            
          </Routes>
        </div>
        </div>
      </Router>
    </div>
  );
}

export default App;