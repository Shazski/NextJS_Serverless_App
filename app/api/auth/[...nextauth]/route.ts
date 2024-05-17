// import NextAuth, { DefaultSession, Profile as NextAuthProfile } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import { connectToDB } from "@utils/database";
// import User from "@models/user";

// interface Profile extends NextAuthProfile {
//   picture: string;
// }

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;
//     } & DefaultSession["user"];
//   }
// }

// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: String(process.env.GOOGLE_ID),
//       clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
//     }),
//   ],
//   callbacks: {
//     async session({ session }) {
//       if (session?.user?.email) {
//         const sessionUser = await User.findOne({ email: session.user.email });
//         session.user.id = sessionUser?._id?.toString() || "";
//       }
//       return session;
//     },
//     async signIn({
//       profile,
//     }: {
//       profile?: NextAuthProfile | undefined;
//     }) {
//       try {
//         await connectToDB();
//         const userExists = await User.findOne({ email: profile?.email });
//         if (!userExists) {
//           await User.create({
//             email: profile?.email,
//             username: profile?.name?.replace(" ", "").toLowerCase(),
//             image: (profile as Profile)?.picture || "",
//           });
//         }
//         return true;
//       } catch (error) {
//         console.error("Error during sign in:", error);
//         return false;
//       }
//     },
//   },
// });

// export { handler as GET, handler as POST };

import NextAuth, {
 DefaultSession,
 Profile as NextAuthProfile,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@models/user";
import { connectToDB } from "@utils/database";

declare module "next-auth" {
 interface Session {
  user: {
   id: string;
  } & DefaultSession["user"];
 }
}

interface Profile extends NextAuthProfile {
 picture: string;
}

const handler = NextAuth({
 providers: [
  GoogleProvider({
   clientId: String(process.env.GOOGLE_ID),
   clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
  }),
 ],
 callbacks: {
  async session({ session }: { session: any }) {
   if (session?.user?.email) {
    const userSession = await User.findOne({ email: session?.user?.email });
    session.user.id = userSession?._id.toString();
   }
   return session;
  },
  async signIn({ profile }: { profile?: NextAuthProfile | undefined }) {
   try {
    await connectToDB();
    const userExists = await User.findOne({ email: profile?.email });

    if (!userExists) {
     await User.create({
      email: profile?.email,
      username: profile?.name?.replace(" ", "").toLowerCase(),
      image:( profile as Profile)?.picture,
     });
    }
    return true;
   } catch (error) {
    console.log(error, "<< === signIn Error === >>");
    return false;
   }
  },
 },
});

export { handler as GET, handler as POST };
