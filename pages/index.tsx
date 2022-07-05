import type { NextPage } from "next";
import { useEffect } from "react";
import { useQuery } from "react-query";
import Messages from "../components/MessageDisplay/Messages";
import NavBar from "../components/NavBar/NavBar";
import { fetchCurrentUser } from "../components/NavBar/query";

const Home: NextPage = () => {
  const { data, refetch } = useQuery("users", fetchCurrentUser);

  const result = data && data;

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      {result && (
        <div>
          <NavBar currentUser={result} refetch={refetch} />
          {result.length !== 0 ? (
            <Messages currentUser={result} />
          ) : (
            <h3 className="text-center mt-10">
              Login or Create Account to Join the Live Chat
            </h3>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
