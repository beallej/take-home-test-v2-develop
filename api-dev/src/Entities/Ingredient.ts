import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Tag } from "../Model/Tag"

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column({
    type: "enum",
    enum: Tag,
  })
  tag: Tag;
}
