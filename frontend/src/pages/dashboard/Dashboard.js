import React, { useState, useEffect,useRef } from 'react';
import { getAllUsers, checkPermission,getById } from '../../api/services/user/user.api';
import { getAllTickets } from '../../api/services/ticket/ticket.api';
import {getAllTicketItems} from '../../api/services/ticketItem/ticketItem.api';
import {getAllRoles} from '../../api/services/role/role.api';
import {getAllPermissions} from '../../api/services/permission/permission.api';
import Cookies from 'js-cookie';
import { Pie,Bar } from 'react-chartjs-2';
import ApexCharts from 'apexcharts';
import { Chart, ArcElement,CategoryScale,LinearScale,BarElement } from 'chart.js';
Chart.register(ArcElement);
Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(BarElement);
const Dashboard = () => {
    
    const [isLoading, setIsLoading] = useState(true);
	const userId= Cookies.get('userId');
    const [users, setUsers] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [ticketItems, setTicketItems] = useState([]);
    const [roles, setRoles] = useState([]);
    const [permissions, setPermissions] = useState([]);

    ;
    const [usersPermission, setUsersPermission] = useState(false);
    const [ticketsPermission, setTicketsPermission] = useState(false);
    const [rolesPermission, setRolesPermission] = useState(false);
    const [permissionsPermission, setPermissionsPermission] = useState(false);
    const [ticketItemsPermission, setTicketItemsPermission] = useState(false);
	
	useEffect(() => {
		const checkAndSetPermission = async () => {
            const UsersPermission = await checkPermission('users-getAll');
            const RolesPermission = await checkPermission('roles-getAll');
            const TicketItemPermission = await checkPermission('ticketItem-getAll');
            const PermissionsPermission = await checkPermission('permissions-getAll');
            const TicketsPermission = await checkPermission('tickets-getAll');
      
            setUsersPermission(UsersPermission);
            setRolesPermission(RolesPermission) ;
            setTicketItemsPermission(TicketItemPermission);
            setPermissionsPermission(PermissionsPermission);
            setTicketsPermission(TicketsPermission);
        };
        checkAndSetPermission();
    }, []);
        useEffect(() => {
        console.log(usersPermission);
        const fetchUsers = async () => {
            try {
                const userEmail = Cookies.get('userEmail');
                console.log('User email:', userEmail);
                const fetchedUsers = await getAllUsers(userEmail);
                console.log('Users:', fetchedUsers);
                setUsers(fetchedUsers);
                setIsLoading(false); // Set loading to false once data is fetched
            } catch (error) {
                console.error('Error fetching users:', error);
                setIsLoading(false); // Also set loading to false in case of error
            }
        };
        const fetchPermissions = async () => {
            try {
                const userEmail = Cookies.get('userEmail');
                console.log('User email:', userEmail);
                const fetchedPermissions = await getAllPermissions(userEmail);
                console.log('Permissions:', fetchedPermissions);
                setPermissions(fetchedPermissions);
                setIsLoading(false); // Set loading to false once data is fetched
            } catch (error) {
                console.error('Error fetching permissions:', error);
                setIsLoading(false); 
            }
        };
        const fetchRoles = async () => {
            try {
                const userEmail = Cookies.get('userEmail');
                console.log('User email:', userEmail);
                const fetchedRoles = await getAllRoles(userEmail);
                console.log('Roles:', fetchedRoles);
                setRoles(fetchedRoles);
                setIsLoading(false); // Set loading to false once data is fetched
            } catch (error) {
                console.error('Error fetching roles:', error);
                setIsLoading(false); // Also set loading to false in case of error
            }
        };
        const fetchTicketItems = async () => {
            try {
                const userEmail = Cookies.get('userEmail');
                console.log('User email:', userEmail);
                const fetchedTicketItems = await getAllTicketItems(userEmail);
                console.log('TicketItems:', fetchedTicketItems);
                setTicketItems(fetchedTicketItems);
                setIsLoading(false); // Set loading to false once data is fetched
            } catch (error) {
                console.error('Error fetching TicketItems:', error);
                setIsLoading(false); // Also set loading to false in case of error
            }
        };
        const fetchTickets = async () => {
            try {
            const fetchedTickets = await getAllTickets(); 
            console.log('Tickets:', fetchedTickets);
            setTickets(fetchedTickets);
            setIsLoading(false);
            } catch (error) {
                console.error('Error fetching tickets:', error);
                setIsLoading(false);
            }
        };
    if(ticketsPermission){
        fetchTickets();
        console.log("fetching tickets");
    }
    if(ticketItemsPermission){
        fetchTicketItems();
        console.log("fetching ticket items");
    }
    if(rolesPermission){
        fetchRoles();
        console.log("fetching roles");
    }
    if(permissionsPermission){
        fetchPermissions();
        console.log("fetching permissions");
    }
    if(usersPermission){
        fetchUsers();
        console.log("fetching users");
    }
    }, [usersPermission, rolesPermission, ticketItemsPermission, permissionsPermission, ticketsPermission]);	
   
   
    if (isLoading) {
        return <p>Loading...</p>; // Render a loading message while data is being fetched
    }

    // Table for roles
    const RolesTable = ({ roles }) => (
        <table className='pb-10' >
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {roles.map(role => (
                    <tr key={role.id}>
                        <td>{role.id}</td>
                        <td>{role.name}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    // Bar chart for ticket items
    const BarChart = ({ tickets }) => {
        console.log(tickets);
        const itemCounts = tickets.reduce((acc, ticket) => {
          
                acc[ticket.TicketItemId] = (acc[ticket.TicketItemId] || 0) + 1;
            
            return acc;
        }, {});

        const data = {
            labels: Object.keys(itemCounts),
            datasets: [
                {
                    label: 'Ticket Items',
                    data: Object.values(itemCounts),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
            ],
        };

        return <Bar data={data} />;
    };

    // Column chart for tickets created each day
    const ColumnChart = ({ tickets }) => {
        const ticketCounts = tickets.reduce((acc, ticket) => {
            const date = new Date(ticket.createdAt).toDateString();
            acc[date] = (acc[date] || 0) + 1;
            return acc;
        }, {});

        const data = {
            labels: Object.keys(ticketCounts),
            datasets: [
                {
                    label: 'Tickets Created',
                    data: Object.values(ticketCounts),
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                },
            ],
        };

        return <Bar data={data} />;
    };


    const PieChart = ({ users }) => {
        const chartRef = useRef(null);
       
        useEffect(() => {
           // Calculate role distribution
           const roleCounts = users.reduce((acc, user) => {
             acc[user.RoleId] = (acc[user.RoleId] || 0) + 1;
             return acc;
           }, {});
       
           const chartConfig = {
             series: Object.values(roleCounts),
             chart: {
               type: "pie",
               width: 280,
               height: 280,
               toolbar: {
                 show: false,
               },
             },
             title: {
               show: "",
             },
             dataLabels: {
               enabled: false,
             },
             colors: ['#FF6384', '#36A2EB', '#FFCE56', '#20c997'],
             legend: {
               show: false,
             },
             labels: ['Client','Agent','Admin','Super Admin'],
           };
       
           const chart = new ApexCharts(chartRef.current, chartConfig);
           chart.render();
       
           // Cleanup function to destroy the chart instance when the component unmounts
           return () => {
             chart.destroy();
           };
        }, [users]); // Re-run the effect when the users data changes
       
        return <div id="pie-chart" ref={chartRef}></div>;
       };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="flex flex-col justify-center min-h-screen">
            <div className="bg-white p-5 rounded-md w-full ">
                <div className="flex items-center justify-between pb-6">
                    {/* Display total counts in boxes with icons and custom styling */}
                    <div className="flex items-center space-x-2">
                        <i className="fas fa-users text-blue-500"></i>
                        <div className="bg-gray-100 rounded-lg px-8 py-8">
                            <p className="text-blue-500">Total Users: {users.length}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <i className="fas fa-user-tag text-green-500"></i>
                        <div className="bg-gray-100 rounded-lg px-10 py-10">
                            <p className="text-green-500">Total Roles: {roles.length}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <i className="fas fa-key text-yellow-500"></i>
                        <div className="bg-gray-100 rounded-lg px-10 py-10">
                            <p className="text-yellow-500">Total Permissions: {permissions.length}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <i className="fas fa-ticket-alt text-red-500"></i>
                        <div className="bg-gray-100 rounded-lg px-10 py-10">
                            <p className="text-red-500">Total Tickets: {tickets.length}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <i className="fas fa-list text-purple-500"></i>
                        <div className="bg-gray-100 rounded-lg px-10 py-10">
                            <p className="text-purple-500">Total Ticket Items: {ticketItems.length}</p>
                        </div>
                    </div>
                </div>
                <div className='w-full max-w-2xl mx-auto'>
                    {/* Display charts with explanatory sentences */}
                 
                    <p>This bar chart illustrates the distribution of ticket items across the system:</p>
                    <BarChart tickets={tickets} />
                    <p>The column chart below shows the number of tickets created each day:</p>
                    <ColumnChart tickets={tickets} />
                    <p>The pie chart below represents the distribution of users across different roles:</p>
                    <PieChart users={users} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;