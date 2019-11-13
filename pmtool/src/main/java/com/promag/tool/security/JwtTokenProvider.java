package com.promag.tool.security;

import com.promag.tool.domain.User;
import io.jsonwebtoken.*;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static com.promag.tool.security.SecurityConstants.EXPIRATION_TIME;
import static com.promag.tool.security.SecurityConstants.SECRET;

@Component
public class JwtTokenProvider {
    public String generateToken(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Date now = new Date(System.currentTimeMillis());

        Date expiryDate = new Date(now.getTime()+EXPIRATION_TIME);

        String userId = Long.toString(user.getId());

        Map<String, Object> claims = new HashMap<>();
        claims.put("id", Long.toString(user.getId()));
        claims.put("username", user.getUsername());
        claims.put("fullName", user.getFullName());

        return Jwts.builder()
                .setSubject(userId)
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, SECRET)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token);
            return true;
        } catch(SignatureException se) {
            System.out.println("..Invalid JWT Signature");
        } catch(MalformedJwtException me) {
            System.out.println("..Invalid JWT Token");
        } catch(ExpiredJwtException ee) {
            System.out.println("..Expired JWT token");
        } catch (UnsupportedJwtException ue) {
            System.out.println("..Unsupported JWT token");
        } catch (IllegalArgumentException ie) {
            System.out.println("..JWT claims string is empty");
        }
        return false;
    }

    public Long getUserIdFromJWT(String token) {
        Claims claims = Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody();
//        Long id = Long.parseLong(claims.getId());
        String id = (String) claims.get("id");

        return Long.parseLong(id);
    }
}
