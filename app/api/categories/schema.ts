import {z} from 'zod';

const schema = z.object ({
    title: z.string().min(5),
    slug: z.string().min(5)
})

export default schema;