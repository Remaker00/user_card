import React, { useState } from 'react';
import axios from 'axios';

const TeamDisplay = () => {
    const [teamsData, setTeamsData] = useState([]);
    const [showTeamsForm, setShowTeamsForm] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState(null);

    const fetchTeamsData = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/getTeams');
            setTeamsData(response.data.teams);
        } catch (error) {
            console.error(error);
        }
    };

    const handleTeamClick = (team) => {
        setSelectedTeam(team);
    };

    const handleShowTeamsForm = () => {
        setShowTeamsForm(!showTeamsForm);

        if (!showTeamsForm) {
            fetchTeamsData();
        }
    };

    return (
        <div>
            <button onClick={handleShowTeamsForm}>Show Teams</button>

            {showTeamsForm && (
                <div className='teams-form'>
                    <h2>Teams:</h2>
                    {teamsData.map((team) => (
                        <div key={team._id}>
                            <button
                                className='team-button'
                                onClick={() => handleTeamClick(team)}
                            >
                                {team._id}
                            </button>
                        </div>
                    ))}

                    {selectedTeam && (
                        <div className='members-container'>
                            <h3>{selectedTeam._id}</h3>
                            <ul>
                                {selectedTeam.members.map((member, index) => (
                                    <li key={index} className='member'>
                                        <p className='bold'>
                                            Name: {member.first_name} {member.last_name}
                                        </p>
                                        <p>Email: {member.email}</p>
                                        <p>Gender: {member.gender}</p>
                                        <p>Domain: {member.domain}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <button onClick={handleShowTeamsForm}>Close Teams</button>
                </div>
            )}
        </div>
    );
};

export default TeamDisplay;
