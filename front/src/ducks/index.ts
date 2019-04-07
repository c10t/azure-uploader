import { combineReducers } from 'redux'
import mock from './mock/reducer'
import fileList from './file-list/reducer'

export default combineReducers({ mock, fileList })
