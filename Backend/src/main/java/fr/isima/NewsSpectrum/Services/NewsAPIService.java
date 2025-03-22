package fr.isima.NewsSpectrum.Services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import fr.isima.NewsSpectrum.Models.Article;
import fr.isima.NewsSpectrum.Models.NewsResponse;
import fr.isima.NewsSpectrum.Models.NewsSourceResponse;

@Service
public class NewsAPIService {

    @Value("${newsapi.key}") 
    private String apiKey;

    private final RestTemplate restTemplate;

    public NewsAPIService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public NewsResponse HeadlineNews(String query) {
        String url = String.format(
            "https://newsapi.org/v2/top-headlines?country=%s&category=%s&q=%s&apiKey=%s",
            "us", "general", query, apiKey
        );

        return restTemplate.getForObject(url, NewsResponse.class);
    }

    public NewsResponse SearchNews(String query) {
        String url = String.format(
            "https://newsapi.org/v2/everything?q=%s&apiKey=%s",
            query, apiKey
        );

        return restTemplate.getForObject(url, NewsResponse.class);
    }

    public NewsResponse CategoryNews(String category) {
        String url = String.format(
            "https://newsapi.org/v2/top-headlines?country=%s&category=%s&apiKey=%s",
            "us", category, apiKey
        );

        return restTemplate.getForObject(url, NewsResponse.class);
    }


    public NewsResponse SourceNews(String query, String source) {
        String url = String.format(
            "https://newsapi.org/v2/everything/?sources=%s&q=%s&apiKey=%s",
            source, query, apiKey
        );

        return restTemplate.getForObject(url, NewsResponse.class);
    }

    public NewsResponse CountryNews(String country) {
        String url = String.format(
            "https://newsapi.org/v2/top-headlines?country=%s&apiKey=%s",
            country, apiKey
        );      
        
        return restTemplate.getForObject(url, NewsResponse.class);
    }
    
    public NewsResponse LanguageNews(String langue) {
        String url = "https://newsapi.org/v2/top-headlines?language=" + langue + "&apiKey=" + apiKey;
        return restTemplate.getForObject(url, NewsResponse.class);
    }
    
    public NewsResponse MultipleSourcesNews(String query,List<String> sources) {
        List<Article> articles = new ArrayList<>();

        for(String source : sources) {
            NewsResponse response = SourceNews(query, source);
            
            if(response != null && response.getArticles() != null) {
                articles.addAll(response.getArticles());
            }
        }

        NewsResponse newsResponse = new NewsResponse();
        newsResponse.setStatus("ok");
        newsResponse.setTotalResults(articles.size());
        newsResponse.setArticles(articles);

        return newsResponse;
    }

    public NewsSourceResponse GetSources() {
        String url = String.format("https://newsapi.org/v2/sources?apiKey=%s",
         apiKey);
        return restTemplate.getForObject(url, NewsSourceResponse.class);
    }

    public NewsSourceResponse GetSourceByCategory(String category) {
        String url = String.format("https://newsapi.org/v2/sources?category=%s&apiKey=%s",
         category, apiKey);
        return restTemplate.getForObject(url, NewsSourceResponse.class);
    }
    
}
