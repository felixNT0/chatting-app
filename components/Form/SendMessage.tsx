import { SendOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input } from "antd";
import React from "react";
import { useMutation } from "react-query";
import { v4 as uuidv4 } from "uuid";
import { addMessage } from "./query";

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

  const User = currentUser.find((user: any) => user.email === user.email);

  const onFinish = () => {
    const value = form.getFieldsValue();

    const { remember, password, email, ...user } = User;

    addMss.mutate({ ...value, id: uuidv4(), createAt: new Date(), user });

    form.resetFields();
  };
  return (
    <div className="mt-5">
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item name="message" style={{ textAlign: "center" }}>
          <Input
            size="large"
            style={{ width: "70%" }}
            placeholder="Add Your Message Here..."
          />
        </Form.Item>
        <Form.Item style={{ textAlign: "center" }}>
          <Button
            loading={addMss.isLoading}
            htmlType="submit"
            style={{ width: "30%", backgroundColor: "#1890ff" }}
            size="large"
            icon={<SendOutlined />}
            type="primary"
          >
            Send
          </Button>
        </Form.Item>
      </Form>
      <Divider className="mb-0" />
    </div>
  );
}

export default SendMessage;
