import path from "path"
import fs from "fs"
import type { GatsbyNode } from "gatsby"

const toSlug = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")

const toTitle = (value: string): string =>
  value
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, match => match.toUpperCase())

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] =
  ({ actions }) => {
    actions.createTypes(`
      type MarkdownRemark implements Node {
        fields: MarkdownRemarkFields
        frontmatter: MarkdownRemarkFrontmatter
      }

      type MarkdownRemarkFields {
        slug: String!
        title: String!
      }

      type MarkdownRemarkFrontmatter {
        title: String
        date: Date @dateformat
        description: String
        page: String
      }
    `)
  }

export const onCreateNode: GatsbyNode["onCreateNode"] = ({
  node,
  getNode,
  actions,
}) => {
  if (node.internal.type !== "MarkdownRemark") {
    return
  }

  if (!node.parent) {
    return
  }

  const parent = getNode(node.parent)

  if (!parent || parent.internal.type !== "File") {
    return
  }

  const fileNode = parent as unknown as {
    name: string
    relativeDirectory: string
    sourceInstanceName?: string
  }

  if (fileNode.sourceInstanceName !== "blog") {
    return
  }

  const relativePath = [fileNode.relativeDirectory, fileNode.name]
    .filter(Boolean)
    .join("/")
  const slug = `/blog/${toSlug(relativePath)}/`

  actions.createNodeField({
    node,
    name: "slug",
    value: slug,
  })

  actions.createNodeField({
    node,
    name: "title",
    value: toTitle(fileNode.name),
  })
}

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
  reporter,
}) => {
  const result = await graphql<{
    allMarkdownRemark: {
      nodes: Array<{
        id: string
        html: string
        fields: {
          slug: string
          title: string
        }
        frontmatter: {
          title: string | null
          date: string | null
        }
      }>
    }
  }>(`
    {
      allMarkdownRemark(
        filter: { fields: { slug: { regex: "/^\\/blog\\//" } } }
      ) {
        nodes {
          id
          html
          fields {
            slug
            title
          }
          frontmatter {
            title
            date(formatString: "MMMM D, YYYY")
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild("Failed to load blog posts", result.errors)
    return
  }

  const postTemplate = path.resolve("./src/templates/blog-post.tsx")

  result.data?.allMarkdownRemark.nodes.forEach(post => {
    actions.createPage({
      path: post.fields.slug,
      component: postTemplate,
      context: {
        id: post.id,
        html: post.html,
        title: post.frontmatter.title || post.fields.title,
        date: post.frontmatter.date,
      },
    })
  })
}

// The resume page gets the resolved resume (fetched by scripts/fetch-resume.sh)
// through its page context, or null when the file is absent.
export const onCreatePage: GatsbyNode["onCreatePage"] = ({ page, actions }) => {
  if (page.path !== "/resume/") {
    return
  }

  const file = path.resolve("./content/resume/resume.json")
  let resume: unknown = null
  if (fs.existsSync(file)) {
    resume = JSON.parse(fs.readFileSync(file, "utf8"))
  }

  actions.deletePage(page)
  actions.createPage({
    ...page,
    context: { ...page.context, resume },
  })
}
