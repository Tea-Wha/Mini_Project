package com.kh.miniproject.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.*;

@Service
public class FirebaseGetUrlService {

    private final String firebaseCredentialsPath = "src/main/resources/firebase-service-account.json";
    private static final String BUCKET_NAME = "mini-project-d9c21.firebasestorage.app";
    private static final String FOLDER_PATH = "IMAGE/CAR_COLORCHIP/HYUNDAI/IONIQ6/"; // Firebase의 경로 지정
    private static final String FOLDER_TOP_PATH = "IMAGE/CAR_SP_IMAGE/HYUNDAI/IONIQ6/"; // 상세 정보 관련 경로
    private static final String[] FOLDER_PATHS = {
            "IMAGE/CAR_SP_IMAGE/HYUNDAI/IONIQ6/A2B/",
            "IMAGE/CAR_SP_IMAGE/HYUNDAI/IONIQ6/NY9/",
            "IMAGE/CAR_SP_IMAGE/HYUNDAI/IONIQ6/R2P/",
            "IMAGE/CAR_SP_IMAGE/HYUNDAI/IONIQ6/T2G/",
            "IMAGE/CAR_SP_IMAGE/HYUNDAI/IONIQ6/W3T/",
            "IMAGE/CAR_SP_IMAGE/HYUNDAI/IONIQ6/W6H/",
            "IMAGE/CAR_SP_IMAGE/HYUNDAI/IONIQ6/XB9/"
    }; // 다중 경로

    // 전체 URL, 단일 경로 -> 컬러 칩 URL (상위 폴더에서)
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

    // 축약 URL, 단일 경로 -> 컬러 칩 URL (상위 폴더에서)
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

    // 경로 나누기 + 전체 URL -> 차 이미지 URL (REP / SP) (다중 경로) (컬러 폴더대로 구분)
    public List<List<String>> getImageFullUrlsDistribution() throws IOException {
        // Firebase Storage 초기화
        Storage storage = getStorage();

        // 특정 경로의 파일 가져오기
        Bucket bucket = storage.get(BUCKET_NAME);
        List<List<String>> result = new ArrayList<>();

        for (String folderPath : FOLDER_PATHS) {

            List<String> imageUrls = new ArrayList<>();

            // Blob 리스트 가져오기
            for (Blob blob : bucket.list(Storage.BlobListOption.prefix(folderPath)).iterateAll()) {
                // Blob URL 생성
                String encodedPath = blob.getName().replace("/", "%2F");
                String url = "https://firebasestorage.googleapis.com/v0/b/" + BUCKET_NAME + "/o/" + encodedPath + "?alt=media";
                imageUrls.add(url); // 전체 URL 경로
            }
            result.add(imageUrls);
        }
        System.out.println(result);
        return result;
    }

    // 경로 나누기 + 축약 URL -> 차 이미지 URL (REP / SP) (다중 경로) (컬러 폴더대로 구분)
//    public List<List<String>> getImageShortUrlsDistribution() throws IOException {
//        // Firebase Storage 초기화
//        Storage storage = getStorage();
//
//        // 특정 경로의 파일 가져오기
//        Bucket bucket = storage.get(BUCKET_NAME);
//        List<List<String>> result = new ArrayList<>();
//        List<List<String>> shortResult = new ArrayList<>();
//
//        Set<String> subFolders = new HashSet<>();
//
//            // Blob 리스트 가져오기
//            for (Blob blob : bucket.list(Storage.BlobListOption.prefix(FOLDER_TOP_PATH)).iterateAll()) {
//                // Blob URL 생성
//                String fullPath = blob.getName();
//
//                if (fullPath.startsWith(FOLDER_TOP_PATH)){
//                    String relativePath = fullPath.substring(FOLDER_TOP_PATH.length());
//                    String[] parts = relativePath.split("/");
//                    System.out.println(relativePath);
//
//                    // 최상위 폴더 바로 아래의 폴더 이름 추가
//                    if (parts.length > 1) {
//                        subFolders.add(parts[0]);
//                    }
//                }
//
//            }
//            // 각 하위 폴더를 순회하며 URL 리스트 생성
//            for (String subFolder : subFolders){
//                List<String> urls = new ArrayList<>();
//                List<String> shorturls = new ArrayList<>();
//                String folderPath = FOLDER_TOP_PATH + "/" + subFolder;
////                System.out.println(folderPath);
//
//                for (Blob blob : bucket.list(Storage.BlobListOption.prefix(folderPath)).iterateAll()){
//                    String encodedPath = blob.getName().replace("/", "%2F");
//                    String shortPath = blob.getName().replace(FOLDER_TOP_PATH, "").replace("/", "%2F");
//                    String url = "https://firebasestorage.googleapis.com/v0/b/" + BUCKET_NAME + "/o/" + encodedPath + "?alt=media";
//                    urls.add(url);
//                    shorturls.add(shortPath);
//                }
//                // 해당 하위 폴더 URL 리스트를 결과에 추가
//                result.add(urls);
//                shortResult.add(shorturls);
//            }
//        System.out.println(result);
//        return shortResult;
//    }
public List<String> getImageShortUrlsDistribution() throws IOException {
    // Firebase Storage 초기화
    Storage storage = getStorage();

    // 특정 경로의 파일 가져오기
    Bucket bucket = storage.get(BUCKET_NAME);
    List<List<String>> result = new ArrayList<>();
    List<List<String>> shortResult = new ArrayList<>();

    Set<String> subFolders = new LinkedHashSet<>();

    // Blob 리스트 가져오기
    for (Blob blob : bucket.list(Storage.BlobListOption.prefix(FOLDER_TOP_PATH)).iterateAll()) {
        // Blob URL 생성
        String fullPath = blob.getName();

        if (fullPath.startsWith(FOLDER_TOP_PATH)){
            String relativePath = fullPath.substring(FOLDER_TOP_PATH.length());
            String[] parts = relativePath.split("/");

            // 최상위 폴더 바로 아래의 폴더 이름 추가
            if (parts.length > 1) {
                subFolders.add(parts[0]);
            }
        }
    }
   return new ArrayList<>(subFolders);
}


    private Storage getStorage() throws IOException {
        // Storage 서비스 가져오기
        return StorageOptions.newBuilder()
                .setCredentials(GoogleCredentials.fromStream(new FileInputStream(firebaseCredentialsPath)))
                .build()
                .getService();
    }
}