import WebPush from 'web-push'
import { FastifyInstance } from "fastify"
import { z } from 'zod'

// ele vai gerar uma chave que  aparecer no cosole tem uma public e uma private
//  console.log(WebPush.generateVAPIDKeys())
const publicKey = 'BG37nfxG-Te8_4jOFubdZnSGgeo0T4Bth4HStM2XjkieBfh9ZDr_4XkI_x6Ys3Zp4ZwbknSWPeS9f22TqXvqaWo'
const privateKey = 'rE3qcUG7wumhRuubsjAi26TExzFwWw-g2Vh5QXEjTaY'

WebPush.setVapidDetails(
  'http://localhost:3333', publicKey, privateKey)

export async function notificationRoutes(app: FastifyInstance) {
  app.get('/push/public_key', () =>{
    return {
      publicKey,
    }
  })

  app.post('/push/register', (request,reply) => {
    // console.log(request.body)    
    return reply.status(201).send()
  })

   app.post('/push/send',async  (request, reply) => {
    // console.log(request.body)
    const sendPushBody = z.object({
      subscription: z.object({
        endpoint: z.string(),
    keys: z.object({
      p256dh: z.string(),
      auth: z.string(),

    })
  })
})

  const {subscription} = sendPushBody.parse(request.body)

setTimeout(() => {
  WebPush.sendNotification(subscription, 'HELLO DO BACKEND!')

}, 5000)
    return reply.status(201).send()
    
  })
  
}
