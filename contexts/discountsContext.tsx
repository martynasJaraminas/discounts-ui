import React from 'react'

interface IDiscountState {
    discounts: any[];
    hideSearch : boolean;
    loggedIn: boolean;
    isLoading: boolean;
    JWT: string;
}

interface IDiscountsContext {
    discounts: any[];
    hideSearch: boolean;
    isLoading: boolean;
    loggedIn: boolean;
    JWT: string;
    dispatch: React.Dispatch<{
        type: string
        value: any
    }>;
}

export const discountContext = React.createContext<IDiscountsContext>(null)

const discountReducer = (state, action) => {
    switch (action.type) {
        case 'setDiscounts': {
            return { ...state , discounts: action.value }
        }
        case "hideSearch" : {
            return {...state, hideSearch: action.value }
        }
        case "isLoading" : {
            return {...state, isLoading: action.value }
        }
        case "loggedIn" : {
            return {...state, loggedIn: action.value }
        }
        case "setJWT" : {
            return {...state, JWT: action.value }
        }
        default:
            console.log(
                'ERROR: cannot set state because of unknown type in context'
            )
    }
}

const initDiscountContext: IDiscountState = {
    discounts: [],
    hideSearch: false,
    loggedIn: false,
    isLoading: false,
    JWT: null
}

const discountProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(
        discountReducer,
        initDiscountContext
    )
    return (
        <discountContext.Provider value={{ ...state, dispatch }}>
            {children}
        </discountContext.Provider>
    )
}

export default { discountProvider, discountContext }
