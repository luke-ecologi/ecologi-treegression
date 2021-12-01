import { FC } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

interface HeaderProps {}

export const Header: FC<HeaderProps> = ({ children }) => (
  <AppBar position="sticky">
    <Toolbar variant="regular">
      <img src="./favicon.ico" alt="" />
      {/* <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
        </IconButton> */}
      <Typography variant="h6" component="div" paddingLeft="20px">
        Ecologi Treegression
      </Typography>
      {children}
    </Toolbar>
  </AppBar>
);
