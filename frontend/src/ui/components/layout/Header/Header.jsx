import React from 'react';
import {Link} from "react-router";
import {AppBar, Box, Button, IconButton, Toolbar} from "@mui/material";
import AuthenticationToggle from "../../auth/AuthenticationToggle/AuthenticationToggle.jsx";
import "./Header.css";

const Header = () => {
    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                    </IconButton>
                    <Box sx={{flexGrow: 1, display: {xs: "none", md: "flex"}}}>
                            <Link key="reminders" to="/">
                                <Button
                                    sx={{my: 2, color: "white", display: "block", textDecoration: "none"}}
                                > Reminders+
                                </Button>
                            </Link>
                    </Box>
                    <AuthenticationToggle/>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;