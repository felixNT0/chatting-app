import type { NextPage } from "next";
import Messages from "../components/MessageDisplay/Messages";
import NavBar from "../components/NavBar/NavBar";
import { getAuthToken } from "../utils/authToken";

const Home: NextPage = () => {
  const { currentUser } = getAuthToken();

  return (
    <div>
      <div>
        <NavBar currentUser={currentUser} />
        {currentUser == null ? (
          <h3 className="text-center mt-10">
            Login or Create Account to Join the Live Chat
          </h3>
        ) : (
          <Messages currentUser={currentUser} />
        )}
      </div>
    </div>
  );
};

export default Home;
