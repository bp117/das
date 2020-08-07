import { connect } from 'react-redux';
import UserEdit from './UserEdit';
import { bindActionCreators } from '../../../utils/reducer';

import { 
    selectors as usersSelectors,
    actions as usersActions,
} from '../../../store/users';

const mapStateToProps = (state, ownProps) => {
    return {
        userDetails: usersSelectors.getState(state),
        ...ownProps
    }
};

const mapDispatchToProps = dispatch => ({
    usersActions: bindActionCreators(usersActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);