import React from "react";
import AppLayout from '@/components/Layouts/AppLayout'

import Head from 'next/head'

import DocumentDetail from '@/components/Documents/Detail'

import axios from '../../../lib/axios';

import { getCookies, setCookie, deleteCookie, getCookie } from 'cookies-next';
import { useRouter } from "next/router";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons'
import Link from "next/link";

const DocumenDetailPage = () => {

    const [document, setDocumentId] = React.useState(null);
    const [title, setTitle] = React.useState(null);
    const [active_team_id, setActiveTeamId] = React.useState(null);

    const router = useRouter();

    // document id is in router.query.document_id

    const { document_id } = router.query;

    const handleSave = () => {
        alert('save');
    }


    React.useEffect(() => {
        if (document_id != null) {
            // http://localhost:8000/api/team/<active_team_id>/documents/<document_id>
            const active_team_id = getCookie('active_team_id');
            axios.get('/api/team/' + active_team_id + '/documents/' + document_id).then(response => {
                setDocumentId(response.data.document);
                setActiveTeamId(active_team_id);
            }
            );
        }


    }, [document_id]);

    return (
        <AppLayout header={
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <Link href="/documents">
                        <FontAwesomeIcon icon={faArrowLeft} className="text-gray-600 text-lg mr-2" />
                    </Link>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        {document != null ? document.title : 'Document'}
                    </h2>
                </div>
                <div>
                    <button onClick={handleSave}>
                        <FontAwesomeIcon icon={faSave} className="text-green-500 text-lg mr-2" />
                    </button>
                </div>
            </div>
        }>
            <Head>
                <title>{document != null ? document.title : 'Document'} - laravelDMS</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg">
                        <DocumentDetail document={document} active_team_id={active_team_id} />
                    </div>
                </div>
            </div>

        </AppLayout>
    )
}

export default DocumenDetailPage

