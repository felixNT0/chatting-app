import { KeyOutlined, MailOutlined, WechatFilled } from "@ant-design/icons";
import { Alert, Avatar, Button, Checkbox, Form, Input, Typography } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import styles from "./Login.module.css";
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
        user.email === form.getFieldsValue().email &&
        user.password === form.getFieldsValue().password
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
    <div className={styles.root}>
      <br />
      <Avatar size={85} className={styles.avatar}>
        <WechatFilled style={{ fontSize: "70px", color: "#FFFFFF" }} />
      </Avatar>
      <h1
        style={{
          color: "#1890FF",
          marginTop: "15px",
          fontSize: "50px",
          fontWeight: "700",
        }}
      >
        Login
      </h1>
      <div className="mb-5">
        <p>Don’t have an account?</p>
        <Link href="/signup">
          <Typography.Link>Create your account</Typography.Link>
        </Link>
      </div>
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
          <Input
            prefix={<MailOutlined />}
            className={styles.input_border_radius}
            size="large"
            placeholder="Email"
          />
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
          <Input.Password
            prefix={<KeyOutlined />}
            className={styles.input_border_radius}
            size="large"
            placeholder="Password"
          />
        </Form.Item>
        <div className={styles.login_option}>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item>
            <Link href={"/reset-password"}>Forget Password?</Link>
          </Form.Item>
        </div>
        <Form.Item>
          <Button
            className={styles.input_border_radius}
            loading={loginUser.isLoading}
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
            size="large"
          >
            Join Chat
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
