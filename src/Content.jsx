import { Button } from "antd";

import { CopyOutlined } from "@ant-design/icons";

const getAssetsList = (tree, list) => {
  if (tree.length === 0) return list;

  tree.forEach((resource) => {
    if (resource.type === "image") {
      const isExist = list.find((listItem) => listItem.url === resource.url);
      if (!isExist)
        list.push({ url: resource.url, filename: resource.filename });
    }

    if (resource.children) {
      list = getAssetsList(resource.children, list);
    }
  });
  return list;
};

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
        <div> {assetsList.length} WORDS IDENTIFIED</div>
        <Button type="primary">
          Copy Content <CopyOutlined />
        </Button>
      </div>
      <div className="content" dangerouslySetInnerHTML={createMarkup()}></div>
    </>
  );
};

export default Content;
