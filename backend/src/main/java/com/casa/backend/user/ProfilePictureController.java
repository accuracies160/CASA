package com.casa.backend.user;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class ProfilePictureController {

    private final CloudinaryService cloudinaryService;
    private final UserRepository userRepository;

    @PostMapping("/profile-picture")
    public ResponseEntity<?> uploadProfilePicture(
            @RequestParam("file") MultipartFile file,
            @AuthenticationPrincipal User user
    ) {
        try {
            // Upload to Cloudinary
            String imageUrl = cloudinaryService.uploadImage(file);

            // Save to database
            user.setProfileImageUrl(imageUrl);
            userRepository.save(user);

            // Respond with the uploaded image URL
            return ResponseEntity.ok(imageUrl);

        } catch (Exception e) {
            return ResponseEntity
                    .internalServerError()
                    .body("Upload failed: " + e.getMessage());
        }
    }
}
