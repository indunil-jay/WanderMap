import { createContext, useContext, useReducer } from "react";

interface IUser {
  email: string;
  password: string;
}

interface IState {
  user: IUser | null;
  isAuthenicated: boolean;
}

type Action = { type: "login"; payload: IUser } | { type: "logout" };

const initialState: IState = {
  user: null,
  isAuthenicated: false,
};

const reducer = (state: IState, action: Action): IState => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenicated: true,
      };
    case "logout":
      return {
        user: null,
        isAuthenicated: false,
      };
    default:
      throw new Error("Invalid action");
  }
};

interface IAuthContext {
  isAuthenicated: boolean;
  user: IUser | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

//fake login
const USER = {
  email: "test@example.com",
  password: "1234",
};

const AuthContext = createContext<IAuthContext | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [{ user, isAuthenicated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const login = (email: string, password: string) => {
    if (email === USER.email && password === USER.password) {
      dispatch({
        type: "login",
        payload: {
          email,
          password,
        },
      });
    }
  };

  const logout = () => {
    dispatch({ type: "logout" });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenicated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("AuthContext was used outside the AuthProvider");

  return context;
};

export { AuthProvider, useAuth };
