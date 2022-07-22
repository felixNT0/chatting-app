import { Empty, Input, message, notification } from "antd";
import type { NotificationPlacement } from "antd/lib/notification";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { useState } from "react";
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
  // const [current, setCurrent] = useState(1);
  const { data, refetch, isLoading } = useQuery(
    ["messages"],
    fetchMessages
    // { keepPreviousData: true }
  );

  // const onChange = (page: any) => {
  //   setCurrent(page);
  // };

  const result = data && data;

  const [searchMessage, setSearchMessage] = useState(result);

  const handleSearchSubmit = (value: string) => {
    let searched = result.filter(
      (res: any) =>
        res.message.toLowerCase().includes(value.toLowerCase()) ||
        res.user.username.toLowerCase().includes(value.toLowerCase())
    );
    if (value === "") {
      openNotification("top");
      return;
    } else if (!searched) {
      info(value);
    } else {
      setSearchMessage(searched);
    }
  };

  const openNotification = (placement: NotificationPlacement) => {
    notification.error({
      message: `Type something don't submit empty value`,
      placement,
    });
  };

  const info = (value: string) => {
    message.info(`No result found for ${value}`);
  };

  // useEffect(() => {
  //   if (data) {
  //     refetch();
  //   }
  // }, [data]);

  return (
    <div
      style={{
        padding: "0px 15%",
        marginTop: "25px",
      }}
    >
      <div className="text-center mb-5">
        <Search
          style={{ width: "50%" }}
          placeholder="input search text"
          allowClear
          enterButton
          size="large"
          onSearch={handleSearchSubmit}
        />
      </div>

      <h1 className="mb-3 text-center">Ndakolo</h1>
      <h3 className="mb-3 text-center">This is a chatting app</h3>
      <div
        style={{
          width: "100%",
          border: "1px solid #1890ff",
          marginBottom: "15px",
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
        {/* <div className="mt-5 mb-5">
          <Pagination
            current={current}
            onChange={onChange}
            simple
            defaultCurrent={2}
            total={50}
          />
        </div> */}
      </div>
    </div>
  );
}

export default Messages;
