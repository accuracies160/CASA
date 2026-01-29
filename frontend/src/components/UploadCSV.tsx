import React, { useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import axios from "axios";

export default function UploadCSV({ onUploadComplete }: { onUploadComplete: () => void  }) {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please choose a CSV file first.")
            return;
        }

        try {
            const token = localStorage.getItem("token");

            const formData = new FormData();
            formData.append("file", file);

            await axios.post("http://localhost:8080/api/transactions/upload", formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${token}`,
                },
              });

              alert("CSV uploaded successfully!");
              onUploadComplete(); // reload or refecth data

        } catch (error) {
            console.error("Upload failed:", error);
            alert("Upload failed — see console for details.");
        }
    };

    return (
        <Stack direction="row" spacing={2} alignItems="center">
            <Button variant="outlined" component="label">
                Choose CSV
                <input type="file" hidden accept=".csv" onChange={handleFileChange} />
            </Button>

            {file && (
                <Typography variant="body2" color="text.secondary">
                    {file.name}
                </Typography>
            )}

            <Button variant="contained" onClick={handleUpload}>
                Upload CSV
            </Button>
        </Stack>
    );
}