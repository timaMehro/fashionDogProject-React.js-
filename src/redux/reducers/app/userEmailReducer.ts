import { USER_MAIL_OPEN, USER_MAIL_SUCCESS, USER_MAIL_DISABLE } from "../../actions/app/userEmailActions";

export interface MailState {
    open: boolean;
    payload: any;
    enable:boolean;
}
const initialState: MailState = { open: false, payload: null ,enable:true};



const userMail = (state = initialState, action: any) => {
    switch (action.type) {
        case USER_MAIL_DISABLE:
        return { ...state, enable: action.enable === true };
        case USER_MAIL_OPEN:
            return { ...state, open: action.open === true };
        case USER_MAIL_SUCCESS:
            return { ...state, payload: action.payload };
        default:
            return { ...state };
    }
};





export default userMail;
