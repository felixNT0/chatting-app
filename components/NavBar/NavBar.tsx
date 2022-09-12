import { WechatFilled } from "@ant-design/icons";
import { Button } from "antd";
import { useRouter } from "next/router";
import { UserType } from "../../types/users";
import { removeAuthToken } from "../../utils/authToken";
import styles from "./NavBar.module.css";

interface Props {
  currentUser: UserType[] | null;
}

function NavBar({ currentUser }: Props) {
  const router = useRouter();

  const user = currentUser?.find((user: any) => user.id === user.id);

  const logout = () => {
    removeAuthToken();
  };

  return (
    <div>
      <div className={styles.root}>
        <WechatFilled
          onClick={() => router.push("/")}
          style={{ fontSize: "50px", color: "white", cursor: "pointer" }}
        />
        <h1
          style={{
            color: "white",
            margin: "0px",
          }}
        >
          Ndakolo Chatting App
        </h1>
        {currentUser !== null ? (
          <div
            style={{
              display: "flex",
              gap: "25px",
              alignItems: "center",
            }}
          >
            {/* <Button
              onClick={() => router.push(`/chat-room`)}
              style={{
                color: "white",
              }}
              type="ghost"
              disabled
            >
              Chat Room
            </Button> */}
            <Button
              onClick={() => router.push(`/profile/${user?.id}`)}
              style={{
                color: "white",
              }}
              type="ghost"
            >
              Profile
            </Button>
            <Button
              onClick={logout}
              style={{
                color: "white",
              }}
              type="ghost"
            >
              Logout
            </Button>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              gap: "25px",
              alignItems: "center",
            }}
          >
            <Button
              onClick={() => router.push("/signup")}
              style={{
                color: "white",
              }}
              type="ghost"
            >
              SignUp
            </Button>
            <Button
              onClick={() => router.push("/login")}
              style={{
                color: "white",
              }}
              type="ghost"
            >
              Login
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
