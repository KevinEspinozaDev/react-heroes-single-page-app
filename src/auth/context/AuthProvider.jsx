import { useReducer } from "react"
import { AuthContext } from "./AuthContext"
import { authReducer } from "./authReducer"

import { types } from "../types/types";

const init = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return {
    logged: !!user,
    user: user,
  }
}

// children: todos los componentes hijos
export const AuthProvider = ({children}) => {
  
  const [authState, dispatch] = 
  useReducer(authReducer, {}, init);

  const login = async(name = '') => {

    const user = {id: 'ABC', name}

    const action = {
      type: types.login,
      payload: user,
    }

    localStorage.setItem('user', JSON.stringify(user));

    dispatch(action);
  }

  const logout = () => {
    const action = {
      type: types.logout,
      payload: {}
    };
    
    localStorage.removeItem('user');
    dispatch(action);
  }

  return (
    <AuthContext.Provider value={{ 
      ...authState,
      login:login,
      logout:logout,
    }}>
        {children}
    </AuthContext.Provider>
  )
}
