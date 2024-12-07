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
    // 토큰 경로 설정 나중에 Firebase 여러 개 사용 예정이라면 하드 코딩 말고 -> 여러 개를 가져올 수 있게끔 코드 변형해야함
    private final String bucketName = "mini-project-d9c21.firebasestorage.app";
    // 저장소 경로 설정

    public void uploadImagesFromFolder() throws IOException {
        String localFolderPath = "src/main/resources/static/images";
        // 업로드할 이미지 저장 경로 -> 분리해서 한번에 넣을 수 있는 코드 필요함
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
        // Storage 서비스 가져오기
        return StorageOptions.newBuilder()
                .setCredentials(GoogleCredentials.fromStream(new FileInputStream(firebaseCredentialsPath)))
                .build()
                .getService();
    }

    private void uploadFileToFirebase(Storage storage, Path filePath) throws IOException {
        String fileName = filePath.getFileName().toString();
        String mimeType = Files.probeContentType(filePath);
        // File type 가져오기 (img)
        BlobId blobId = BlobId.of(bucketName, "images/" + fileName); // 저장할 경로 설정 가능
        // 여러 경로로 한번에 들어가게끔 구성해야함
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId)
                        .setContentType(mimeType) // 가져온 파일 타입에 맞게끔 저장
                        .build();

        storage.create(blobInfo, Files.readAllBytes(filePath));
        System.out.println("Uploaded file: " + fileName + " with MIME type " + mimeType);
    }
}