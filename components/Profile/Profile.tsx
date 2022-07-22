import { CaretDownOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Tooltip, Typography } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import { MessageAuthor } from "../MessageDisplay/MessageCard";

const { Text, Title } = Typography;
const { Meta } = Card;

interface Props {
  user: any;
  messages: any;
}

function Profile({ user, messages }: Props) {
  const findUserMessage = messages.filter(
    (mss: any) => mss.user.id === user.id
  );

  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow((prev) => !prev);
  };

  return (
    <div>
      {user && (
        <div>
          <div className="mt-5 mb-10 text-center">
            <Tooltip title={user.username} placement="top">
              <Avatar
                className="mt-10 text-center"
                size="large"
                src="https://joeschmoe.io/api/v1/random"
              />
            </Tooltip>
          </div>
          <div className="text-center">
            <Text type="secondary">
              Joined {dayjs(`${user.createdAt}`).format("DD of MMMM, YYYY")}
            </Text>
            <Title level={3}>{user.full_name}</Title>
            <Title level={5}>{user.username}</Title>
            <Text type="secondary">{user.email}</Text>
          </div>
        </div>
      )}
      <div className="mb-5 mt-5 text-center">
        <Button
          onClick={toggleShow}
          icon={<CaretDownOutlined />}
          type="primary"
        >
          Show User Messages
        </Button>
      </div>
      {show && (
        <div>
          {findUserMessage &&
            findUserMessage.map((mss: any, index: number) => (
              <div key={index} className="text-center ma-10">
                <Card
                  className="text-center"
                  style={{
                    boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)",
                    width: "50%",
                    marginTop: 16,
                    textAlign: "center",
                    border: "1px solid #1890ff",
                  }}
                >
                  <Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    description={<Title level={5}>{mss.message}</Title>}
                    title={<MessageAuthor user={mss.user} curentUser={user} />}
                  />
                </Card>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default Profile;
