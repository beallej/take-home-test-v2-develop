export enum Tag {
  PROTEINE = "proteine",
  LEGUME = "legume",
  FECULENT = "feculent"
}
export const TAGS_OPTIONS: Record<Tag, string> = {
  [Tag.PROTEINE]: "Protéine",
  [Tag.LEGUME]: "Légume",
  [Tag.FECULENT]: "Féculent"
}
export const TAGS_LIST = [
  {
    value: Tag.PROTEINE,
    label: TAGS_OPTIONS.proteine
  },
  {
    value: Tag.LEGUME,
    label: TAGS_OPTIONS.legume,
  },
  {
    value: Tag.FECULENT,
    label: TAGS_OPTIONS.feculent
  }
]


export const isTag =(value: string): value is Tag => {
  return Object.values(Tag).includes(value as Tag);
}