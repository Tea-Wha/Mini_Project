package com.kh.miniproject.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import org.springframework.stereotype.Service;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;

@Service
public class FirebaseUploadService_MultiFolder {

    private final Storage storage;
    private final String firebaseCredentialsPath = "src/main/resources/firebase-service-account.json";
    private final String bucketName = "mini-project-d9c21.firebasestorage.app";

    public FirebaseUploadService_MultiFolder() throws IOException {
        this.storage = getStorage();
    }


    public void uploadAllFolders(String localRootPath, String firebaseRootPath) throws IOException {
        Path rootpath = Path.of(localRootPath);

        // 폴더 처리
        Files.walk(rootpath)
                .filter(Files::isDirectory) // 폴더 필터링
                .forEach(path -> {
                    String relativePath = rootpath.relativize(path).toString().replace("\\","/");
                    String firebaseFolderPath = firebaseRootPath + relativePath + "/";

                    // 폴더 비어있는지 확인
                    File folder = path.toFile();
                    if (folder.listFiles() == null || folder.listFiles().length == 0){
                        // 비어있는 폴더에만 .keep 파일 업로드
                        String keepFilePath = firebaseFolderPath + ".keep";
                        InputStream dummyContent = new ByteArrayInputStream(new byte[0]);
                        
                        BlobId blobId = BlobId.of(bucketName, keepFilePath);
                        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).build();
                        storage.create(blobInfo, dummyContent);
                        System.out.println("빈 폴더 업로드: " + keepFilePath);
                    }
                });
        // 파일 처리
        Files.walk(rootpath)
                .filter(Files::isRegularFile) // 파일 필터링
                .forEach(path -> {
                    File file = path.toFile();
                    String relativePath = rootpath.relativize(path).toString().replace("\\","/");
                    String firebaseFilePath = firebaseRootPath + relativePath;
                    uploadFileToFirebase(file, firebaseFilePath);
                });
    }

    private void uploadFileToFirebase(File file, String firebasePath){
        try{
            String mimeType = Files.probeContentType(Path.of(firebasePath));
            BlobInfo blobInfo = BlobInfo.newBuilder(bucketName, firebasePath)
                    .setContentType(mimeType)
                    .build();
            storage.create(blobInfo, Files.readAllBytes(file.toPath()));
            System.out.println("업로드 성공: " + firebasePath);
        }
        catch (Exception e) {
            System.err.println("업로드 실패: "+firebasePath+" - " +e.getMessage());
        }
    }


    private Storage getStorage() throws IOException {
        // Storage 서비스 가져오기
        return StorageOptions.newBuilder()
                .setCredentials(GoogleCredentials.fromStream(new FileInputStream(firebaseCredentialsPath)))
                .build()
                .getService();
    }

}
