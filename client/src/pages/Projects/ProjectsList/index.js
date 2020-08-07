import { connect } from 'react-redux';
import ProjectsList from './ProjectsList';
import { bindActionCreators } from '../../../utils/reducer';

import { 
    selectors as projectsSelectors,
    actions as projectsActions,
} from '../../../store/projects';

const mapStateToProps = (state) => {
    return {
        projectsDetails: projectsSelectors.getState(state)
    }
};

const mapDispatchToProps = dispatch => ({
    projectsActions: bindActionCreators(projectsActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList);