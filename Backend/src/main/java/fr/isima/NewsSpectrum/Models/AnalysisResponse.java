// AnalysisResponse.java
package fr.isima.NewsSpectrum.Models;

import java.util.Map;

public class AnalysisResponse {
    private String summary;
    private Map<String, Double> biasScores;
    private Map<String, String> politicalContexts;

    // Constructeur par défaut
    public AnalysisResponse() {
    }

    // Constructeur paramétré
    public AnalysisResponse(String summary, Map<String, Double> biasScores, Map<String, String> politicalContexts) {
        this.summary = summary;
        this.biasScores = biasScores;
        this.politicalContexts = politicalContexts;
    }

    // Getter et Setter pour summary
    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    // Getter et Setter pour biasScores
    public Map<String, Double> getBiasScores() {
        return biasScores;
    }

    public void setBiasScores(Map<String, Double> biasScores) {
        this.biasScores = biasScores;
    }

    // Getter et Setter pour politicalContexts
    public Map<String, String> getPoliticalContexts() {
        return politicalContexts;
    }

    public void setPoliticalContexts(Map<String, String> politicalContexts) {
        this.politicalContexts = politicalContexts;
    }
}
