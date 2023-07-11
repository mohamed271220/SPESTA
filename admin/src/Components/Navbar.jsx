import React, { useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDownwardOutlined,
} from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import { useDispatch } from "react-redux";
import { setMode } from "../state";
import { useTheme } from "@emotion/react";
import { AppBar, IconButton, InputBase, Toolbar } from "@mui/material";

const Navbar = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* left-side */}
        <FlexBetween>
          <IconButton onClick={() => {}}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius={"9px"}
            gap={"3rem"}
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>
        {/* right side */}
        <FlexBetween gap={"1.5rem"}>
          <IconButton
            onClick={() =>
              dispatch(
                setMode(theme.palette.mode === "light" ? "dark" : "light")
              )
            }
          >
            {theme.palette.mode === "light" ? (
              <DarkModeOutlined />
            ) : (
              <LightModeOutlined />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined />
          </IconButton>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
