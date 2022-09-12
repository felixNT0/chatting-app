import { Button, Empty, Input, notification } from "antd";
import type { NotificationPlacement } from "antd/lib/notification";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { UserType } from "../../types/users";
import SendMessage from "../Form/SendMessage";
import MessageCard from "./MessageCard";
import { fetchMessages, searchMessages } from "./query";

dayjs.extend(relativeTime);

interface Props {
  currentUser: UserType[] | null;
}

const { Search } = Input;

function Messages({ currentUser }: Props) {
  // const [current, setCurrent] = useState(1);
  const { data, refetch, isLoading } = useQuery(
    ["messages"],
    fetchMessages
    // { keepPreviousData: true }
  );

  const audioPlayer = useRef<any>(null);

  function playAudio() {
    audioPlayer.current.play();
  }

  // const onChange = (page: any) => {
  //   setCurrent(page);
  // };

  const result = data && data;

  const [values, setValues] = useState("");

  const searchResult = useQuery(["searchMessages", values], () =>
    searchMessages(values)
  );

  const searchedMessage = searchResult.data && searchResult.data;

  const handleSearchSubmit = (value: string) => {
    if (value) {
      setValues(value);
    } else if (value && searchResult.data.length === 0) {
      openNotification("top", value);
    } else if (value === "") {
      refetch();
    }
  };

  const openNotification = (
    placement: NotificationPlacement,
    value: string
  ) => {
    notification.error({
      message: `${value} Search not Found`,
      placement,
    });
  };

  useEffect(() => {
    if (values === "") {
      refetch();
    }
  }, [values]);

  return (
    <div
      style={{
        padding: "0px 15%",
        marginTop: "25px",
      }}
    >
      <Button type="primary" onClick={playAudio}>
        Play
      </Button>
      <audio ref={audioPlayer} src={"/sound.wav"} />
      <div className="text-center mb-5">
        <Search
          required
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
        {result && searchedMessage && (
          <div>
            <MessageCard
              values={values}
              searchMessage={searchedMessage}
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
