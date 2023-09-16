import React from "react";
import AppLayout from '@/components/Layouts/AppLayout'

import Head from 'next/head'

import DocumentsTable from '@/components/Documents/Table'

import axios from '../../lib/axios';
import { getCookies, setCookie, deleteCookie, getCookie } from 'cookies-next';


const DocumentsIndex = () => {

    const [documents, setDocuments] = React.useState([]);
    const [active_team_id, setActiveTeamId] = React.useState(null);

    React.useEffect(() => {
        // http://localhost:8000/api/team/<active_team_id>/documents
        const active_team_id = getCookie('active_team_id');
        axios.get('/api/team/' + active_team_id + '/documents').then(response => {
            setDocuments(response.data.documents);
            setActiveTeamId(active_team_id);
        }
        );
    }, []);



    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Documents
                </h2>
            }>
            <Head>
                <title>laravelDMS - Documents</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <DocumentsTable documents={documents} active_team_id={active_team_id} />

                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default DocumentsIndex