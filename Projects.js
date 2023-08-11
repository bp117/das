import React, { useState, useEffect } from 'react';
import { Dialog, Checkbox, Button, TextField, Switch, FormControlLabel, IconButton, Menu, MenuItem } from '@mui/material';
import PlusIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function Projects() {
    const [open, setOpen] = useState(false);
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState({
        name: '',
        description: '',
        allowedFileTypes: {
            pdf: false,
            xls: false,
            txt: false,
            doc: false
        },
        metadataAvailable: false
    });

    useEffect(() => {
        // Placeholder for fetching existing projects from the backend
        // For this example, we'll assume the API is at '/api/projects'
        async function fetchProjects() {
            try {
                const response = await fetch('/api/projects');
                const data = await response.json();
                setProjects(data.projects);
            } catch (error) {
                console.error('Failed to fetch projects:', error);
            }
        }

        fetchProjects();
    }, []);

    const handleCreateProject = async () => {
        if (newProject.allowedFileTypes.xls && !newProject.metadataAvailable) {
            alert('Metadata needs to be available for XLS files!');
            return;
        }

        try {
            const response = await fetch('/api/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProject)
            });

            const data = await response.json();
            if (data.success) {
                setProjects(prevProjects => [...prevProjects, data.project]);
                setOpen(false);
            } else {
                console.error('Failed to create project:', data.error);
            }
        } catch (error) {
            console.error('Failed to create project:', error);
        }
    };

    return (
        <div className="p-6 space-y-4">
            <div className="relative p-6 w-64 h-64 flex items-center justify-center cursor-pointer rounded-lg border-2 border-dashed hover:bg-gray-200 transition-opacity duration-300" onClick={() => setOpen(true)}>
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300">
                    <PlusIcon className="h-10 w-10 mb-2" />
                    <p>Create New Project</p>
                </div>
            </div>

            <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
                <div className="p-6 space-y-4">
                    <TextField
                        label="Project Name"
                        fullWidth
                        value={newProject.name}
                        onChange={e => setNewProject(prev => ({ ...prev, name: e.target.value }))}
                    />
                    <TextField
                        label="Description"
                        fullWidth
                        multiline
                        value={newProject.description}
                        onChange={e => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                    />
                    <div>
                        <p className="font-semibold">Allowed File Types:</p>
                        {['pdf', 'xls', 'txt', 'doc'].map(fileType => (
                            <FormControlLabel
                                key={fileType}
                                control={
                                    <Checkbox
                                        checked={newProject.allowedFileTypes[fileType]}
                                        onChange={e => {
                                             if (fileType === 'xls' && e.target.checked) {
                        setNewProject(prev => ({
                            ...prev,
                            allowedFileTypes: {
                                ...prev.allowedFileTypes,
                                [fileType]: e.target.checked
                            },
                            metadataAvailable: true // Automatically set this to true when 'xls' is checked.
                        }));
                    } else {
                        setNewProject(prev => ({
                            ...prev,
                            allowedFileTypes: {
                                ...prev.allowedFileTypes,
                                [fileType]: e.target.checked
                            }
                        }));
                    }
                }}
                                    />
                                }
                                label={fileType.toUpperCase()}
                            />
                        ))}
                    </div>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={newProject.metadataAvailable}
                                onChange={e => setNewProject(prev => ({ ...prev, metadataAvailable: e.target.checked }))}
                            />
                        }
                        label="Metadata Available?"
                    />
                    <div className="flex justify-end space-x-2">
                        <Button variant="outlined" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button variant="contained" color="primary" onClick={handleCreateProject}>Create</Button>
                    </div>
                </div>
            </Dialog>

            {projects.length === 0 ? (
                <div className="flex flex-col items-center opacity-50">
                    <img src="/path-to-placeholder-image.png" alt="Projects Placeholder" className="w-64 h-64" />
                    <p>Team projects will show up here</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {projects.map(project => (
                        <div key={project.id} className="flex justify-between items-center border p-4 rounded-lg">
                            <div>
                                <p className="font-bold">{project.name}</p>
                                <p>Created by: {project.createdBy}</p>
                            </div>
                            <IconButton>
                                <MoreVertIcon />
                            </IconButton>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Projects;
