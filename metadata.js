import React, { useState, useEffect } from 'react';
import CardPage from './CardPage';
import Button from '@mui/material/Button';
import MetadataTabContent from './MetadataTabContent';
import axios from 'axios';
import { Select, MenuItem } from '@mui/material';

const Metadata = () => {
    const [selectedHeaders, setSelectedHeaders] = useState(JSON.parse(localStorage.getItem("selectedHeaders")) || {});
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState('');

    useEffect(() => {
        async function fetchProjects() {
            try {
                const response = await axios.get('/api/projects');
                setProjects(response.data.projects);
            } catch (error) {
                console.error("Error fetching projects: ", error);
            }
        }

        fetchProjects();
    }, []);

    useEffect(() => {
        const fetchHeaders = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/metadata');
                const headersFromApi = response.data;
                const formattedHeaders = headersFromApi.reduce((accum, curr) => {
                    if (!accum[curr.file_name]) {
                        accum[curr.file_name] = {};
                    }
                    curr.sheet_name.forEach((sheet, index) => {
                        if (!accum[curr.file_name][sheet]) {
                            accum[curr.file_name][sheet] = [];
                        }
                        accum[curr.file_name][sheet].push(curr.field_name[index]);
                    });
                    return accum;
                }, {});

                setSelectedHeaders(formattedHeaders);
            } catch (error) {
                console.error("Error fetching headers: ", error);
            }
        };

        fetchHeaders();
    }, []);

    const handleSaveToContext = () => {
        localStorage.setItem("selectedHeaders", JSON.stringify(selectedHeaders));
    };

    return (
        <CardPage title="Metadata">
            <Select
                labelId="project-select-label"
                id="project-select"
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                fullWidth
            >
                {projects.map(project => (
                    <MenuItem key={project.id} value={project.name}>{project.name}</MenuItem>
                ))}
            </Select>
            <Button variant="contained" color="primary" onClick={handleSaveToContext} className="mt-4">Save</Button>
            <MetadataTabContent selectedHeaders={selectedHeaders} setSelectedHeaders={setSelectedHeaders} />
        </CardPage>
    );
};

export default Metadata;
