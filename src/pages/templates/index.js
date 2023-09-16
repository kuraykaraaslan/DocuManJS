import React from "react";
import AppLayout from '@/components/Layouts/AppLayout'

import Head from 'next/head'

import TemplatesTable from '@/components/Templates/Table'

import axios from '../../lib/axios';
import { getCookies, setCookie, deleteCookie, getCookie } from 'cookies-next';


const TemplatesIndex = () => {

    const [templates, setTemplates] = React.useState([]);

    React.useEffect(() => {
        // http://localhost:8000/api/team/<active_team_id>/Templates
        const active_team_id = getCookie('active_team_id');
        axios.get('/api/team/' + active_team_id + '/templates').then(response => {
            setTemplates(response.data.templates);
        }
        );
    }, []);



    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Templates
                </h2>
            }>
            <Head>
                <title>laravelDMS - Templates</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <TemplatesTable templates={templates} />

                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default TemplatesIndex