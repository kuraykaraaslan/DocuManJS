import GuestLayout from "@/components/Layouts/GuestLayout";
import AuthCard from "@/components/AuthCard";
import Button from "@/components/Button";
import React from "react";
import Link from "next/link";
import Label from "@/components/Label";

import InputError from '@/components/InputError'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-solid-svg-icons'

import { useRouter } from 'next/router'

import axios from "@/lib/axios";

import { getCookies, setCookie, deleteCookie, getCookie } from 'cookies-next';


const Select = (props) => {

    let [teams, setTeams] = React.useState([]);

    const [errors, setErrors] = React.useState([]);

    const [selectedTeam, setSelectedTeam] = React.useState(null);

    const router = useRouter();

    React.useEffect(() => {
        axios.get('/api/teams').then(response => {
            setTeams(response.data.teams);
            setSelectedTeam(response.data.teams[0].id);
        }
        );

    }
    , []);

    function setActiveTeamId() {
        setCookie('active_team_id', selectedTeam);
        router.push('/dashboard');

    }


    return (
        <GuestLayout>
            <AuthCard
                logo={
                    <Link href="/">
                        <div className="flex-shrink-0 flex items-center">
                                <FontAwesomeIcon icon={faFile} className="block h-10 w-auto fill-current text-green" color='green' />
                                <p className="ml-2">Laravel DMS</p> {/* Updated */}
                        </div>                    
                    </Link>
                }>
                    {/* Email Address */}
                    <div>
                        <Label htmlFor="team">Team</Label>

                        <select
                            id="team"
                            type="text"
                            value={teams}
                            className="block mt-1 w-full"
                            onChange={(e) => setSelectedTeam(e.target.value)}
                            required
                            autoFocus
                        >
                            <option value="" disabled selected>Select your option</option>
                            {teams.map((team) => (
                                <option key={team.id} value={team.id}>{team.name}</option>
                            ))}
                        </select>

                        

                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <Link
                            href="/auth/new-team"
                            className="underline text-sm text-gray-600 hover:text-gray-900">
                            Create new team
                        </Link>

                        <Button className="ml-3" onClick={setActiveTeamId}>
                            Select
                        </Button>
                    </div>
            </AuthCard>
        </GuestLayout>
    )
}

export default Select

