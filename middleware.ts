export { default } from 'next-auth/middleware';

export const config ={
    matcher: [
        '/categories/new',
        '/categories/:slug+/edit',
        '/posts/new',
        '/posts/:slug+/edit'
    ]
}