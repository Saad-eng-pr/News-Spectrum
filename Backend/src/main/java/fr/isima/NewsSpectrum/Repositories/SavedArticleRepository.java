package fr.isima.NewsSpectrum.Repositories;

import fr.isima.NewsSpectrum.Models.SavedArticle;
import fr.isima.NewsSpectrum.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SavedArticleRepository extends JpaRepository<SavedArticle, Long> {
    List<SavedArticle> findByUser(User user);
}
