package com.kh.miniproject.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;
import java.io.FileInputStream;
import java.io.IOException;

@Configuration
public class FirebaseConfig {

    @PostConstruct
    public void initFirebase() throws IOException {
        FileInputStream serviceAccount =
                new FileInputStream("src/main/resources/firebase-service-account.json");

        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .setStorageBucket("mini-project-d9c21.firebasestorage.app")
                .build();

        if (FirebaseApp.getApps().isEmpty()) { // FirebaseApp이 이미 초기화되지 않았다면 초기화
            FirebaseApp.initializeApp(options);
            System.out.println("Firebase has been initialized successfully!");
        }
    }
}