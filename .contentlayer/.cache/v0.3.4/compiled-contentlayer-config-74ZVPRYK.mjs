// contentlayer.config.js
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
var computedFields = {
  slug: {
    type: "string",
    resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx/, "")
  }
};
var About = defineDocumentType(() => ({
  name: "About",
  filePathPattern: `about/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    summary: { type: "string", required: false }
  },
  computedFields
}));
var Projects = defineDocumentType(() => ({
  name: "Projects",
  filePathPattern: `projects/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: false },
    summary: { type: "string", required: false },
    image: { type: "string", required: false },
    tag: {
      type: "list",
      of: { type: "string" },
      required: false
    }
  },
  computedFields
}));
var Articles = defineDocumentType(() => ({
  name: "Articles",
  filePathPattern: `articles/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    summary: { type: "string", required: true },
    publishedDate: { type: "string", required: true },
    tag: {
      type: "list",
      of: { type: "string" },
      required: true
    }
  },
  computedFields: {
    ...computedFields,
    headings: {
      type: "json",
      resolve: async (doc) => {
        const regXHeader = /\n(?<flag>#{1,6})\s+(?<content>.+)/g;
        const headings = Array.from(doc.body.raw.matchAll(regXHeader)).map(({ groups }) => {
          const flag = groups?.flag;
          const content = groups?.content;
          let level = "";
          switch (flag?.length) {
            case 1:
              level = "one";
              break;
            case 2:
              level = "two";
              break;
            case 3:
              level = "three";
              break;
            case 4:
              level = "four";
              break;
            case 5:
              level = "five";
              break;
            case 6:
              level = "six";
              break;
            default:
              level = "unknown";
          }
          return {
            level,
            text: content
          };
        });
        return headings;
      }
    }
  }
}));
var rehypePrettyOptions = {
  theme: {
    dark: "github-dark-dimmed",
    light: "github-light"
  },
  keepBackground: true
};
var contentlayer_config_default = makeSource({
  contentDirPath: "./content",
  documentTypes: [About, Projects, Articles],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings, [rehypePrettyCode, rehypePrettyOptions]]
  }
});
export {
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-74ZVPRYK.mjs.map
