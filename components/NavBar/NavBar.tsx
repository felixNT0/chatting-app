import { WechatFilled } from "@ant-design/icons";
import { Button } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { useMutation } from "react-query";
import styles from "./NavBar.module.css";
import { deleteCurrentUser } from "./query";

interface Props {
  currentUser: any;
  refetch: any;
}

function NavBar({ currentUser, refetch }: Props) {
  const router = useRouter();

  const delCurentUser = useMutation(deleteCurrentUser, {
    onSuccess: () => {
      refetch();
    },
  });

  const logout = () => {
    const logOut = currentUser.find((val: any) => val.id === val.id);
    delCurentUser.mutate(logOut.id);
  };

  return (
    <div>
      <div className={styles.root}>
        <WechatFilled style={{ fontSize: "50px", color: "white" }} />
        <h1
          style={{
            color: "white",
            margin: "0px",
          }}
        >
          Ndakolo Chatting App
        </h1>
        {currentUser.length !== 0 ? (
          <div>
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
