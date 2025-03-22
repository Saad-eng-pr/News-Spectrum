// PoliticalContext.java
package fr.isima.NewsSpectrum.Models;

import java.util.Map;

public class PoliticalContext {
    private String countryCode;
    private Map<String, Double> keywords;

    // Constructeur par défaut
    public PoliticalContext() {
    }

    // Constructeur paramétré
    public PoliticalContext(String countryCode, Map<String, Double> keywords) {
        this.countryCode = countryCode;
        this.keywords = keywords;
    }

    // Getter et Setter pour countryCode
    public String getCountryCode() {
        return countryCode;
    }

    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }

    // Getter et Setter pour keywords
    public Map<String, Double> getKeywords() {
        return keywords;
    }

    public void setKeywords(Map<String, Double> keywords) {
        this.keywords = keywords;
    }
}
