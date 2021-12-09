import { Button } from "antd";

import { CopyOutlined } from "@ant-design/icons";

const Content = ({ extractedContent }) => {
  if (!extractedContent)
    return <div>Enter the URL above to see the assets</div>;

  console.log({ content: extractedContent.content });

  function createMarkup() {
    return { __html: extractedContent.content };
  }

  return (
    <>
      <div className="flex justify-between">
        <div> {extractedContent.wordCount} WORDS IDENTIFIED</div>
        <Button type="primary">
          Copy Content <CopyOutlined />
        </Button>
      </div>
      <div className="content" dangerouslySetInnerHTML={createMarkup()}></div>
    </>
  );
};

export default Content;
