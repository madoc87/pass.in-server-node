import {
  generateSlug
} from "./chunk-KDMJHR3Z.mjs";
import {
  BadRequest
} from "./chunk-JRO4E4TH.mjs";
import {
  prisma
} from "./chunk-JV6GRE7Y.mjs";

// src/routes/create-event.ts
import { z } from "zod";
async function createEvent(app) {
  app.withTypeProvider().post("/events", {
    schema: {
      summary: "Create an event",
      tags: ["events"],
      body: z.object({
        //Para poder usar a shor syntax nesse caso poderia desestruturar a const "data" em 3, ficando:
        //title,
        //details,
        //maximumAttendees,
        title: z.string({ invalid_type_error: "O t\xEDtulo precisa ser um texto." }).min(4),
        details: z.string().nullable(),
        maximumAttendees: z.number().int().positive().nullable()
      }),
      response: {
        201: z.object({
          eventId: z.string().uuid()
        })
      }
    }
  }, async (request, reply) => {
    const data = request.body;
    const slug = generateSlug(data.title);
    const eventWithSameSlug = await prisma.event.findUnique({
      where: {
        //Nesse caso onde no objeto os dois lados sao iguals pode se usar a short syntax que seria apenas "slug,"
        slug
      }
    });
    if (eventWithSameSlug !== null) {
      throw new BadRequest("Existe um outro evento com o mesmo titulo | Another event with same title already exists");
    }
    const event = await prisma.event.create({
      data: {
        //Se a const for desestruturada como no comentario acima, aqui poderia ser usada a short syntax ficando apenas:
        //title,
        //details,
        //maximumAttendees, 
        title: data.title,
        details: data.details,
        maximumAttendees: data.maximumAttendees,
        slug
      }
    });
    return reply.status(201).send({ eventId: event.id });
  });
}

export {
  createEvent
};
