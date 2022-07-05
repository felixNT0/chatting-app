import { Alert, Button, Checkbox, Form, Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { v4 as uuidv4 } from "uuid";
import { fetchUser, postCurrentUser, postData } from "./query";

const SignUp = () => {
  const [form] = Form.useForm();

  const [error, setError] = useState<string>();

  const router = useRouter();

  const { data } = useQuery("users", fetchUser);
  const result = data && data;

  const signUpUser = useMutation(postData);

  const currentUser = useMutation(postCurrentUser);

  const onFinish = () => {
    let checkUser = result.find(
      (user: any) =>
        user.email === form.getFieldsValue().email &&
        user.password === form.getFieldsValue().password
    );
    if (checkUser) {
      setError(
        `${
          form.getFieldsValue().username
        }, You have an account already click on login to log you to your account`
      );
      return;
    } else {
      let user = { ...form.getFieldsValue(), id: uuidv4() };
      signUpUser.mutate(user);
      currentUser.mutate(user);
      router.push("/");
    }
  };

  return (
    <div style={{ marginTop: "15px", textAlign: "center", padding: "0px 30%" }}>
      <h1>Create Account with Periconn to Join Chat</h1>
      <Form
        onFinish={onFinish}
        form={form}
        autoComplete="off"
        layout="vertical"
      >
        {error && (
          <div className="text-center, mb-5">
            <Alert message={error} type="error" showIcon closable />
          </div>
        )}
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input size="large" placeholder="Username" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input size="large" placeholder="Email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password size="large" placeholder="Password" />
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button
            loading={signUpUser.isLoading}
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
            size="large"
          >
            Join Chat
          </Button>
        </Form.Item>
        <br />
        Or <Link href="/login">login now!</Link>
      </Form>
    </div>
  );
};

export default SignUp;
