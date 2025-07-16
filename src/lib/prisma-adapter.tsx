import { Adapter } from 'next-auth/adapters'
import { prisma } from './prisma'

export function PrismaAdapter(): Adapter {
  return {
    async createUser(user: {
      name?: string | null
      username?: string | null
      email?: string | null
      image?: string | null
    }) {
      const createdUser = await prisma.user.create({
        data: {
          name: user.name ?? '',
          username: user.username ?? '',
          email: user.email,
          avatar_url: user.image,
        },
      })
      return {
        id: createdUser.id,
        name: createdUser.name,
        username: createdUser.username,
        email: createdUser.email!,
        emailVerified: null,
        image: createdUser.avatar_url!,
      }
    },

    async getUser(id) {
      const user = await prisma.user.findUnique({
        where: { id },
      })
      if (!user) return null
      return {
        id: user.id,
        name: user.name ?? '',
        username: user.username,
        email: user.email!,
        emailVerified: null,
        image: user.avatar_url!,
      }
    },

    async getUserByEmail(email) {
      const user = await prisma.user.findUnique({
        where: { email },
      })
      if (!user) return null
      return {
        id: user.id,
        name: user.name ?? '',
        username: user.username,
        email: user.email!,
        emailVerified: null,
        image: user.avatar_url!,
      }
    },

    async getUserByAccount({ providerAccountId, provider }) {
      const account = await prisma.account.findUnique({
        where: {
          provider_providerAccountId: {
            provider,
            providerAccountId,
          },
        },
        include: { user: true },
      })
      if (!account || !account.user) return null
      const user = account.user
      return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email!,
        emailVerified: null,
        image: user.avatar_url!,
      }
    },

    async updateUser(user) {
      const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
          name: user.name ?? '',
          username: user.username ?? '',
          email: user.email,
          avatar_url: user.image,
        },
      })
      return {
        id: updatedUser.id,
        name: updatedUser.name,
        username: updatedUser.username,
        email: updatedUser.email!,
        emailVerified: null,
        image: updatedUser.avatar_url!,
      }
    },

    async deleteUser(id) {
      await prisma.user.delete({
        where: { id },
      })
    },

    async linkAccount(account: {
      userId: string
      type: string
      provider: string
      providerAccountId: string
      refresh_token?: string | null
      access_token?: string | null
      expires_at?: number | null
      token_type?: string | null
      scope?: string | null
      id_token?: string | null
      session_state?: string | null
    }) {
      await prisma.account.create({
        data: {
          userId: account.userId,
          type: account.type,
          provider: account.provider,
          providerAccountId: account.providerAccountId,
          refresh_token: account.refresh_token,
          access_token: account.access_token,
          expires_at: account.expires_at,
          token_type: account.token_type,
          scope: account.scope,
          id_token: account.id_token,
          session_state: account.session_state,
        },
      })
    },

    async unlinkAccount({ providerAccountId, provider }: { providerAccountId: string; provider: string }) {
      await prisma.account.delete({
        where: {
          provider_providerAccountId: {
            provider,
            providerAccountId,
          },
        },
      })
    },

    async createSession({ sessionToken, userId, expires }) {
      await prisma.session.create({
        data: {
          sessionToken,
          userId,
          expires,
        },
      })
      return {
        sessionToken,
        userId,
        expires,
      }
    },

    async getSessionAndUser(sessionToken) {
      const session = await prisma.session.findUnique({
        where: { sessionToken },
        include: { user: true },
      })
      if (!session || !session.user) return null
      const user = session.user
      return {
        session: {
          sessionToken: session.sessionToken,
          userId: session.userId,
          expires: session.expires,
        },
        user: {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email!,
          emailVerified: null,
          image: user.avatar_url!,
        },
      }
    },

    async updateSession({ sessionToken, expires, userId }) {
      const session = await prisma.session.update({
        where: { sessionToken },
        data: { expires, userId },
      })
      return {
        sessionToken: session.sessionToken,
        userId: session.userId,
        expires: session.expires,
      }
    },

    async deleteSession(sessionToken) {
      await prisma.session.delete({
        where: { sessionToken },
      })
    },
  }
}
