import { Divider, Form, Input, notification } from "antd";
import type { NotificationPlacement } from "antd/lib/notification";
import React from "react";
import { useMutation } from "react-query";
import { v4 as uuidv4 } from "uuid";
import { addMessage } from "./query";

const { Search } = Input;

interface Props {
  refetch: any;
  currentUser: any;
}

function SendMessage({ refetch, currentUser }: Props) {
  const [form] = Form.useForm();

  const addMss = useMutation(addMessage, {
    onSuccess: () => {
      refetch();
    },
  });

  const openNotification = (placement: NotificationPlacement) => {
    notification.error({
      message: `Type something don't submit empty value`,
      placement,
    });
  };

  const User = currentUser.find((user: any) => user.email === user.email);

  const onFinish = (value: string) => {
    if (value === "") {
      openNotification("top");
      return;
    } else {
      const message = { message: value };

      const { remember, password, email, ...user } = User;

      addMss.mutate({ ...message, id: uuidv4(), createAt: new Date(), user });
    }
  };
  return (
    <div className="mt-5 text-center">
      <Search
        style={{ width: "50%" }}
        placeholder="Type your message here..."
        allowClear
        enterButton="Send"
        size="large"
        onSearch={onFinish}
      />
      <Divider className="mb-0" />
    </div>
  );
}

export default SendMessage;
