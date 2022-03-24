import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { rootReducer, reducersList } from '~/state/reducers';

import App from './App';

describe('<App />', () => {
  it('renders without crashing', () => {
    // Really slow test, suspect it is due to this :
    // import Feedback from 'react-bootstrap/esm/Feedback';
    //    implies -> --transformIgnorePatterns \"node_modules/(?!react-bootstrap/esm/Feedback.*)/\"
    //    hence longer processing
    const mockStore = configureMockStore([thunk]);
    const undefinedGlobalState = {};
    for (const prop of Object.getOwnPropertyNames(reducersList)) {
      undefinedGlobalState[prop] = undefined;
    }
    const store = mockStore(rootReducer(undefinedGlobalState, { type: undefined }));
    const wrapper = shallow(
            <Provider store={store}>
                <App />
            </Provider>,
    );
  });
});
