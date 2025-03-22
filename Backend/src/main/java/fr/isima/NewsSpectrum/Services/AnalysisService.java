package fr.isima.NewsSpectrum.Services;

import fr.isima.NewsSpectrum.DTO.LoginUserDto;
import fr.isima.NewsSpectrum.DTO.RegisterUserDto;
import fr.isima.NewsSpectrum.Models.*;
import fr.isima.NewsSpectrum.Repositories.UserRepository;
import fr.isima.NewsSpectrum.Utils.CountryCodeUtils;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AnalysisService {
    @Value("${political.contexts.file}")
    private String politicalContextsFile;
    
    private final Map<String, PoliticalContext> politicalContexts;
    
    public AnalysisService() {
        this.politicalContexts = loadPoliticalContexts();
    }
    
    private Map<String, PoliticalContext> loadPoliticalContexts() {
        // Charger depuis un fichier JSON/YAML
        Map<String, PoliticalContext> contexts = new HashMap<>();
        
        // Exemple pour le contexte occidental
        PoliticalContext westernContext = new PoliticalContext();
        Map<String, Double> westernKeywords = new HashMap<>();
        westernKeywords.put("socialist", -0.8);
        westernKeywords.put("liberal", -0.5);
        westernKeywords.put("conservative", 0.6);
        westernKeywords.put("nationalist", 0.8);
        westernContext.setKeywords(westernKeywords);
        
        contexts.put("western", westernContext);
        return contexts;
    }
    
    public AnalysisResponse analyze(List<Article> articles) {
    AnalysisResponse response = new AnalysisResponse();
    Map<String, Double> biasScores = new HashMap<>();
    Map<String, String> articleContexts = new HashMap<>(); // Renommé

    for (Article article : articles) {
        // Étape 1 : Extraire le pays de la source
        String sourceName = article.getSource().getName();
        String countryCode = extractCountryCodeFromSource(sourceName);
        
        // Étape 2 : Obtenir le contexte politique
        String contextKey = CountryCodeUtils.getPoliticalContext(countryCode);
        PoliticalContext context = this.politicalContexts.getOrDefault(contextKey, getDefaultContext());
        
        // Étape 3 : Analyse NLP
        NLPAnalyzer analyzer = new NLPAnalyzer(context);
        String content = String.join(" ", article.getTitle(), article.getDescription(), article.getContent());
        double biasScore = analyzer.analyzeBias(content);
        
        // Étape 4 : Stocker les résultats
        biasScores.put(article.getUrl(), biasScore);
        articleContexts.put(article.getUrl(), contextKey);
    }

    response.setBiasScores(biasScores);
    response.setPoliticalContexts(articleContexts);
    response.setSummary(generateComparativeSummary(articles, biasScores));
    
    return response;
}

private PoliticalContext getDefaultContext() {
    return politicalContexts.getOrDefault("global", new PoliticalContext());
}

private String extractCountryCodeFromSource(String sourceName) {
    // Logique pour extraire le code pays du nom de la source
    Pattern pattern = Pattern.compile("\\((\\w{2})\\)$"); // Exemple: "Source (FR)"
    Matcher matcher = pattern.matcher(sourceName);
    return matcher.find() ? matcher.group(1).toLowerCase() : "us";
}
    
    private String generateComparativeSummary(List<Article> articles, Map<String, Double> biasScores) {
        // Implémentation de résumé comparatif
        long leftLeaning = biasScores.values().stream().filter(score -> score < -0.3).count();
        long rightLeaning = biasScores.values().stream().filter(score -> score > 0.3).count();
        
        return String.format("L'analyse de %d articles montre :\n- %d tendances progressistes\n- %d tendances conservatrices\n- %d positions neutres",
                            articles.size(), leftLeaning, rightLeaning, 
                            articles.size() - (leftLeaning + rightLeaning));
    }
}