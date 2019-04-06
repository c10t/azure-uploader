import { Reducer } from 'redux'
import * as types from './types'
import { Actions } from './actions'

interface MockState {
  counter: number
  message: string
}

const initialState: MockState = {
  counter: 0,
  message: ''
}

const mock: Reducer<MockState, Actions> = (state = initialState, action) => {
  switch (action.type) {
    case types.SEND_MESSAGE:
      return { counter: state.counter++, message: '' }
    case types.RECEIVE_MESSAGE:
      return { counter: state.counter, message: action.payload.message }
    default:
      const _:never = action
      return state
  }
}

export default mock
