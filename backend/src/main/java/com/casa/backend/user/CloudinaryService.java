package com.casa.backend.user;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CloudinaryService {

    private final Cloudinary cloudinary;

    public String uploadImage(MultipartFile file) throws IOException {
        Map uploaded = cloudinary.uploader().upload(
                file.getBytes(),
                ObjectUtils.asMap("folder", "casa-profile-pictures")
        );
        return uploaded.get("secure_url").toString();
    }
}
