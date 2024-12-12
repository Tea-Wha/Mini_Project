package com.kh.miniproject.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class FirebaseGetUrlService {

    private final String firebaseCredentialsPath = "src/main/resources/firebase-service-account.json";
    private static final String BUCKET_NAME = "mini-project-d9c21.firebasestorage.app";
    private static final String FOLDER_PATH = "IMAGE/CAR_LOGO/"; // Firebase의 경로 지정
    private static final String FOLDER_SP_PATH = ""; // 상세 정보 관련 경로

    public List<String> getImageFullUrls() throws IOException {
        // Firebase Storage 초기화
        Storage storage = getStorage();

        // 특정 경로의 파일 가져오기
        Bucket bucket = storage.get(BUCKET_NAME);
        List<String> imageUrls = new ArrayList<>();

        for (Blob blob : bucket.list(Storage.BlobListOption.prefix(FOLDER_PATH)).iterateAll()) {
            // Blob URL 생성
            String encodedPath = blob.getName().replace("/", "%2F");
            String url = "https://firebasestorage.googleapis.com/v0/b/"+BUCKET_NAME+"/o/"+encodedPath+"?alt=media";
            imageUrls.add(url); // 전체 URL 경로
        }
        System.out.println("Image URL: " + imageUrls);
        return imageUrls;
    }

    public List<String> getImageShortUrls() throws IOException {
        // Firebase Storage 초기화
        Storage storage = getStorage();

        // 특정 경로의 파일 가져오기
        Bucket bucket = storage.get(BUCKET_NAME);
        List<String> imageUrls = new ArrayList<>();
        List<String> shortimageUrls = new ArrayList<>(); // 축약 경로

        for (Blob blob : bucket.list(Storage.BlobListOption.prefix(FOLDER_PATH)).iterateAll()) {
            // Blob URL 생성
            String encodedPath = blob.getName().replace("/", "%2F");
            String shortPath = blob.getName().replace(FOLDER_PATH, "").replace("/", "%2F");
            String url = "https://firebasestorage.googleapis.com/v0/b/"+BUCKET_NAME+"/o/"+encodedPath+"?alt=media"; // 확인용
            imageUrls.add(url); // 전체 URL 경로
            shortimageUrls.add(shortPath); // 축약 URL 경로
        }
        System.out.println("Image URL: " + imageUrls); // 확인용 URL
        return shortimageUrls;
    }


    private Storage getStorage() throws IOException {
        // Storage 서비스 가져오기
        return StorageOptions.newBuilder()
                .setCredentials(GoogleCredentials.fromStream(new FileInputStream(firebaseCredentialsPath)))
                .build()
                .getService();
    }
}