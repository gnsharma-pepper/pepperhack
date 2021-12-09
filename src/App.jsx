import { useState } from "react";
import HeroImage from "./assets/svg/hero-image.svg?component";
import Logo from "./assets/svg/logo.svg?component";
import { Input, Button, Card } from "antd";

import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "antd/es/input/style/index.css";
import "antd/es/button/style/index.css";
// import 'antd/es/tooltip/style/index.css';

const tabList = [
  {
    key: "content",
    tab: "Content",
  },
  {
    key: "assets",
    tab: "Assets",
  },
  {
    key: "contentAudit",
    tab: "Content Audit",
  },
  {
    key: "sitemap",
    tab: "Sitemap",
  },
];

const contentList = {
  tab1: <p>content1</p>,
  tab2: <p>content2</p>,
};

const App = () => {
  const [activeTabKey, setActiveTabKey] = useState("content");

  const onTabChange = (key) => {
    setActiveTabKey(key);
  };

  return (
    <>
      <div className="flex flex-row justify-center pt-8 pl-8 pr-12">
        <div className="flex flex-col flex-grow">
          <Logo />
          <div className="flex flex-col justify-around content-center flex-grow px-20 py-28">
            <h1> Extract all content pieces from any website </h1>
            <Input placeholder="Enter the website URL here" />
            <Button type="primary">Extract Content</Button>
          </div>
        </div>
        <HeroImage height={200} width={230} />
      </div>
      <Card
        style={{
          width: "80%",
          background: "#FFFFFF",
          boxShadow: "0px 2px 8px rgba(83, 83, 83, 0.1)",
          borderRadius: "12px",
          margin: "0px 112px 16px 112px",
        }}
        className="p-20"
        tabList={tabList}
        activeTabKey={activeTabKey}
        onTabChange={onTabChange}
        hoverable
      >
        {contentList[activeTabKey]}
      </Card>
    </>
  );
};

export default App;
