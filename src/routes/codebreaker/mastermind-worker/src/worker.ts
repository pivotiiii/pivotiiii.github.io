import { Room } from "./room"

export { Room }

export default {

  async fetch(request: Request, env: any) {

    const url = new URL(request.url)

    if (url.pathname.startsWith("/room/")) {

      const roomId = url.pathname.split("/")[2]

      const id = env.ROOM.idFromName(roomId)
      const room = env.ROOM.get(id)

      return room.fetch(request)

    }

    return new Response("Worker running")

  }

}