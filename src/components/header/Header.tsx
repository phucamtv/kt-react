import { NavigationPopup } from "./NavigationPopup";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import { AppMenu } from "./AppMenu";
import Typography from "@mui/material/Typography";
import { NavigationLabel } from "./NavigationLabel";
import CssBaseline from "@mui/material/CssBaseline";
import Slide from "@mui/material/Slide";
import useScrollTrigger from "@mui/material/useScrollTrigger";


interface Props {
    window?: () => Window;
    children: React.ReactElement;
}

function HideOnScroll(props: Props) {
    const { children, window } = props;
    
    const trigger = useScrollTrigger({
        // target: window ? window() : undefined,
        target: undefined,
    });
    
    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

export const Header = (props: Props) => {
    return <>
        <CssBaseline />
        <HideOnScroll {...props}>
            <AppBar color={"default"}>
                <Toolbar>
                    <Container style={{ display: "flex" }}>
                        <Typography component={"div"} color="inherit" style={{ flex: 1 }}>
                            <NavigationLabel />
                            <NavigationPopup />
                        </Typography>
                        <AppMenu />
                    </Container>
                </Toolbar>
            </AppBar>
        </HideOnScroll>
    
        <Toolbar />
    </>;
};
