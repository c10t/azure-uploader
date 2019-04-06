import * as types from './types'

export const sendMessage = (message: string) => ({
  type: types.SEND_MESSAGE as typeof types.SEND_MESSAGE,
  payload: { message }
})

export const receiveMessage = (message: string) => ({
  type: types.RECEIVE_MESSAGE as typeof types.RECEIVE_MESSAGE,
  payload: { message }
})

export type Actions = ReturnType<typeof sendMessage | typeof receiveMessage>
