
import React from "react";
import Link from 'next/link'

const DocumentsTable = ({ documents }) => 
{

    return (
        <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left">
                <thead class="text-xs text-gray-700 uppercase ">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Description
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Template
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Created At
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {documents && documents.map((document) => (
                        <tr class="bg-white border-b ">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                <Link href={`/documents/${document.id}`}>
                                {document?.title}
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
                    ))}
                </tbody>
            </table>
        </div>
    );
}



export default DocumentsTable