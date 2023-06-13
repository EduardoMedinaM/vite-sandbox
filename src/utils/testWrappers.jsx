import { Provider } from 'react-redux';
import store from '../redux/store';
import PropTypes from 'prop-types';

export const ReduxProvider = ({ children }) => (
	<Provider store={store}>{children}</Provider>
);

ReduxProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
