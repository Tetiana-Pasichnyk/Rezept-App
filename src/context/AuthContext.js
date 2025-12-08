import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        fetch("http://localhost:8888/rezept-plattform/backend/check-login.php", {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => setIsLoggedIn(data.loggedIn));
    }, []);

    return <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>{children}</AuthContext.Provider>;
}
