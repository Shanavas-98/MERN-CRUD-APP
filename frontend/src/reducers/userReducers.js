import {USER_LOGIN,LOGIN_SUCCESS,LOGIN_FAILED,USER_LOGOUT} from '../constants/userConstants'

const initialState={
    
}

export const userLoginReducer=(state=initialState,action)=>{
    switch(action.type){
        case USER_LOGIN:
            return {loading:true}
        case LOGIN_SUCCESS:
            return {loading:true, userInfo:action.payload}
        case LOGIN_FAILED:
            return {loading:true, error:action.payload}
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}