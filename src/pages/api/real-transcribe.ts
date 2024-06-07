import { Server as NetServer } from 'http'
import { Socket } from 'net'
import { NextApiRequest, NextApiResponse } from 'next'
import { Server, Server as ServerIO } from 'socket.io'

export const config = {
  api: {
    bodyParser: false,
  },
}

export type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: Server
    }
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIO) {
  try {
    if (!res?.socket?.server?.io) {
      console.log(`New Socket.io server...`)
      const httpServer: NetServer = res.socket.server as any
      const io = new ServerIO(httpServer, {
        path: `/api/socketio`,
      })
      res.socket.server.io = io
    }
    res.end()
  } catch (err) {
    console.trace(err)
  }
}
