
import React from "react";
import Link from 'next/link'

const TemplatesTable = ({ templates }) =>
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
                            Created At
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {templates && templates.map((template) => (
                        <tr class="bg-white border-b ">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                <Link href={`/template/${template.id}`}>
                                {template?.title}
                                </Link>
                            </th>
                            <td class="px-6 py-4">
                                {template?.description ?? 'No description'}
                            </td>
                            <td class="px-6 py-4">
                                {template?.created_at}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}



export default TemplatesTable