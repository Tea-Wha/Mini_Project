package com.kh.miniproject.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FirebaseUploadService {

    private final String firebaseCredentialsPath = "src/main/resources/firebase-service-account.json";
    private final String bucketName = "mini-project-d9c21.firebasestorage.app";

    public void uploadImagesFromFolder() throws IOException {
        String localFolderPath = "src/main/resources/static/images";
        Storage storage = getStorage();

        Files.list(Paths.get(localFolderPath))
                .filter(Files::isRegularFile) // 파일만 선택
                .forEach(filePath -> {
                    try {
                        uploadFileToFirebase(storage, filePath);
                    } catch (IOException e) {
                        System.err.println("Failed to upload file: " + filePath + " - " + e.getMessage());
                    }
                });
    }

    private Storage getStorage() throws IOException {
        return StorageOptions.newBuilder()
                .setCredentials(GoogleCredentials.fromStream(new FileInputStream(firebaseCredentialsPath)))
                .build()
                .getService();
    }

    private void uploadFileToFirebase(Storage storage, Path filePath) throws IOException {
        String fileName = filePath.getFileName().toString();
        String mimeType = Files.probeContentType(filePath);
        BlobId blobId = BlobId.of(bucketName, "HYUNDAI/IONIQ6/" + fileName);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId)
                        .setContentType(mimeType)
                        .build();

        storage.create(blobInfo, Files.readAllBytes(filePath));
        System.out.println("Uploaded file: " + fileName + " with MIME type " + mimeType);
    }
}