import { connect } from 'react-redux';
import ProjectAdd from './ProjectAdd';
import { bindActionCreators } from '../../../utils/reducer';

import { 
    selectors as projectsSelectors,
    actions as projectsActions,
} from '../../../store/projects';

const mapStateToProps = (state) => {
    return {
        projectDetails: projectsSelectors.getState(state)
    }
};

const mapDispatchToProps = dispatch => ({
    projectsActions: bindActionCreators(projectsActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectAdd);