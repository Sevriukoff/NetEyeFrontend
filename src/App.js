import RepairRequestsPage from "./Pages/RepairRequestsPage"
import RegistrationPage from "./Pages/RegistrationPage";
import React from "react";
import {LoginPage} from "./Pages/LoginPage";
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import RequireAuth from "./hoc/RequireAuth";
import {repairRequestsLoader} from "./Components/RepairRequestList/RepairRequestList";
import {RepairRequestDetailsPage, repairRequestLoader} from "./Pages/RepairRequestDetailsPage";
import Layout from "./Components/Layout";
import UsersPage from "./Pages/UsersPage";
import {usersLoader} from "./Components/UsersList/UsersList";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                index: true,
                element: <LoginPage/>
            },
            {
                path: 'registration',
                element: <RegistrationPage/>
            },
            {
                path: 'repair-requests',
                element: (
                    <RequireAuth>
                        <RepairRequestsPage/>
                    </RequireAuth>
                ),
                loader: repairRequestsLoader,
            },
            {
                path: 'repair-requests/:id',
                element: (
                    <RequireAuth>
                        <RepairRequestDetailsPage/>
                    </RequireAuth>
                ),
                loader: repairRequestLoader
            },
            {
                path: 'users',
                element: (
                    <RequireAuth>
                        <UsersPage/>
                    </RequireAuth>
                ),
                loader: usersLoader
            }
        ]
    },
])

function App() {
    return (
        <div className='flex flex-col min-h-screen'>
            <RouterProvider router={router}/>
        </div>
    )
}

export default App;
