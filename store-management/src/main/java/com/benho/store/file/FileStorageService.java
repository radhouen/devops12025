package com.benho.store.file;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
@Slf4j
public class FileStorageService {

    @Value("${file.upload-dir:uploads/products}")
    private String uploadDir;

    public String saveFile(MultipartFile file) {
        try {
            // Create upload directory if it doesn't exist
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Generate unique filename
            String originalFilename = file.getOriginalFilename();
            String fileExtension = originalFilename != null && originalFilename.contains(".")
                    ? originalFilename.substring(originalFilename.lastIndexOf("."))
                    : "";
            String uniqueFilename = UUID.randomUUID().toString() + fileExtension;

            // Save file
            Path filePath = uploadPath.resolve(uniqueFilename);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            log.info("File saved successfully: {}", uniqueFilename);
            return uniqueFilename;

        } catch (IOException e) {
            log.error("Failed to save file", e);
            throw new RuntimeException("Failed to save file: " + e.getMessage());
        }
    }

    public void deleteFile(String filename) {
        try {
            if (filename != null && !filename.isEmpty()) {
                Path filePath = Paths.get(uploadDir).resolve(filename);
                Files.deleteIfExists(filePath);
                log.info("File deleted successfully: {}", filename);
            }
        } catch (IOException e) {
            log.error("Failed to delete file: {}", filename, e);
        }
    }

    public byte[] loadFile(String filename) {
        try {
            Path filePath = Paths.get(uploadDir).resolve(filename);
            return Files.readAllBytes(filePath);
        } catch (IOException e) {
            log.error("Failed to load file: {}", filename, e);
            throw new RuntimeException("Failed to load file: " + e.getMessage());
        }
    }
}
