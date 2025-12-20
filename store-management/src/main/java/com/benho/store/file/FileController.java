package com.benho.store.file;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/files")
@RequiredArgsConstructor
public class FileController {

    private final FileStorageService fileStorageService;

    @GetMapping("/products/{filename}")
    public ResponseEntity<byte[]> getProductImage(@PathVariable String filename) {
        byte[] image = fileStorageService.loadFile(filename);
        
        // Determine content type based on file extension
        String contentType = MediaType.IMAGE_JPEG_VALUE;
        if (filename.toLowerCase().endsWith(".png")) {
            contentType = MediaType.IMAGE_PNG_VALUE;
        } else if (filename.toLowerCase().endsWith(".gif")) {
            contentType = MediaType.IMAGE_GIF_VALUE;
        } else if (filename.toLowerCase().endsWith(".webp")) {
            contentType = "image/webp";
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, contentType)
                .body(image);
    }
}
