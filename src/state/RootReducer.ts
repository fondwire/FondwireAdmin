//Types
export const SIGN_IN_TYPE = "app/SIGN_IN_TYPE"





// Reducer
type StateTypes = {

}

export default (state: StateTypes, action:any) => {
    switch (action.type){
        case SIGN_IN_TYPE:
            return {
                userData: action.data ? {...action.data} : null,
            }
        default:
            return {...state}
    }
}