export const COLUMNS = [
    {
        name: 'ID',
        selector: 'id'
    },
    {
        name: 'Role ID',
        selector: 'role_id',
        format: ({role_id: val}) => val === "" ? '-' : val
    },
    {
        name: 'Role Desc',
        selector: 'role_desc',
        format: ({role_desc: val}) => val === "" ? '-' : val
    },
    {
        name: 'LOB ID',
        selector: 'lob_id',
        format: ({lob_id: val}) => val === "" ? '-' : val
    },
    {
        name: 'WFGroup ID',
        selector: 'wfgroup_id',
        format: ({wfgroup_id: val}) => val === "" ? '-' : val
    },
]