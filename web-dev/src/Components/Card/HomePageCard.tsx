import { Box, Button } from "@mui/material";
import { CardCustom, CardCustomVariant } from "./CardCustom";

export function HomePageCard(props: {
  cardTitle: string;
  buttonText: string;
  text: string;
  onClick: () => void;
}): JSX.Element {
  return (
    <Box className="mg-b-md">
      <CardCustom title={props.cardTitle} variant={CardCustomVariant.SMALL}>
        <Box className="mg-b-sm">
          <Button onClick={props.onClick} variant="outlined">
            {props.buttonText}
          </Button>
        </Box>
        <span>{props.text}</span>
      </CardCustom>
    </Box>
  );
}
