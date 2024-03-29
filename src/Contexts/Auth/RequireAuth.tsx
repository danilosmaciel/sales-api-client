import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { LoginPage } from "../../Pages/Login";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const auth = useContext(AuthContext);

    if (!auth.user) {
        return <LoginPage />;
    }

    return children;
}