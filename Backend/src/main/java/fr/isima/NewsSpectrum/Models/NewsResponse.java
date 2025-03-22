package fr.isima.NewsSpectrum.Models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;


@JsonIgnoreProperties(ignoreUnknown = true)
public class NewsResponse {
    private String status;
    private int totalResults;
    private List<Article> articles;

    public void setStatus(String status) {
        this.status = status;
    }

    public void setTotalResults(int totalResults) {
        this.totalResults = totalResults;
    }

    public void setArticles(List<Article> articles) {
        this.articles = articles;    
    }

    public String getStatus() {
        return status;
    }   

    public int getTotalResults() {    
        return totalResults;
    }

    public List<Article> getArticles() {
        return articles;
    }
    
}
