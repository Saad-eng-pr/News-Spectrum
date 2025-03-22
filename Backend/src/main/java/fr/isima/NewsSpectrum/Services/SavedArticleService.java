package fr.isima.NewsSpectrum.Services;

import org.springframework.stereotype.Service;

import fr.isima.NewsSpectrum.Repositories.*;
import fr.isima.NewsSpectrum.Models.*;
import java.util.*;

@Service
public class SavedArticleService {

    public final SavedArticleRepository savedArticleRepository;
    public final UserRepository userRepository;
    public final UserService UserService ;

    public SavedArticleService(SavedArticleRepository savedArticleRepository, UserRepository userRepository, UserService userService) {
        this.savedArticleRepository = savedArticleRepository;
        this.userRepository = userRepository;
        this.UserService = userService;
    }

    public SavedArticle save(SavedArticle article) {
        User user = UserService.getAuthenticatedUser();

        if(user == null) {
            throw new IllegalArgumentException("User is not authenticated");
        }

        article.setUser(user);
        return savedArticleRepository.save(article);
    }

    public List<SavedArticle> getSavedArticles() {
        User user = UserService.getAuthenticatedUser();
        if (user == null) {
            throw new IllegalArgumentException("User is not authenticated");
        }
        return savedArticleRepository.findByUser(user);
    }

    public void deleteSavedArticle(Long id) {
        savedArticleRepository.deleteById(id);
    }
}
