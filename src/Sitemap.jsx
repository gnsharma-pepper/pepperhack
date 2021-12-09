import { Card } from "antd";

const getSitemap = (tree, list) => {
  if (tree.length === 0) return list;

  tree.forEach((resource) => {
    if (resource.type === "html") {
      const isExist = list.find((listItem) => listItem.url === resource.url);
      if (!isExist)
        list.push({
          url: resource.url,
          filename: resource.filename,
          depth: resource.depth,
        });
    }

    if (resource.children) {
      list = getSitemap(resource.children, list);
    }
  });
  return list;
};

const Sitemap = ({ extractedContent }) => {
  if (!extractedContent)
    return <div>Enter the URL above to see the assets</div>;

  console.log({ sitemap: extractedContent.sitemap });

  let sitemap = extractedContent.sitemap;
  if (!sitemap) {
    sitemap = getSitemap(extractedContent.tree, []);
  }
  console.log({ sitemap });

  return (
    <>
      <div className="flex justify-between mb-8">
        <div> {sitemap.length} LINKS IDENTIFIED</div>
      </div>
      {sitemap.map((resource, index) => {
        return (
          <div
            style={{
              border: "1px solid #f0f0f0",
              padding: "24px",
              marginLeft: (resource.depth + 1) * 16,
              marginBottom: 10,
            }}
            key={index}
          >
            <a href={resource.url}> {resource.url}</a>
          </div>
        );
      })}
    </>
  );
};

export default Sitemap;
