import React from "react";
import { LinearProgress, Box, Typography } from "@mui/material";

interface ProgressBarProps {
    current: number;
    target: number;
    color?: string;
}

export default function ProgressBar({current, target, color = "#3CA0CA" }: ProgressBarProps) {
    const progress = (current / target) * 100;

    return (
        <Box
        sx = {{
            width: "100%",
            mt: 1,
        }}
        >
        <Typography variant="body2" color="black" mb={1}>
            ${current.toLocaleString()} of ${target.toLocaleString()}
        </Typography>

        <LinearProgress
            variant="determinate"
            value={progress}
            sx = {{
                height: 12,
                borderRadius: 2,
                backgroundColor: "#e0e0e0",
                "& .MuiLinearProgress-bar": {
                    backgroundColor: color, 
                },
            }}
        />

        <Typography variant="body2" color="test.secondary" mt={1}>
            {progress.toFixed(0)}% Complete
        </Typography>
        </Box>
    );
};