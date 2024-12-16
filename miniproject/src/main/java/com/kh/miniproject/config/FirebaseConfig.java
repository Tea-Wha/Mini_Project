package com.kh.miniproject.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import javax.annotation.PostConstruct;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

@Configuration
public class FirebaseConfig {

    @PostConstruct
    public void initFirebase() throws IOException {
        InputStream serviceAccount =
                new ClassPathResource("firebase-service-account.json").getInputStream();
                // 파이어베이스 홈페이지에서 json 파일 가져와야함
                // 경로에 저장 후 연결 -> 읽기

        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .setStorageBucket("mini-project-d9c21.firebasestorage.app") // 저장소 설정
                .build();

        if (FirebaseApp.getApps().isEmpty()) { // FirebaseApp이 이미 초기화되지 않았다면 초기화
            FirebaseApp.initializeApp(options);
            System.out.println("Firebase has been initialized successfully!"); // 테스트 확인용
        }
    }
}