import React from "react"
import {login} from "../components/services/api";

interface AuthContextData {
  signed: boolean;
  user: any | null;
  Login(email: string, password: string): Promise<any>;
  Logout(): void;
}

const AuthContext = React.createContext<AuthContextData>(
  {} as AuthContextData,
)

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = React.useState(null);

    
async function Login(email: string, password: string) {
    const response = await login(email, password);
    var error = "";
    if (response.length > 0) {
        setUser(response[0])
    } else {
        error = "Usuário ou senha inválido"
    }    
    return [response.length, error];
}

async function Logout() {
  setUser(null);
}

  return (
    <AuthContext.Provider value={{ signed: Boolean(user), user, Login, Logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
