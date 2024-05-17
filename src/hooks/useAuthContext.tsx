import { useContext } from "react";
import { AuthContext } from "../context/authcontext";

export const UserAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error("useUserAuth must be used within an AuthContextProvider");
    }
    return context;
};
  