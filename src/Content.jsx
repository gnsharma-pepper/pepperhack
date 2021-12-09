const getCSSFiles = (tree, list) => {
  if (tree.length === 0) return list;

  tree.forEach((resource) => {
    if (resource.type === "css" && resource.depth === 1) {
      const isExist = list.find((listItem) => listItem.url === resource.url);
      if (!isExist)
        list.push({ url: resource.url, filename: resource.filename });
    }

    if (resource.children) {
      list = getCSSFiles(resource.children, list);
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

  const styleSheets = getCSSFiles(extractedContent.tree, []);
  console.log({ styleSheets });

  return (
    <>
      <div className="flex justify-between">
        <div> {extractedContent.wordCount} WORDS IDENTIFIED</div>
      </div>
      <div className="content" dangerouslySetInnerHTML={createMarkup()}></div>
      {/* {styleSheets.map((styleSheet, index) => {
        return (
          <link
            rel="stylesheet"
            type="text/css"
            href={styleSheet.url}
            key={index}
          />
        );
      })} */}
    </>
  );
};

export default Content;
