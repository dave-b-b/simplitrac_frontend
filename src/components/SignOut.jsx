import { auth, signOut } from "../config/initializeFirestore.js";
import { AppContext } from "../context/AppContext.jsx";
import { useContext } from "react";
import { Button } from "@chakra-ui/react";

const Logout = () => {

    const { setScreen, setUser, resetAppState } = useContext(AppContext);

    const logOut = async () => {
        try {
            await signOut(auth);
            // localStorage.clear() // removing so that game state is preserved.
            localStorage.removeItem('user');
            resetAppState()
        } catch (err) {
            console.error('Error signing out: ', err);
        }
    }

    return (
        <Button onClick={logOut}>Logout</Button>
    );
}

export default Logout;
