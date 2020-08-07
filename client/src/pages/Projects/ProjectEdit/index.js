import { connect } from 'react-redux';
import ProjectEdit from './ProjectEdit';
import { bindActionCreators } from '../../../utils/reducer';

import { 
    selectors as projectsSelectors,
    actions as projectsActions,
} from '../../../store/projects';

import { 
    selectors as usersSelectors,
    actions as usersActions,
} from '../../../store/users';

const mapStateToProps = (state) => {
    return {
        projectDetails: projectsSelectors.getState(state),
        userDetails: usersSelectors.getState(state)
    }
};

const mapDispatchToProps = dispatch => ({
    projectsActions: bindActionCreators(projectsActions, dispatch),
    usersActions: bindActionCreators(usersActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectEdit);