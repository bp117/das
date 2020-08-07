function bindActionCreator(ac, dispatch) {
  return function() {
    return dispatch(ac.apply(this, arguments));
  };
}

export const bindActionCreators = (
  actionCreators,
  dispatch,
) => {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error(
      `bindActionCreators expected an object or a function, instead received ${
        actionCreators === null ? 'null' : typeof actionCreators
      }. ` +
        'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?',
    );
  }

  const keys = Object.keys(actionCreators);
  const boundActionCreators = {};

  for (const key of keys) {
    // @ts-ignore
    const ac = actionCreators[key];
    boundActionCreators[key] = bindActionCreators(ac, dispatch);
  }

  return boundActionCreators;
};