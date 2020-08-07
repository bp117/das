import { connect } from 'react-redux';
import RoleEdit from './RoleEdit';
import { bindActionCreators } from '../../../utils/reducer';

import { 
    selectors as rolesSelectors,
    actions as rolesActions,
} from '../../../store/roles';

const mapStateToProps = (state, ownProps) => {
    return {
        roleDetails: rolesSelectors.getState(state),
        ...ownProps
    }
};

const mapDispatchToProps = dispatch => ({
    rolesActions: bindActionCreators(rolesActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(RoleEdit);