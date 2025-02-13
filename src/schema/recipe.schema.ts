// recipe.ts
import { Arg, Field, ObjectType, Int, Float, Resolver, Query } from "type-graphql";

@ObjectType({ description: "Object representing cooking recipe" })
export class Recipe {
  @Field({
    nullable: true
  })
  title?: string;

  @Field((type) => String, {
    nullable: true,
    deprecationReason: "Use `description` field instead",
  })
  get specification(): string | undefined {
    return this.description;
  }

  @Field({
    nullable: true,
    description: "The recipe description with preparation info",
  })
  description?: string;

  @Field((type) => [Int])
  ratings?: number[];

  @Field({
    defaultValue: new Date()
  })
  creationDate?: Date;
}
