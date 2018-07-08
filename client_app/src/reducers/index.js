import { combineReducers } from 'redux';
import userReducer from './user_reducer';
import treeReducer from './tree_reducer';
import postsReducer from './posts_reducer';

const rootReducer = combineReducers({
    user: userReducer,
    treeUsers: treeReducer,
    posts: postsReducer
});

export default rootReducer;
