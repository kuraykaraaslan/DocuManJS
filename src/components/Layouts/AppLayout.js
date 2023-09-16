import Navigation from '@/components/Layouts/Navigation'
import { useAuth } from '@/hooks/auth'
import { useEffect, didComponentMount } from 'react';
import axios from '../../lib/axios';

import { getCookies, setCookie, deleteCookie, getCookie } from 'cookies-next';


const AppLayout = ({ header, children }) => {
    const { user } = useAuth({ middleware: 'auth' })


    useEffect(() => {
        /* check if active_team_id cookie is set */
        const active_team_id = getCookie('active_team_id');
        if (active_team_id == undefined) {
            let team_id = null;
            /* if not set, set it to the first team */
            axios.get('/api/user').then(response => {
                team_id = response.data.teams[0].id;
                setCookie('active_team_id', team_id);
            }
            );
        }

    }, []);


    return (
        <div className="min-h-screen bg-gray-100">
            <Navigation user={user} />

            {/* Page Heading */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    {header}
                </div>
            </header>

            {/* Page Content */}
            <main>{children}</main>
        </div>
    )
}

export default AppLayout
