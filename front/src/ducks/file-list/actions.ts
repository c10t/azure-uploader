import * as t from './types'

export interface FileItem {
  filename: string,
  comment: string,
  uploadedAt: string
}

export const requestGetFileList = () => ({
  type: t.REQUEST_GET_FILE_LIST as typeof t.REQUEST_GET_FILE_LIST
})

export const successGetFileList = (files: FileItem[]) => ({
  type: t.SUCCESS_GET_FILE_LIST as typeof t.SUCCESS_GET_FILE_LIST,
  payload: { files }
})

export const failureGetFileList = (error: Error) => ({
  type: t.FAILURE_GET_FILE_LIST as typeof t.FAILURE_GET_FILE_LIST,
  payload: { error }
})

export type Actions = ReturnType<
  typeof requestGetFileList |
  typeof successGetFileList |
  typeof failureGetFileList >
