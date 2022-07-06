import { Empty, Form, Input, notification } from "antd";
import type { NotificationPlacement } from "antd/lib/notification";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import SendMessage from "../Form/SendMessage";
import MessageCard from "./MessageCard";
import { fetchMessages } from "./query";

dayjs.extend(relativeTime);

interface Props {
  currentUser: any;
}

const { Search } = Input;

function Messages({ currentUser }: Props) {
  const { data, refetch, isLoading } = useQuery("messages", fetchMessages);

  const result = data && data;

  const [form] = Form.useForm();

  const [searchMessage, setSearchMessage] = useState();

  const handleSearchSubmit = (value: string) => {
    if (value === "") {
      openNotification("top");
      return;
    }
    let searched = result.filter(
      (res: any) =>
        res.message.toLowerCase().includes(value.toLowerCase()) ||
        res.user.username.toLowerCase().includes(value.toLowerCase())
    );

    setSearchMessage(searched);
  };

  const openNotification = (placement: NotificationPlacement) => {
    notification.error({
      message: `Type something don't submit empty value`,
      placement,
    });
  };

  useEffect(() => {
    if (data) {
      refetch();
    }
  }, [data]);

  return (
    <div
      style={{
        padding: "0px 10%",
        marginTop: "25px",
      }}
    >
      <div className="text-center mb-5">
        <Search
          style={{ width: "50%" }}
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={handleSearchSubmit}
        />
      </div>

      <h1 className="mb-3 text-center">Ndakolo</h1>
      <h3 className="mb-3 text-center">This is a live chatting app</h3>
      <div
        style={{
          width: "100%",
          border: "1px solid rgb(235, 237, 240)",
        }}
      >
        <SendMessage refetch={refetch} currentUser={currentUser} />
        {result && !result.length && (
          <div className="mt-5">
            <Empty />
          </div>
        )}
        {result && (
          <div>
            <MessageCard
              searchMessage={searchMessage}
              result={result}
              refetch={refetch}
              isLoading={isLoading}
              currentUser={currentUser}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Messages;
