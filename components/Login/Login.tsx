import { Alert, Button, Checkbox, Form, Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { fetchUser, postCurrentUser } from "./query";

const Login = () => {
  const [form] = Form.useForm();

  const router = useRouter();

  const [error, setError] = useState<string>();

  const { data } = useQuery("users", fetchUser);
  const result = data && data;

  const loginUser = useMutation(postCurrentUser);

  const onFinish = () => {
    let user = result.find(
      (user: any) =>
        (user.email === form.getFieldsValue().email &&
          user.password === form.getFieldsValue().password) ||
        user.remember === form.getFieldsValue().remember
    );

    if (!user) {
      setError("Invalid email/password");
      return;
    } else {
      loginUser.mutate(user);
      router.push("/");
    }
  };

  return (
    <div style={{ marginTop: "15px", textAlign: "center", padding: "0px 30%" }}>
      <h1>Login with Ndakolo to Join Chat</h1>
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
            loading={loginUser.isLoading}
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
            size="large"
          >
            Join Chat
          </Button>
        </Form.Item>
        <br />
        Or <Link href="/signup">create account now!</Link>
      </Form>
    </div>
  );
};

export default Login;
