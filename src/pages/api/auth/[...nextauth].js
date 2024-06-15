import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  session:{
    strategy: 'jwt'
  },
  pages: {
    signIn: '/LogIn'
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        image: { label: "Image", type: "text" },
        email: { label: "Email", type: "text" }
      },
      async authorize(credentials, req) {

        const user = { name: credentials?.username, email: credentials?.email, image: credentials?.image }

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null or false then the credentials will be rejected
          return null
          // You can also Reject this callback with an Error or with a URL:
          // throw new Error('error message') // Redirect to error page
          // throw '/path/to/redirect'        // Redirect to a URL
        }
      }
    })
  ]
})


/* import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                const postData = {
                    method: "GET"
                    headers: {
                        "Content-type": "application/json",
                    }
                };
                const res = await fetch(`http://localhost:3000/api/users`, postData);
                const userData = await res.json();
                const users = userData.users;
                const user = users.find(e => e.NAME === credentials?.username);
                if (!user || user.password !== credentials?.password) {
                    return false;
                }
                if (credentials.username === 'Admin' && credentials.password === '123123')
                    return {credentials};
                else
                    return null
            }
        })
    ],
}) */