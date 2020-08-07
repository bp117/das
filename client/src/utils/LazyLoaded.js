import React from "react";

export const UsersList = React.lazy(() => import('../pages/Users/UsersList'));
export const ProjectsList = React.lazy(() => import('../pages/Projects/ProjectsList'));
export const ProjectAdd = React.lazy(() => import('../pages/Projects/ProjectAdd'));
export const ProjectEdit = React.lazy(() => import('../pages/Projects/ProjectEdit'));
export const RolesList = React.lazy(() => import('../pages/Roles/RolesList'));
export const NotFound = React.lazy(() => import('../components/NotFound'));
