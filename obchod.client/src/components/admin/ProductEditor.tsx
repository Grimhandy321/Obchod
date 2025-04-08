import { useState, useEffect } from "react";
import { FileInput, Button, Image, Group, Container, Notification } from "@mantine/core";
import { useAxiosClient } from "../../lib/api/axios-client";

interface Product {
    productId: number;
    name: string;
    brand: string;
    description: string;
    rating: number;
    imagePaths: string[];
}

const ProductEditor: React.FC<{ productId: number }> = ({ productId = 0}) => {
    const [product, setProduct] = useState<Product | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const client = useAxiosClient();

    const fetchProduct = async () => {
        try {
            const response = await client.get(`/api/product/${productId}`);
            setProduct(response.data);
        } catch (err) {
            console.error("Failed to fetch product:", err);
            setError("Failed to fetch product details.");
        }
    };
    // Fetch product details
    useEffect(() => {
        fetchProduct();
    },[]);

    // Handle Image Upload
    const handleUpload = async () => {
        if (!file) {
            setError("Please select an image to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("images", file);

        try {
            await client.post(`/api/product/${productId}/images`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setSuccess("Image uploaded successfully!");
            setError(null);
            // Re-fetch product details to update image paths
            const response = await client.get(`/api/product/${productId}`);
            setProduct(response.data);
        } catch (err) {
            console.error("Upload failed", err);
            setError("Upload failed. Try again.");
        }
    };

    // Handle Image Download
    const handleDownload = (imageUrl: string) => {
        const fileName = imageUrl.split("/").pop();
        if (!fileName) return;

        client.get(`/api/product/${productId}/image/download/${fileName}`, { responseType: "blob" })
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", fileName);
                document.body.appendChild(link);
                link.click();
                link.remove();
            })
            .catch((err) => {
                console.error("Download failed", err);
                setError("Download failed. Try again.");
            });
    };

    // Display existing product and upload new image
    return (
        <Container style={{ maxWidth: 600 }}>
            <h1>Edit Product</h1>

            {error && (
                <Notification color="red" mt="md" onClose={() => setError(null)}>
                    {error}
                </Notification>
            )}

            {success && (
                <Notification color="green" mt="md" onClose={() => setSuccess(null)}>
                    {success}
                </Notification>
            )}

            {product ? (
                <>
                    <div>
                        <strong>Product Name:</strong> {product.name}
                    </div>
                    <div>
                        <strong>Brand:</strong> {product.brand}
                    </div>
                    <div>
                        <strong>Description:</strong> {product.description}
                    </div>
                    <div>
                        <strong>Rating:</strong> {product.rating}
                    </div>

                    {/* Display existing images */}
                    <div>
                        <h3>Existing Images</h3>
                        <Group spacing="sm">
                            {product.imagePaths.map((imagePath, index) => (
                                <div key={index}>
                                    <Image src={imagePath} alt={`Product Image ${index + 1}`} width={100} height={100} />
                                    <Button variant="link" onClick={() => handleDownload(imagePath)}>
                                        Download
                                    </Button>
                                </div>
                            ))}
                        </Group>
                    </div>

                    {/* Image upload */}
                    <FileInput
                        label="Upload New Image"
                        placeholder="Choose a file"
                        value={file}
                        onChange={setFile}
                        accept="image/*"
                    />
                    <Button onClick={handleUpload} disabled={!file} mt="md">
                        Upload Image
                    </Button>
                </>
            ) : (
                <div>Loading product details...</div>
            )}
        </Container>
    );
};

export default ProductEditor;
