package com.benho.store.product;

import com.benho.store.file.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final FileStorageService fileStorageService;

    public List<ProductResponse> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(ProductResponse::fromProduct)
                .collect(Collectors.toList());
    }

    public ProductResponse getProductById(Integer id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        return ProductResponse.fromProduct(product);
    }

    public List<ProductResponse> getProductsByCategory(String category) {
        return productRepository.findByCategory(category)
                .stream()
                .map(ProductResponse::fromProduct)
                .collect(Collectors.toList());
    }

    @Transactional
    public ProductResponse createProduct(ProductRequest request, MultipartFile photo) {
        String photoUrl = null;
        if (photo != null && !photo.isEmpty()) {
            photoUrl = fileStorageService.saveFile(photo);
        }

        Product product = Product.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .quantity(request.getQuantity())
                .category(request.getCategory())
                .photoUrl(photoUrl)
                .build();

        Product savedProduct = productRepository.save(product);
        return ProductResponse.fromProduct(savedProduct);
    }

    @Transactional
    public ProductResponse updateProduct(Integer id, ProductRequest request, MultipartFile photo) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

        // Update photo if a new one is provided
        if (photo != null && !photo.isEmpty()) {
            // Delete old photo
            if (product.getPhotoUrl() != null) {
                fileStorageService.deleteFile(product.getPhotoUrl());
            }
            // Save new photo
            String photoUrl = fileStorageService.saveFile(photo);
            product.setPhotoUrl(photoUrl);
        }

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setQuantity(request.getQuantity());
        product.setCategory(request.getCategory());

        Product updatedProduct = productRepository.save(product);
        return ProductResponse.fromProduct(updatedProduct);
    }

    @Transactional
    public void deleteProduct(Integer id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        
        // Delete photo if exists
        if (product.getPhotoUrl() != null) {
            fileStorageService.deleteFile(product.getPhotoUrl());
        }
        
        productRepository.deleteById(id);
    }
}
