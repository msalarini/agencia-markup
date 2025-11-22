import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/blog')

export interface BlogPost {
    slug: string
    title: string
    date: string
    description: string
    author: string
    content: string
}

export function getAllPosts(): BlogPost[] {
    // Create directory if it doesn't exist
    if (!fs.existsSync(postsDirectory)) {
        return []
    }

    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames.map((fileName) => {
        // Remove ".md" from file name to get slug
        const slug = fileName.replace(/\.md$/, '')

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents)

        // Combine the data with the slug
        return {
            slug,
            title: matterResult.data.title,
            date: matterResult.data.date,
            description: matterResult.data.description,
            author: matterResult.data.author,
            content: matterResult.content,
            ...matterResult.data,
        } as BlogPost
    })

    // Sort posts by date
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1
        } else {
            return -1
        }
    })
}

export function getPostBySlug(slug: string): BlogPost | null {
    try {
        const fullPath = path.join(postsDirectory, `${slug}.md`)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents)

        return {
            slug,
            title: matterResult.data.title,
            date: matterResult.data.date,
            description: matterResult.data.description,
            author: matterResult.data.author,
            content: matterResult.content,
            ...matterResult.data,
        } as BlogPost
    } catch (error) {
        return null
    }
}
