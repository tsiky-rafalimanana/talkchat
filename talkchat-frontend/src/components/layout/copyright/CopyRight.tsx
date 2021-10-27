import React from "react";
import Typography from "@mui/material/Typography";

export function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
        Tsiky Rafalimanana
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}