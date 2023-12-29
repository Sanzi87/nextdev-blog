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

const contactSchema = z.object ({
    name: z.string().min(2, { message: 'Minimum 2 characters.' }).max(50, { message: 'Maximum 50 characters.' }).regex(/^[a-zåäöA-ZÅÄÖ\s]+$/,  { message: 'Invalid character.' }),
    email: z.string().email().min(5, { message: 'Minimum 5 characters.' }).max(50, { message: 'Maximum 50 characters.' }),
    subject: z.string().min(5, { message: 'Minimum 5 characters.' }).max(50, { message: 'Maximum 50 characters.' }).regex(/^[a-zåäöA-ZÅÄÖ0-9\s]+$/,  { message: 'Invalid character.' }),
    message: z.string().min(5, { message: 'Minimum 5 characters.' }).max(500, { message: 'Maximum 500 characters.' }).regex(/^[a-zåäöA-ZÅÄÖ0-9.,?!-:@+():\\\s]+$/,  { message: 'Invalid character.' }),
})

export {contactSchema};