package com.kh.miniproject.service;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@NoArgsConstructor
@Service
public class EmailService {

    @Autowired
    private JavaMailSender emailSender;

    public void sendResetPasswordEmail(String email, String token) {
        String resetLink = "http://localhost:3000/resetPassword?token=" + token;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Password Reset Request");
        message.setText("Click the link to reset your password: " + resetLink);

        emailSender.send(message);
    }
}

