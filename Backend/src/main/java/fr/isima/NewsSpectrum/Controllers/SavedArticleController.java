package fr.isima.NewsSpectrum.Controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;
import java.util.*;

import fr.isima.NewsSpectrum.Services.*;
import fr.isima.NewsSpectrum.Models.*;

@RestController
@RequestMapping("/savedArticles")
public class SavedArticleController {
    public final SavedArticleService savedArticleService;
    
    public SavedArticleController(SavedArticleService savedArticleService) {
        this.savedArticleService = savedArticleService;
    }

    @GetMapping("/getSavedArticles")
    public List<SavedArticle> getSavedArticles() {
        return savedArticleService.getSavedArticles();
    }

    @DeleteMapping("/delete")
    public void deleteSavedArticle(@RequestParam Long id) {
        savedArticleService.deleteSavedArticle(id);
    }
}
