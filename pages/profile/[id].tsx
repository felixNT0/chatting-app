import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { fetchMessages } from "../../components/MessageDisplay/query";
import NavBar from "../../components/NavBar/NavBar";
import { fetchCurrentUser } from "../../components/NavBar/query";
import Profile from "../../components/Profile/Profile";
import { fetchUserById } from "../../components/Profile/query";

function ProfilePage() {
  const router = useRouter();
  const id: string = router.query.id as string;
  const { data, refetch } = useQuery(["users", id], () => fetchUserById(id), {
    enabled: false,
  });

  const result = data && data;

  const currentUseDetails = useQuery("users", fetchCurrentUser);

  const currentUser = currentUseDetails?.data && currentUseDetails.data;

  const allMessages = useQuery("messages", fetchMessages);

  const messages = allMessages?.data && allMessages.data;

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id]);

  return (
    <div>
      {result && currentUser && messages && (
        <>
          <NavBar currentUser={currentUser} refetch={currentUser.refetch} />
          <Profile user={result} messages={messages} />
        </>
      )}
    </div>
  );
}

export default ProfilePage;
