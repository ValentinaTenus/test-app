import {
    getNewTokens,
    getUser,
    login,
    logout,
    register,
} from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    getNewTokens,
    getUser,
    login,
    logout,
    register,
}

export { allActions as actions };
export { reducer } from './slice.js';