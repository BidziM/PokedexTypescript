import React, {
  createContext,
  FC,
  PropsWithChildren,
  useReducer,
} from "react";
import * as SecureStore from "expo-secure-store";

interface ContextType {
  state:AuthState
  dispatch: React.Dispatch<Action>;
}

interface AuthState{
    isLogin:boolean
    userName: string | null;
    userToken: string | null;
}

interface Action {
    type: 'RESTORE_TOKEN' | 'SIGN_IN' | 'SIGN_OUT',
    payload?: any
  }
  
  const reducer = (prevState:AuthState, action:Action) => {
    const { type, payload } = action;
    switch (type) {
      case "RESTORE_TOKEN":
        return {
          ...prevState,
          userToken: payload.token,
          userName: payload.username,
          isLogin: true,
        };
      case "SIGN_IN":
        return {
          ...prevState,
          isLogin: true,
          userName: payload.username,
          userToken: payload.token,
        };
      case "SIGN_OUT":
        return {
          ...prevState,
          isLogin: false,
          userToken: null,
          userName: null,
        };
    }
  };

export const AuthContext = createContext<ContextType>({} as ContextType);

export const AuthProvider: FC = ({ children }: PropsWithChildren<unknown>) => {
  const [state , dispatch] = useReducer(reducer, {
    isLogin: false,
    userToken: null,
    userName: null,
  })

  React.useEffect(() => {
    let userToken:string | null, userName:string | null;
      async function getFromStorage() {
        userToken = await SecureStore.getItemAsync("userToken");
        userName = await SecureStore.getItemAsync("userName");
      }
      getFromStorage()
      .then(() => {
        if(userToken !== null){
          dispatch({ type: "RESTORE_TOKEN", payload:{userToken: userToken, userName: userName} });
        }
      }) 
  }, [])

  return (
    <AuthContext.Provider value={{state, dispatch}}>
      {children}
    </AuthContext.Provider>);
};
