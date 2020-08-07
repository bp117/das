import { connect } from 'react-redux';
import RolesList from './RolesList';
import { bindActionCreators } from '../../../utils/reducer';

import { 
    selectors as rolesSelectors,
    actions as rolesActions,
} from '../../../store/roles';

const mapStateToProps = (state) => {
    return {
        roleDetails: rolesSelectors.getState(state)
    }
};

const mapDispatchToProps = dispatch => ({
    rolesActions: bindActionCreators(rolesActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(RolesList);