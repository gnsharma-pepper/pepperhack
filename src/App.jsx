import { useState } from "react";
import HeroImage from "./assets/svg/hero-image.svg?component";
import Logo from "./assets/svg/logo.svg?component";
import { Input, Button, Card } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

import Assets from "./Assets";
import Content from "./Content";
import Sitemap from "./Sitemap";

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

const App = () => {
  const [activeTabKey, setActiveTabKey] = useState("content");
  const [inputUrl, setInputUrl] = useState("");
  const [extractedContent, setExtractedContent] = useState();

  const onTabChange = (key) => {
    setActiveTabKey(key);
  };

  const getEXtractedContentData = async () => {
    const response = await fetch(
      `https://c87e-3-109-210-119.ngrok.io/scrape?url=${inputUrl}`
    );
    const sitemapResponse = await fetch(
      `https://c87e-3-109-210-119.ngrok.io/sitemap?url=${inputUrl}`
    );
    console.log({ response, sitemapResponse });
    if (response.status === 200) {
      const scrapeResponse = await response.json();
      setExtractedContent((extractedContent) => {
        return { ...extractedContent, ...scrapeResponse };
      });
    }
    if (sitemapResponse.status === 200) {
      const sitemap = await sitemapResponse.json();
      setExtractedContent((extractedContent) => {
        return { ...extractedContent, sitemap };
      });
    }
  };

  const contentList = {
    content: <Content extractedContent={extractedContent} />,
    assets: <Assets extractedContent={extractedContent} />,
    contentAudit: <p>Soon to be available</p>,
    sitemap: <Sitemap extractedContent={extractedContent} />,
  };

  console.log({ extractedContent });
  return (
    <>
      <div className="flex flex-row justify-center pt-8 pl-8 pr-32">
        <div className="flex flex-col flex-grow">
          <Logo />
          <div className="flex flex-wrap justify-start content-evenly flex-grow px-20 py-20">
            <h1 className="text-4xl">
              Extract all content pieces from any website
            </h1>
            <Input
              placeholder="Enter the website URL here"
              value={inputUrl}
              onChange={(event) => setInputUrl(event.target.value)}
            />
            <Button
              type="primary"
              onClick={getEXtractedContentData}
              style={{ background: "#1DC96C", borderRadius: "24px" }}
            >
              Extract Content <ArrowRightOutlined />
            </Button>
          </div>
        </div>
        <div className="flex-grow">
          <HeroImage height={200} width={230} />
        </div>
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
        headStyle={{
          background: "#F8F9FA",
          borderRadius: "12px 12px 0px 0px",
        }}
        onTabChange={onTabChange}
      >
        {contentList[activeTabKey]}
      </Card>
    </>
  );
};

export default App;
