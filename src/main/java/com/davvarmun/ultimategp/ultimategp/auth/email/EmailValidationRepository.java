package com.davvarmun.ultimategp.ultimategp.auth.email;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface EmailValidationRepository extends JpaRepository<EmailValidation, Long> {

    @Query("SELECT ev FROM EmailValidation ev WHERE ev.email =:email")
    Optional<EmailValidation> findByEmail(String email);

}
