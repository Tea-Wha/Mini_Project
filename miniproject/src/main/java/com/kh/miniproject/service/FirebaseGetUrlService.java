package com.kh.miniproject.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import com.kh.miniproject.util.ColorChipPaths;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.*;

@Service
public class FirebaseGetUrlService {

    private final String firebaseCredentialsPath = "src/main/resources/firebase-service-account.json";
    private static final String BUCKET_NAME = "mini-project-d9c21.firebasestorage.app";
    private static final String FOLDER_PATH = "IMAGE/CAR_COLORCHIP/HYUNDAI/"; // Firebase의 경로 지정
    private static final String FOLDER_TOP_PATH = "IMAGE/CAR_COLORCHIP/HYUNDAI/"; // 상세 정보 관련 경로
    String[] FOLDER_PATHS = ColorChipPaths.getPathsByBrand("28");

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

    // 경로 나누기 + 전체 URL -> 차 이미지 URL (REP / SP) (다중 경로) (다중경로 설정 필요) (컬러 폴더대로 구분)
    public List<List<String>> getImageFullUrlsDistribution() throws IOException {
        // Firebase Storage 초기화
        Storage storage = getStorage();

        // 특정 경로의 파일 가져오기
        Bucket bucket = storage.get(BUCKET_NAME);
        List<List<String>> result = new ArrayList<>();

        for (String folderPath : FOLDER_PATHS) {

            List<String> imageUrls = new ArrayList<>();
            List<String> name = new ArrayList<>();

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

    // 경로 나누기 + Color Name -> 차 이미지 설정된 Name (REP / SP) (다중 경로) (다중경로 설정 필요) (컬러 폴더대로 구분)
    public List<List<String>> getImageNamesDistribution() throws IOException {
        // Firebase Storage 초기화
        Storage storage = getStorage();

        // 특정 경로의 파일 가져오기
        Bucket bucket = storage.get(BUCKET_NAME);
        List<List<String>> result = new ArrayList<>();
        List<List<String>> resultName = new ArrayList<>();

        for (String folderPath : FOLDER_PATHS) {

            List<String> imageUrls = new ArrayList<>();
            List<String> name = new ArrayList<>();

            // Blob 리스트 가져오기
            for (Blob blob : bucket.list(Storage.BlobListOption.prefix(folderPath)).iterateAll()) {
                // Blob URL 생성
                String encodedPath = blob.getName().replace("/", "%2F");
                String namePath = blob.getName();
                String url = "https://firebasestorage.googleapis.com/v0/b/" + BUCKET_NAME + "/o/" + namePath + "?alt=media";
                imageUrls.add(url); // 전체 URL 경로
//                String extractedName = url.replaceAll(".*/([^/]+)/[^/]+\\.(jpg|png|avif).*", "$1");
                String[] part = url.split("/");
                String extractedName = part[part.length-2];
                name.add(extractedName);
            }
            result.add(imageUrls);
            resultName.add(name);
        }
        System.out.println(result);
        return resultName;
    }

// 상위 단일 폴더에서 하위 폴더 경로 자동 인식 -> 색상 별 URL 이중 배열 구조로 반환
// CAR_SP_IMAGE 전용 함수 (CAR_REP IMAGE도 사용 가능)
public List<List<String>> getImageShortUrlsDistribution() throws IOException {
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
   List<String> subNames =  new ArrayList<>(subFolders); // 리스트 배열로 변환
    System.out.println(subNames); // 코드 확인용
    for (String subName : subNames){
        List<String> urls = new ArrayList<>();
        List<String> shorturls = new ArrayList<>();
        String folderPath = FOLDER_TOP_PATH + subName;
        System.out.println(folderPath); // 코드 확인용

        for (Blob blob : bucket.list(Storage.BlobListOption.prefix(folderPath)).iterateAll()){
            String encodedPath = blob.getName().replace("/", "%2F");
            String shortPath = blob.getName().replace(FOLDER_TOP_PATH, "").replace("/", "%2F");
            String url = "https://firebasestorage.googleapis.com/v0/b/" + BUCKET_NAME + "/o/" + encodedPath + "?alt=media";
            urls.add(url);
            shorturls.add(shortPath);
        }
        result.add(urls); // 전체 경로
        shortResult.add(shorturls); // 축약 경로
    }
    System.out.println(result);
    return result; // 축약 경로 웹페이지에 반환
}


    private Storage getStorage() throws IOException {
        // Storage 서비스 가져오기
        return StorageOptions.newBuilder()
                .setCredentials(GoogleCredentials.fromStream(new FileInputStream(firebaseCredentialsPath)))
                .build()
                .getService();
    }
}