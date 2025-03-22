package fr.isima.NewsSpectrum.Models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class NewsSourceResponse {
    private String status;
    private List<NewsSource> sources;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;    
    }

    public List<NewsSource> getSources() {
        return sources;
    }

    public void setSources(List<NewsSource> sources) {
        this.sources = sources;
    }
}
