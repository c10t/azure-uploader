import { Reducer } from 'redux'
import * as t from './types'
import { Actions, FileItem } from './actions'

interface FileListState {
  files: FileItem[]
  isFetching: boolean
  errors: Error[]
}

const initialState: FileListState = {
  files: [],
  isFetching: false,
  errors: []
}

const fileList: Reducer<FileListState, Actions> = (state = initialState, action) => {
  switch (action.type) {
    case t.REQUEST_GET_FILE_LIST:
      return { files: [ ...state.files ], isFetching: true, errors: [] }
    case t.SUCCESS_GET_FILE_LIST:
      return { files: [ ...action.payload.files ], isFetching: false, errors: [] }
    case t.FAILURE_GET_FILE_LIST:
      return { files: [ ...state.files ], isFetching: false, errors: [ ...state.errors, action.payload.error ]}
    default:
      return state
  }
}

export default fileList
