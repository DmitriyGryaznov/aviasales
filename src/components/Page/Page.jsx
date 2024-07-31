import React from "react";
import styles from "./Page.module.css";
import { ReactComponent as Logo } from "../../assets/icons/Logo.svg";
import { Layout, Flex, Space } from "antd";
import classNames from "classnames";
import AviaList from "../AviaList/AviaList";
import MyTabs from "../MyTabs/MyTabs";
import AviaFilter from "../AviaFilter/AviaFilter";

const { Header, Footer, Sider, Content } = Layout;
const headerStyle = {
  textAlign: "center",
  color: "black",
  height: 164,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#F3F7FA",
  margin: 10,
};
const contentStyle = {
  textAlign: "center",
  minHeight: 120,
  color: "black",
  margin: 10,
};
const siderStyle = {
  textAlign: "center",
  lineHeight: "40px",
  maxHeight: "250px",
  color: "black",
  backgroundColor: "#FFFFFF",
  margin: 10,
};
const footerStyle = {
  textAlign: "center",
  color: "black",
  backgroundColor: "#F3F7FA",
  margin: 10,
};
const layoutStyle = {
  borderRadius: 8,
  overflow: "hidden",
  // width: 960,
  maxWidth: 960,
  // height: 1350,
  // maxHeight: 1350,
  marginTop: 0,
};
const flexStyle = {
  // width: 960,
  // height: 1350,
  // maxHeight: 1350,
  backgroundColor: "#F3F7FA",
};
const logoStyle = {
  marginLeft: 290,
  marginTop: 40,
  padding: 0,
  height: 80,
  width: 80,
};

const Page = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.main}>
        <div className={styles.filters}>
          <AviaFilter />
        </div>
        <div className={styles.list}>
          <MyTabs />
          <AviaList />
        </div>
      </div>
    </div>
  );
};

export default Page;
