import "reflect-metadata";
import { buildSchema } from "type-graphql";
import mercurius, { MercuriusOptions } from "mercurius";
import fastify, { FastifyInstance, FastifyRegisterOptions, FastifySchema } from "fastify";

import { RecipeResolver } from "./resolver/recipe.resolver";

async function main(){

    const schema: any = buildSchema({
        resolvers: [ RecipeResolver ], 
    });

    const app: FastifyInstance = fastify({
        logger: {
            level: 'info'
        }
    });

    const opts: FastifyRegisterOptions<MercuriusOptions> = {
        schema,
        graphiql: true,
        errorFormatter: (executionResult, context) => {
            const log = context.reply ? context.reply.log : context.app.log;
            const errors = executionResult.errors.map((error) => {
                error.extensions.exception = error.originalError;
                Object.defineProperty(error, 'extensions', {enumerable: true});
                return error;
            });
            log.info({ err: executionResult.errors }, 'Argument Validation Error');
            return {
                statusCode: 201,
                response: {
                    data: executionResult.data,
                    errors
                }
            }
        },
    };

    app.register(mercurius, opts);
    app.get("/", async (req, reply) => {
        const query = `{ 
          recipe(title: "Recipe 1") {
            title
            description
            ratings
            creationDate
          }
        }`;
        return reply.graphql(query);
    });
    
    app.listen({
        port: 3000,
        host: '0.0.0.0'
    });


}

main().catch(console.error);