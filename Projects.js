import React, { useState } from "react";
import {
  Dialog,
  Switch,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Menu,
  MenuItem,
} from "@mui/material";
import { PlusIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/solid";

const Projects = () => {
  const [open, setOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [fileTypes, setFileTypes] = useState({
    pdf: false,
    xls: false,
    txt: false,
    doc: false,
  });
  const [metadataNeeded, setMetadataNeeded] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [projects, setProjects] = useState([]);
  const [actionMenuAnchorEl, setActionMenuAnchorEl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const sortedProjects = [...projects].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const displayedProjects = sortedProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const handleCreate = () => {
    if (fileTypes.xls && !metadataNeeded) {
      setValidationError("Metadata is required for xls file type.");
      return;
    }
    setProjects([...projects, { name: projectName, createdBy: "Your Name" }]);
    setOpen(false);
    setValidationError("");
    // Reset fields
    setProjectName("");
    setDescription("");
    setFileTypes({ pdf: false, xls: false, txt: false, doc: false });
    setMetadataNeeded(false);
  };

  return (
    <>
      {/* Projects List */}
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Create Project Card */}
          <div
            className="relative p-6 w-64 h-64 flex items-center justify-center cursor-pointer rounded-lg border-2 border-dashed hover:bg-gray-200 transition-opacity duration-300"
            onClick={() => setOpen(true)}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300">
              <PlusIcon className="h-10 w-10 mb-2" />
              <p>Create New Project</p>
            </div>
          </div>

          {/* Project List Table */}
          {displayedProjects.length > 0 && (
            <table className="min-w-full border-collapse mt-4 col-span-3">
              <thead>
                <tr>
                  <th
                    className="border p-2 cursor-pointer"
                    onClick={() => setProjects(sortedProjects)}
                  >
                    Project Name
                  </th>
                  <th className="border p-2">Created By</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedProjects.map((project, idx) => (
                  <tr key={idx}>
                    <td className="border p-2">{project.name}</td>
                    <td className="border p-2">{project.createdBy}</td>
                    <td className="border p-2">
                      <EllipsisHorizontalIcon
                        className="h-5 w-5 cursor-pointer"
                        onClick={(e) => setActionMenuAnchorEl(e.currentTarget)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-center mt-4 col-span-3 space-x-2">
            <button
              onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
            >
              Previous
            </button>
            <span>
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((page) => Math.min(page + 1, totalPages))
              }
            >
              Next
            </button>
          </div>

          {/* Action Menu */}
          <Menu
            anchorEl={actionMenuAnchorEl}
            open={Boolean(actionMenuAnchorEl)}
            onClose={() => setActionMenuAnchorEl(null)}
          >
            <MenuItem
              onClick={() => {
                /* handle modify here */ setActionMenuAnchorEl(null);
              }}
            >
              Modify
            </MenuItem>
            <MenuItem
              onClick={() => {
                /* handle delete here */ setActionMenuAnchorEl(null);
              }}
            >
              Delete
            </MenuItem>
          </Menu>
        </div>
      </div>

      {/* Dialog for Project Creation */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <div className="p-6 space-y-4">
          <h2 className="text-xl font-bold">Create Project</h2>
          <TextField
            label="Project Name"
            fullWidth
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div>
          <label className="block mb-2 font-medium">Allowed File Types</label>
            {["pdf", "xls", "txt", "doc"].map((type) => (
              <FormControlLabel
                key={type}
                control={
                  <Checkbox
                    checked={fileTypes[type]}
                    onChange={(e) =>
                      setFileTypes({ ...fileTypes, [type]: e.target.checked })
                    }
                  />
                }
                label={type.toUpperCase()}
              />
            ))}
          </div>
          <div className="flex items-center justify-between">
            <span>Metadata Needed?</span>
            <Switch
              checked={metadataNeeded}
              onChange={(e) => setMetadataNeeded(e.target.checked)}
            />
          </div>
          {validationError && <p className="text-red-600">{validationError}</p>}
          <div className="flex space-x-4">
            <Button variant="contained" color="primary" onClick={handleCreate}>
              Create
            </Button>
            <Button variant="contained" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Projects;
