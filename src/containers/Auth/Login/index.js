import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Checkbox } from "@duik/it";
import Icon from "@duik/icon";
import { Spin, Select, Form, Input } from "antd";
import {
  UserOutlined,
  LockOutlined,
  LoadingOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";

import { userLoginRequest, loadMe } from "../../../actions/user";

import LoadingSpinner from "../../../components/LoadingSpinner";
import "./styles.scss";

const { Option } = Select;
const logoImg = require("../../../assets/img/DeltaDevOps.png");
const backgroundImg = require("../../../assets/img/background2.png");

const Login = (props) => {
  const settings = JSON.parse(localStorage.getItem("settings"));
  const dispatch = useDispatch();
  const providers = useSelector((state) => state.settings.providers);
  const loginLoading = useSelector((state) => state.user.loginLoading);
  const isLoginSuccess = useSelector((state) => state.user.isLoginSuccess);
  const loginError = useSelector((state) => state.user.loginError);
  const [loginLink, setLoginLink] = useState(settings?.providerLoginLink);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [error, setError] = useState(null);

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    setIsLoadingLogin(true);
    await dispatch(userLoginRequest(loginLink, values));
    setIsLoading(true);
    await dispatch(loadMe());
    props.history.push("/Dashboard");
  };

  useEffect(() => {
    if (providers.length > 0) setLoginLink(providers[0].actions.login);
  }, [providers, loginError]);

  useEffect(() => {
    setIsLoadingLogin(loginLoading);
    if (loginError) {
      setIsLoading(false);
      setError(
        "Logging in failed: Check credentials, or your account may not be authorized to log in."
      );
    }
  }, [loginLoading, loginError]);

  useEffect(() => {
    setIsLoading(false);
    setError(null);
  }, [isLoginSuccess]);

  const LoginForm = () => (
    <div className="login">
      <div className="logo-wrapper">
        <img src={logoImg} alt="" />
      </div>
      <div className="language-dropdown">
        <Icon>globe_network</Icon>
        <Select defaultValue="en" bordered={false}>
          <Option value="en">English</Option>
        </Select>
      </div>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        size="large"
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            type="text"
            label="UserName"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
            style={{ borderRadius: 5 }}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password
            label="Password"
            prefix={<LockOutlined className="site-form-item-icon" />}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            type="password"
            placeholder="Password"
            style={{ borderRadius: 5 }}
          />
        </Form.Item>
        <Form.Item className="row login-form-actions">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox label="Remember me" />
          </Form.Item>
          <Link style={{ margin: 0, fontSize: "0.875rem" }} to="#">
            Forgot password?
          </Link>
        </Form.Item>
        <Form.Item>
          {!isLoadingLogin ? (
            <Button success className="login-form-button" type="submit">
              Log In
            </Button>
          ) : (
            <Button success className="login-form-button">
              <Spin
                indicator={
                  <LoadingOutlined
                    className="loading-indicator"
                    style={{ color: "#fff", paddingTop: 5, fontSize: 20 }}
                    spin
                  />
                }
              />
              Logging In...
            </Button>
          )}
        </Form.Item>
        {error && (
          <Form.Item>
            <div className="login-form-error">{error}</div>
          </Form.Item>
        )}
      </Form>
    </div>
  );

  return (
    <div className="app-container">
      <img
        className="background"
        src={backgroundImg}
        width="100%"
        height="100%"
        alt=""
      />
      {isLoading ? <LoadingSpinner /> : <LoginForm />}
    </div>
  );
};

export default Login;
