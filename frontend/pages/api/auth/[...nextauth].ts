import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Auth0Provider from "next-auth/providers/auth0";
export default NextAuth({
    providers: [
      GoogleProvider({
            name: "google",
            clientId: "520033415673-cf6cuprrqljl4csksjncrpneuojs8e18.apps.googleusercontent.com",
            clientSecret: "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",
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        
        }),

        Auth0Provider({
            clientId: "WEGpbc7HkqhkI5Zz3vvCe2n51pZWQZak",
            clientSecret: "9DlkM6X6lelZpkSQozhqIiUUt5CxbQAZjUk7KpjLrv2tz9IdRCapDec9-cpeokZc",
            issuer: "https://dev-cwn-h9nt.us.auth0.com",
        })
    ],
     session: {
    // Set the maximum age of the session to 7 days (in seconds)
    maxAge: 10*60, // 10 minutes in seconds
  },
    callbacks: {
   signIn: async (user: User, account: any, profile: any) => {
      // Custom sign-in callback logic
      // Here you can perform any additional actions or return data

      const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
        // include any other user data you need
        // redirectUrl: "/login/signup", // Specify the redirect URL
      };

      return Promise.resolve(userData); // Return the user data as a resolved promise
    },
  },
    theme: {
        colorScheme: "light", // "auto" | "dark" | "light"
        brandColor: "", // Hex color code
        logo: "", // Absolute URL to image
    },
});