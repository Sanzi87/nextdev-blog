import {z} from 'zod';

const categorySchema = z.object ({
    title: z.string().min(5).max(255),
    slug: z.string().min(5).max(255)
})


export  {categorySchema};

const postSchema = z.object ({
    title: z.string().min(5).max(255),
    slug: z.string().min(5).max(255),
    desc: z.string().min(10).max(20000),
    catSlug: z.string().min(5).max(255),
    userEmail: z.string().email().min(5).max(255)
})

export  {postSchema};