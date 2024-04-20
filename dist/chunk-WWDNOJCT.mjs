import {
  BadRequest
} from "./chunk-JRO4E4TH.mjs";

// src/error-handler.ts
import { ZodError } from "zod";
var errorHandler = (error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: `Erro durante a valida\xE7\xE3o | Error during validation`,
      error: error.flatten().fieldErrors
    });
  }
  if (error instanceof BadRequest) {
    return reply.status(400).send({ message: error.message });
  }
  return reply.status(500).send({ message: "Erro interno do servidor! | Internal server error!" });
};

export {
  errorHandler
};
