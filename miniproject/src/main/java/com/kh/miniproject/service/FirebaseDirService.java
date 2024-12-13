package com.kh.miniproject.service;

import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.cloud.storage.Storage;
import com.google.firebase.cloud.StorageClient;
import com.kh.miniproject.repository.FirebaseDirRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class FirebaseDirService {
	
	@Autowired
	private final FirebaseDirRepository firebaseDirRepository;
	
	public List<String> getImage3d(int carNo, String color) {
		return getImageUrls(firebaseDirRepository.getCarDir(carNo, color));
	}
	
	public List<String> getImageUrls(String directory) {
		
		List<String> imageUrls = new ArrayList<>();
		Bucket bucket = StorageClient.getInstance().bucket();
		
		log.warn("받아온 디렉토리 위치: " + directory);
		
		// 3D 모델링 관련 디렉토리인 경우, 이미지 URL을 그대로 추가
		if (directory.contains("3d 모델링에 공통적인 부분")) {
			imageUrls.add(directory);
			return imageUrls; // 3D 모델링 URL 처리
		}
		
		// 디렉토리 내 모든 파일을 가져옵니다.
		Iterable<Blob> blobs = bucket.list(Storage.BlobListOption.prefix(directory)).iterateAll();
		
		for (Blob blob : blobs) {
			// 디렉토리가 아닌 경우에만 처리
			if (!blob.isDirectory()) {
				String fileName = blob.getName();
				
				// 파일 확장자가 txt인 경우, URL을 추가하지 않고 파일 이름만 추가
				if (fileName.endsWith(".txt")) {
					// 마지막 / 이후의 파일 이름만 추출
					String fileNameOnly = fileName.substring(fileName.lastIndexOf("/") + 1);
					log.warn("텍스트 파일 이름: " + fileNameOnly);
					imageUrls.add(fileNameOnly); // 파일 이름만 추가
				} else {
					// Firebase Storage의 URL 형식으로 파일 경로를 인코딩하여 URL을 생성
					String encodedPath = fileName.replace("/", "%2F"); // '/'를 '%2F'로 인코딩
					String publicUrl = String.format("https://firebasestorage.googleapis.com/v0/b/%s/o/%s?alt=media",
						bucket.getName(), encodedPath);
					imageUrls.add(publicUrl); // 이미지 URL 추가
				}
			}
		}
		
		// URL 목록 반환
		return imageUrls;
	}
}
