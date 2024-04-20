import {
  getEvent
} from "./chunk-UA43UVJJ.mjs";
import {
  registerForEvent
} from "./chunk-AV63YJXI.mjs";
import {
  errorHandler
} from "./chunk-WWDNOJCT.mjs";
import {
  checkIn
} from "./chunk-DWYKUD6P.mjs";
import {
  createEvent
} from "./chunk-NCTN4MCS.mjs";
import "./chunk-KDMJHR3Z.mjs";
import {
  getAttendeeBadge
} from "./chunk-6VZ7CGN2.mjs";
import "./chunk-JRO4E4TH.mjs";
import {
  getEventAttendees
} from "./chunk-4RZRUVSW.mjs";
import "./chunk-JV6GRE7Y.mjs";

// src/server.ts
import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import fastifyCors from "@fastify/cors";
import { serializerCompiler, validatorCompiler, jsonSchemaTransform } from "fastify-type-provider-zod";
var app = fastify().withTypeProvider();
app.register(fastifyCors, {
  //Em produção é importante que isso seja alterado para o dominio do frontend, dessa forma somente o frontend vai poder consumir essa API
  //origin: 'http://meufrontend.com', //Então somente essa URL poderia acessar a API
  origin: "*"
});
app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "pass.in",
      description: "Especifica\xE7\xF5es da API para back-end da aplica\xE7\xE3o pass.in construida durante o NLW Unite da Rocketseat.",
      version: "1.0.0"
    }
  },
  transform: jsonSchemaTransform
});
app.register(fastifySwaggerUI, {
  routePrefix: "/docs"
});
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(createEvent);
app.register(registerForEvent);
app.register(getEvent);
app.register(getAttendeeBadge);
app.register(checkIn);
app.register(getEventAttendees);
app.setErrorHandler(errorHandler);
var serverPort = 3355;
app.listen({ port: serverPort, host: "0.0.0.0" }).then(() => {
  console.log("HTTP server running!");
});
export {
  app
};
