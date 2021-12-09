import { Button } from "antd";
import { useEffect } from "react";
import Colcade from "colcade";

import { DownloadOutlined } from "@ant-design/icons";

import "./assets.css";

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

const Assets = ({ extractedContent }) => {
  useEffect(() => {
    let grid = document.querySelector(".grid-assets");
    if (grid) {
      let colc = new Colcade(grid, {
        columns: ".grid-assets-col",
        items: ".grid-assets-item",
      });
    }
  });

  if (!extractedContent)
    return <div>Enter the URL above to see the assets</div>;

  const assetsList = getAssetsList(extractedContent.tree, []);
  console.log({ assetsList });

  return (
    <>
      <div className="flex justify-between">
        <div> {assetsList.length} ASSETS IDENTIFIED</div>
        <Button type="primary">
          Download All <DownloadOutlined />
        </Button>
      </div>
      <div className="grid-assets">
        <div className="grid-assets-col grid-assets-col--1"></div>
        <div className="grid-assets-col grid-assets-col--2"></div>
        <div className="grid-assets-col grid-assets-col--3"></div>
        <div className="grid-assets-col grid-assets-col--4"></div>
        {assetsList.map((asset, index) => {
          return <img src={asset.url} className="grid-assets-item" />;
        })}
      </div>
    </>
  );
};

export default Assets;
