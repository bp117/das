import { connect } from 'react-redux';
import UsersList from './UsersList';
import { bindActionCreators } from '../../../utils/reducer';

import { 
    selectors as usersSelectors,
    actions as usersActions,
} from '../../../store/users';

const mapStateToProps = (state) => {
    return {
        userDetails: usersSelectors.getState(state)
    }
};

const mapDispatchToProps = dispatch => ({
    usersActions: bindActionCreators(usersActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);