import type { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST!,
  port: Number(process.env.SMTP_PORT || 1025),
  auth: process.env.SMTP_USER
    ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    : undefined,
});

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      sendVerificationRequest: async ({ identifier, url }) => {
        const domain = (process.env.EMAIL_DOMAIN || "@usc.edu").toLowerCase();
        if (!identifier.toLowerCase().endsWith(domain)) {
          throw new Error(`Email must end with ${domain}`);
        }
        await transporter.sendMail({
          to: identifier,
          from: "no-reply@matchboard.local",
          subject: "Your sign-in link",
          html: `<p>Click to sign in:</p><p><a href="${url}">Sign in</a></p>`,
          text: `Sign in: ${url}`,
        });
      },
    }),
  ],
  session: { strategy: "database" },
  pages: { signIn: "/login" },
  callbacks: {
    async session({ session, user }) {
      if (session.user) (session.user as any).id = user.id;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV !== "production",
};
