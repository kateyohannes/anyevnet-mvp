
import { Resolver, Query, Arg } from "type-graphql";
import { Recipe } from "../schema/recipe.schema";

@Resolver()
export class RecipeResolver {
  @Query((returns) => Recipe, { nullable: true })
  async recipe(@Arg("title") title: string): Promise<Omit<Recipe, 'specification'> | undefined> {
    return {
      description: "Desc 1",
      title: title,
      ratings: [0, 3, 1],
      creationDate: new Date("2018-04-11"),
    };
  }
}