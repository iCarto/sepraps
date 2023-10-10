import {styled} from "@mui/material/styles";
import {TextLink} from "base/navigation/components";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const CardContentNoPadding = styled(CardContent)(`
  padding: 3px 10px;
  &:last-child {
    padding-bottom: 0;
  }
`);

const PaymentListSelectorItem = ({label, to, selected = false}) => {
    return (
        <Card
            elevation={3}
            sx={{
                border: "1px",
                borderStyle: selected ? "solid" : "none",
                borderColor: "#ccc",
                backgroundColor: selected ? "secondary.lighter" : "inherit",
                p: 1,
                textAlign: "center",
            }}
        >
            <CardContentNoPadding>
                <TextLink
                    text={label}
                    to={to}
                    textStyle={{
                        fontWeight: selected ? "bold" : "inherit",
                    }}
                />
            </CardContentNoPadding>
        </Card>
    );
};

export default PaymentListSelectorItem;
