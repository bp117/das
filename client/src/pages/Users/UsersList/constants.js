export const COLUMNS = [
    {
        name: 'ID',
        selector: 'id'
    },
    {
        name: 'User Lan ID',
        selector: 'user_lan_id',
        format: ({user_lan_id: val}) => val === "" ? '-' : val
    },
    {
        name: 'Project ID',
        selector: 'project_id',
        format: ({project_id: val}) => val === "" ? '-' : val
    },
    {
        name: 'LOB ID',
        selector: 'lob_id',
        format: ({lob_id: val}) => val === "" ? '-' : val
    },
    {
        name: 'Role ID',
        selector: 'role_id',
        format: ({role_id: val}) => val === "" ? '-' : val
    },
    {
        name: 'First Name',
        selector: 'first_name',
        format: ({first_name: val}) => val === "" ? '-' : val
    },
    {
        name: 'Last Name',
        selector: 'last_name',
        format: ({last_name: val}) => val === "" ? '-' : val
    },
    {
        name: 'Creation Date',
        selector: 'creation_date',
        format: ({creation_date: val}) => val === "" ? '-' : val
    },
    {
        name: 'Access Expiry Date',
        selector: 'access_expiry_date',
        format: ({access_expiry_date: val}) => val === "" ? '-' : val
    },
    {
        name: 'Active',
        selector: 'active',
        format: ({active: val}) => val === "" ? '-' : val
    }
]