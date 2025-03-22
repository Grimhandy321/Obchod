import { useState } from "react";
import {
    FileInput,
    Button,
    Image,
    Notification,
    Group,
    Container,
} from "@mantine/core";

interface UploadResponse {
    imageUrl: string;
}

const ImageUploadDownload: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const client = useAxiosClient();

    // Handle Image Upload
    const handleUpload = async () => {
        if (!file) {
            setError("Please select an image to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await client.post<UploadResponse>(
                "/api/image/upload",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            setImageUrl(response.data.imageUrl);
            setError(null);
        } catch (err) {
            console.error("Upload failed", err);
            setError("Upload failed. Try again.");
        }
    };

    const handleDownload = async () => {
        if (!imageUrl) {
            setError("No image to download.");
            return;
        }

        const fileName = imageUrl.split("/").pop();

        try {
            const response = await client.get(`/api/image/download/${fileName}`, {
                responseType: "blob",
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", fileName || "image");
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            console.error("Download failed", err);
            setError("Download failed. Try again.");
        }
    };

    return (
        <Container style={{ maxWidth: 600 }}>
            <h1>Image Upload & Download</h1>

            <FileInput
                label="Select Image"
                placeholder="Choose a file"
                value={file}
                onChange={setFile}
                accept="image/*"
            />

            <Group mt="md">
                <Button onClick={handleUpload} disabled={!file}>
                    Upload Image
                </Button>
                {imageUrl && <Button onClick={handleDownload}>Download Image</Button>}
            </Group>

            {error && (
                <Notification color="red" mt="md" onClose={() => setError(null)}>
                    {error}
                </Notification>
            )}

            {imageUrl && (
                <Image
                    src={imageUrl}
                    alt="Uploaded Image"
                    mt="md"
                    radius="md"
                    withPlaceholder
                />
            )}
        </Container>
    );
};

export default ImageUploadDownload;
