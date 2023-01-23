import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Product {
  @Field(() => ID)
  id!: number;
  @Field(() => String)
  title!: string;
  @Field(() => String)
  description!: string;
  @Field(() => Number)
  price!: number;
  @Field(() => Number)
  discountPercentage!: number;
  @Field(() => Number)
  rating!: number;
  @Field(() => Number)
  stock!: number;
  @Field(() => String)
  brand!: string;
  @Field(() => String)
  category!: string;
  @Field(() => String)
  thumbnail!: string;
  @Field(() => [String])
  images?: string[];
}
