import { Card, Empty } from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";
import { useQuery } from "react-query";
import SendMessage from "../Form/SendMessage";
import MessageCard from "./MessageCard";
import { fetchMessages } from "./query";

dayjs.extend(relativeTime);

interface Props {
  currentUser: any;
}

const { Meta } = Card;

function Messages({ currentUser }: Props) {
  const { data, refetch, isLoading } = useQuery("messages", fetchMessages);

  const result = data && data;

  return (
    <div
      style={{
        padding: "0px 10%",
        marginTop: "25px",
      }}
    >
      <h1 className="mb-3 text-center">Periconn</h1>
      <h3 className="mb-3 text-center">This is a live chatting app</h3>
      <div
        style={{
          width: "100%",
          border: "1px solid rgb(235, 237, 240)",
        }}
      >
        {result && result.length === 0 && (
          <div className="mt-5">
            <Empty />
          </div>
        )}
        {result && (
          <div>
            <MessageCard
              result={result}
              refetch={refetch}
              isLoading={isLoading}
              currentUser={currentUser}
            />
          </div>
        )}
        <SendMessage refetch={refetch} currentUser={currentUser} />
      </div>
    </div>
  );
}

export default Messages;
