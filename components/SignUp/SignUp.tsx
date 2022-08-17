import {
  KeyOutlined,
  MailOutlined,
  UserOutlined,
  WechatFilled,
} from "@ant-design/icons";
import emailjs from "@emailjs/browser";
import { Alert, Avatar, Button, Checkbox, Form, Input, Typography } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { v4 as uuidv4 } from "uuid";
import { fetchUser, postCurrentUser, postData } from "./query";
import styles from "./SignUp.module.css";

const SignUp = () => {
  const [form] = Form.useForm();

  const [error, setError] = useState<string>();

  const router = useRouter();

  const { data } = useQuery("users", fetchUser);
  const result = data && data;

  const signUpUser = useMutation(postData);

  const currentUser = useMutation(postCurrentUser);

  const onFinish = async () => {
    let checkUser = result.find(
      (user: any) =>
        user.email === form.getFieldsValue().email &&
        user.password === form.getFieldsValue().password &&
        user.username === form.getFieldsValue().username &&
        user.full_name === form.getFieldsValue().full_name
    );
    if (checkUser) {
      setError(
        `${
          form.getFieldsValue().username
        }, You have an account already click on login to log you to your account`
      );
      return;
    } else {
      let { confirm_password, ...others } = form.getFieldsValue();
      let user = {
        ...others,
        id: uuidv4(),
        createdAt: new Date(),
      };
      await emailjs
        .send(
          "service_e4zpwal",
          "template_s6z9i7u",
          form.getFieldsValue(),
          "Ia3qhzbvtlw8-6ePl"
        )
        .then(
          (result) => {
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        );
      signUpUser.mutate(user);
      currentUser.mutate(user);
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
        Create Account
      </h1>
      <div className="mb-5">
        <p>Already have account?</p>
        <Link href="/login">
          <Typography.Link>Login to you account</Typography.Link>
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
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            className={styles.input_border_radius}
            size="large"
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          label="Full Name"
          name="full_name"
          rules={[
            {
              required: true,
              message: "Please input your Full Name!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            className={styles.input_border_radius}
            size="large"
            placeholder="Full Name"
          />
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
        <Form.Item
          label="Confirm Password"
          name="confirm_password"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<KeyOutlined />}
            size="large"
            placeholder="Confirm Password"
            className={styles.input_border_radius}
          />
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button
            className={styles.input_border_radius}
            loading={signUpUser.isLoading}
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
            size="large"
          >
            Create Account
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUp;
