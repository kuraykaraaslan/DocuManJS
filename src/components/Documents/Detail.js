import React, { useState, useEffect } from "react";
import axios from '../../lib/axios';

import { getCookies, setCookie, deleteCookie, getCookie } from 'cookies-next';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

import Link from "next/link";

const DocumentReleationshipPreview = ({ document, expanded , active_team_id}) => {

    const [documentData, setDocumentData] = useState([]);

    
    useEffect(() => {
        if (expanded) {
            // http://localhost:8000/api/team/<active_team_id>/documents/<document_id>
            axios.get('/api/team/' + active_team_id + '/documents/' + document).then(response => {
                setDocumentData(response.data.document);
            }
            );
        }

    }, [expanded]);

    return (
        <>
        <tr class="border-b " sytle={{backgroundColor: 'red'}}>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                <Link href={`/documents/${documentData?.id}`}>
                    {documentData?.title}
                </Link>
            </th>
            <td class="px-6 py-4">
                {document?.description ?? 'No description'}
            </td>
            <td class="px-6 py-4">
                {document?.template?.title ?? 'No template'}
            </td>
            <td class="px-6 py-4">
                {document?.created_at}
            </td>
        </tr>
        </>
    );
}



const DocumentReleationship = ({ releationship, active_team_id, parentId }) => {
    const [relatedDocuments, setRelatedDocuments] = useState([]);

    const [expanded, setExpanded] = useState(false);

    const [relatedDocumentsCount, setRelatedDocumentsCount] = useState(releationship?.related_documents?.length ?? 0);

    if (relatedDocumentsCount > 2) {
        
        // render as folder
        return (
            <>
                <tr class="bg-white border-b ">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        <button onClick={() => setExpanded(!expanded)}>
                            <FontAwesomeIcon icon={faCaretDown} className="text-gray-600 text-lg mr-2" />
                        </button>
                    </th>
                    <td class="px-6 py-4">
                        {releationship?.description ?? 'No description'}
                    </td>
                    <td class="px-6 py-4">
                        {releationship?.template?.title ?? 'No template'}
                    </td>
                    <td class="px-6 py-4">
                        {releationship?.related_documents?.length ?? '0'}
                    </td>
                </tr>
                {expanded && releationship?.related_documents?.map((document) => (
                    <DocumentReleationshipPreview document={document} key={document.id} expanded={expanded} active_team_id={active_team_id} />
                ))}
            </>

        );

    }  else if (relatedDocumentsCount == 2) {

        const otherDocumentId = releationship?.related_documents?.filter((document) => document != parentId)[0];

        return (
            <>
            <DocumentReleationshipPreview document={otherDocumentId} key={otherDocumentId} expanded={true} active_team_id={active_team_id} />
            </>
        );

    }

    
}



const DocumentDetail = ({ document , active_team_id}) => {
    // details of document
    //two columns

    /* left column items
    title
    description
    */

    /* right column items
    template title
    created at
    updated at
    */

    const [instances, setInstances] = useState([]);

    useEffect(() => {
        if (document != null) {
            // http://localhost:8000/api/team/<active_team_id>/documents/<document_id>/inputs
            axios.get('/api/teams/' + active_team_id + '/documents/' + document.id + '/instances').then(response => {
                setInstances(response.data.instances);
            }
            );

        }

    }
    , [document]);


    return (
        <>
            <div className="bg-white p-4">
                <h2 className="text-2xl font-semibold mb-4">Document Details</h2>
                <div className="bg-white relative overflow-x-auto flex flex-wrap -mx-3 mt-4 ml-4 mr-4">
                    <div className="w-1/2">
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
                                Title
                            </label>
                            <input
                                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                type="text"
                                id="author"
                                value={document?.title}
                                readOnly
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
                                Description
                            </label>
                            <textarea
                                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                id="description"
                                value={document?.description}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="w-1/2 px-3 mb-6 md:mb-0">
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="template">
                                Template Title
                            </label>
                            <input
                                className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-100 focus:outline-none focus:border-blue-500"
                                type="text"
                                id="template"
                                value={document?.template?.title}
                                readOnly
                                disabled
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="created_at">
                                Created At
                            </label>
                            <input
                                className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-100 focus:outline-none focus:border-blue-500"
                                type="text"
                                id="created_at"
                                value={document?.created_at}
                                readOnly
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white p-4 mt-4 mb-4">
                <h2 className="text-2xl font-semibold mb-4">Template Details</h2>
                <div className="bg-white relative overflow-x-auto flex flex-wrap -mx-3 mt-4 ml-4 mr-4">
                    <div class="w-full text-sm text-left">
                        {instances.map((instance) => (
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor={instance?.input?.name}>
                                    {instance?.input?.name}
                                </label>
                                {instance?.input?.type == 'string' && (
                                    <input
                                        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                        type="text"
                                        id={instance?.input?.name}
                                        value={instance?.value}
                                        onChange={(e) => {
                                            instance.value = e.target.value;
                                            setInstances([...instances]);
                                        } }
                                    />
                                )}
                                {instance?.input?.type == 'select' && (
                                    <select
                                        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                        id={instance?.input?.name}
                                        value={instance?.value}
                                        onChange={(e) => {
                                            instance.value = e.target.value;
                                            setInstances([...instances]);
                                        } }
                                    >
                                        {instance?.input?.options?.map((option) => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                )}
                                {instance?.input?.type == 'date' && (
                                    <input
                                        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                        type="date"
                                        id={instance?.input?.name}
                                        value={instance?.value}
                                        onChange={(e) => {
                                            instance.value = e.target.value;
                                            setInstances([...instances]);
                                        } }
                                    />
                                )}
                                {instance?.input?.type == 'integer' && (
                                    <input
                                        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                        type="number"
                                        id={instance?.input?.name}
                                        value={instance?.value}
                                        onChange={(e) => {
                                            instance.value = e.target.value;
                                            setInstances([...instances]);
                                        } }
                                    />
                                )}
                                {instance?.input?.type == 'boolean' && (
                                    <select
                                        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                        id={instance?.input?.name}
                                        value={instance?.value}
                                        onChange={(e) => {
                                            instance.value = e.target.value;
                                            setInstances([...instances]);
                                        } }
                                    >
                                        <option value="true">True</option>
                                        <option value="false">False</option>
                                    </select>
                                )}





                            </div>
                        ))}
                    </div>

                </div>
            </div>
            <div className="bg-white p-4 mt-4 mb-4">
                <h2 className="text-2xl font-semibold mb-4">Releations</h2>
                <div className="bg-white relative overflow-x-auto flex flex-wrap -mx-3 mt-4 ml-4 mr-4">
                    <table class="w-full text-sm text-left">
                        <thead class="text-xs text-gray-700 uppercase ">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Expand
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Description
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Template
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Item Count
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {document?.releationships?.map((relation) => (
                                <>
                                    <DocumentReleationship releationship={relation} key={relation.id} active_team_id={active_team_id} parentId={document.id} />
                                </>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>


        </>

    );
}

export default DocumentDetail

