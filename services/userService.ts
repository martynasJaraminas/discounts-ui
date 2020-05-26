import axios from 'axios'
import {AsyncStorage} from 'react-native';


setTimeout(async ()=> {
    await AsyncStorage.clear();
    // await AsyncStorage.setItem('JWT', 'I like to save it.');
}, 500)


//  TODO:
const LOGIN_URL = 'https://nameless-hollows-17095.herokuapp.com/login'
const REGISTER_URL = 'https://nameless-hollows-17095.herokuapp.com/register'
const VALIDATE_JWT = 'https://nameless-hollows-17095.herokuapp.com/validate'
const SUBSCRIPTION = 'https://nameless-hollows-17095.herokuapp.com/subscription'


export const login = async (email: string, pw: string) => {
    const data = {
        email,
        pw,
    }
    try {
        const loginRes = await axios.post(LOGIN_URL, data)
        await AsyncStorage.setItem('JWT', loginRes.headers.authorization.split(" ")[1]);
        return {ok : true}  
    } catch (error) {
        console.log('ERROR logging in', error)
        return {status : 400};
    }
}

export const signUp = async (email: string, pw: string, phone: string) => {
    const data = {
        email,
        pw,
        phone,
    }
    try {
        const signUpRes = await axios.post(REGISTER_URL, data)
        return signUpRes;
    } catch (error) {
        console.log('ERROR registering new user', error)
        return {status : 400}
    }
}

export const validateUserJWT = async (jwt)=> {
    try {
        return await axios.get(VALIDATE_JWT, {headers: {Authorization : `Bearer ${jwt}`}});
    } catch (error) {
        console.log('ERROR validating user', error)
    }
}

export const updateUserSubscription = async (discount, addSubscription) => {
    const data = {
        discount,
        addSubscription
    }
    try {
        const jwt = await AsyncStorage.getItem('JWT');
         const updateUserSubscriptionRes =  await axios.post(SUBSCRIPTION, data , {headers: {authorization : `Bearer ${jwt}`}});
        return {ok : true}
    } catch (error) {
        console.log('ERROR updating users subscription', error)
    }
} 



const wait = async milSeconds => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, milSeconds)
    })
}