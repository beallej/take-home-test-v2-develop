import { Card } from "@mui/material";

export enum CardCustomVariant {
    SMALL = "small",
}
export function CardCustom(props: {
  title?: string | undefined;
  variant?: CardCustomVariant | undefined;
  children: JSX.Element[] | JSX.Element;
}): JSX.Element {
  const nameClass = props.variant  === CardCustomVariant.SMALL ? "card" : "card-small";

  return (
    <Card className={nameClass}>
      {props.title && <h3>{props.title}</h3>}
      {props.children}
    </Card>
  );
}
