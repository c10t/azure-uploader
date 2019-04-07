import { Reducer } from 'redux'
import * as t from './types'
import { Actions, FileItem } from './actions'

interface FileListState {
  files: FileItem[]
  isFetching: boolean
  error?: Error
}

const initialState: FileListState = {
  files: [],
  isFetching: false
}

const fileList: Reducer<FileListState, Actions> = (state = initialState, action) => {
  switch (action.type) {
    case t.REQUEST_GET_FILE_LIST:
      return { files: [ ...state.files ], isFetching: true }
    case t.SUCCESS_GET_FILE_LIST:
      return { files: [ ...action.payload.files ], isFetching: false }
    case t.FAILURE_GET_FILE_LIST:
      return { files: [ ...state.files ], isFetching: false, error: action.payload.error}
  }
}

export default fileList
