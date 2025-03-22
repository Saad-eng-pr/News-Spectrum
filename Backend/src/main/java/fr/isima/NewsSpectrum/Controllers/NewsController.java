package fr.isima.NewsSpectrum.Controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import fr.isima.NewsSpectrum.Models.NewsResponse;
import fr.isima.NewsSpectrum.Models.NewsSourceResponse;
import fr.isima.NewsSpectrum.Models.SavedArticle;
import fr.isima.NewsSpectrum.Services.NewsAPIService;
import fr.isima.NewsSpectrum.Services.SavedArticleService;


@RestController
@RequestMapping("/news")
public class NewsController {
    public final NewsAPIService newsAPIService;
    public final SavedArticleService savedArticleService;
    
    public NewsController(NewsAPIService newsAPIService, SavedArticleService savedArticleService) {
        this.newsAPIService = newsAPIService;
        this.savedArticleService = savedArticleService;
    }

    @GetMapping("/headline")
    public NewsResponse getNews(@RequestParam String query) {
            return newsAPIService.HeadlineNews(query);
    }

    @GetMapping("/search")
    public NewsResponse searchNews(@RequestParam String query) {
        return newsAPIService.SearchNews(query);
    }

    @GetMapping("/source")
    public NewsResponse searchBySource(@RequestParam String query, @RequestParam String source ) {
        return newsAPIService.SourceNews(query, source);
    }

    @GetMapping("/category")
    public NewsResponse searchByCategory(@RequestParam String category) {
        return newsAPIService.CategoryNews(category);
    }

    @GetMapping("country")
    public NewsResponse searchByCountry(@RequestParam String country) {
        return newsAPIService.CountryNews(country);
    }

    @GetMapping("language")
    public NewsResponse searchByLanguage(@RequestParam String langue) {
        return newsAPIService.LanguageNews(langue);
    }

    @PostMapping("/save")
    public SavedArticle save(@RequestBody SavedArticle article) {
        return savedArticleService.save(article);
    }

    @GetMapping("/multipleSources")
    public NewsResponse searchByMultipleSources(@RequestParam String query, @RequestParam List<String> sources) {
        return newsAPIService.MultipleSourcesNews(query, sources);
    }

    @GetMapping("/sources")
    public NewsSourceResponse getSource() {
        return newsAPIService.GetSources();
    }

    @GetMapping("/sources/{category}")
    public NewsSourceResponse getSourceByCategory(@PathVariable String category) {
        return newsAPIService.GetSourceByCategory(category);
    }
}
