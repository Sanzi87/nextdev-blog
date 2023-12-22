import {z} from 'zod';

const categorySchema = z.object ({
    title: z.string().min(5).max(191),
    slug: z.string().min(5).max(191),
    desc: z.string().max(191),
    img: z.string().max(191)
})


export  {categorySchema};

const postSchema = z.object ({
    title: z.string().min(5).max(191),
    slug: z.string().min(5).max(191),
    catSlug: z.string().min(5).max(191),
    userId: z.string().min(1).max(191),
    img: z.string().max(191),
    short: z.string().max(191),
    desc: z.string().min(10).max(20000),
})

export  {postSchema};