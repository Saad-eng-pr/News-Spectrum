// CountryCodeUtils.java
package fr.isima.NewsSpectrum.Utils;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class CountryCodeUtils {
    private static final Map<String, String> COUNTRY_CONTEXT_MAP;
    
    static {
        Map<String, String> map = new HashMap<>();
        map.put("us", "western");
        map.put("fr", "western");
        map.put("uk", "western");
        map.put("de", "western");
        map.put("it", "western");
        map.put("es", "western");
        map.put("ma", "arab");
        map.put("ae", "arab");
        map.put("sa", "arab");
        map.put("cn", "asian");
        map.put("jp", "asian");
        map.put("in", "asian");
        map.put("ru", "eastern");
        map.put("br", "latin");
        map.put("ar", "latin");
        map.put("za", "african");
        map.put("ng", "african");
        // Ajouter d'autres mappings si nécessaire

        COUNTRY_CONTEXT_MAP = Collections.unmodifiableMap(map);
    }
    
    // Constructeur privé pour empêcher l'instanciation
    private CountryCodeUtils() {
        throw new UnsupportedOperationException("Cette classe utilitaire ne peut pas être instanciée");
    }
    
    /**
     * Retourne le contexte politique associé au code de pays.
     * Si le code de pays n'est pas trouvé, "global" est retourné par défaut.
     *
     * @param countryCode le code du pays
     * @return le contexte politique associé ou "global" si non défini
     */
    public static String getPoliticalContext(String countryCode) {
        if (countryCode == null) {
            return "global";
        }
        return COUNTRY_CONTEXT_MAP.getOrDefault(countryCode.toLowerCase(), "global");
    }
    
    /**
     * Retourne la map des contextes politiques.
     *
     * @return une map non modifiable associant les codes pays à leur contexte politique
     */
    public static Map<String, String> getCountryContextMap() {
        return COUNTRY_CONTEXT_MAP;
    }
    public static String extractCountryFromSource(String sourceName) {
        Map<String, String> sourceCountryMapping = Map.ofEntries(
            Map.entry("Tous", "all"),
            Map.entry("ABC-News", "us"),
            Map.entry("ABC-News-(AU)", "au"),
            Map.entry("Aftenposten", "no"),
            Map.entry("Al-Jazeera-English", "qa"),
            Map.entry("ANSA.it", "it"),
            Map.entry("Argaam", "sa"),
            Map.entry("Ars-Technica", "us"),
            Map.entry("Ary-News", "pk"),
            Map.entry("Associated-Press", "us"),
            Map.entry("Australian-Financial-Review", "au"),
            Map.entry("Axios", "us"),
            Map.entry("BBC-News", "gb"),
            Map.entry("BBC-Sport", "gb"),
            Map.entry("Bild", "de"),
            Map.entry("Blasting-News-(BR)", "br"),
            Map.entry("Bleacher-Report", "us"),
            Map.entry("Bloomberg", "us"),
            Map.entry("Breitbart-News", "us"),
            Map.entry("Business Insider", "us"),
            Map.entry("Buzzfeed", "us"),
            Map.entry("CBC-News", "ca"),
            Map.entry("CBS-News", "us"),
            Map.entry("CNN", "us"),
            Map.entry("CNN-Spanish", "us"),
            Map.entry("Crypto-Coins-News", "us"),
            Map.entry("Der-Tagesspiegel", "de"),
            Map.entry("Die-Zeit", "de"),
            Map.entry("El-Mundo", "es"),
            Map.entry("Engadget", "us"),
            Map.entry("Entertainment-Weekly", "us"),
            Map.entry("ESPN", "us"),
            Map.entry("ESPN-Cric-Info", "in"),
            Map.entry("Financial-Post", "ca"),
            Map.entry("Focus", "de"),
            Map.entry("Football Italia", "it"),
            Map.entry("Fortune", "us"),
            Map.entry("FourFourTwo", "gb"),
            Map.entry("Fox-News", "us"),
            Map.entry("Fox-Sports", "us"),
            Map.entry("Globo", "br"),
            Map.entry("Google-News", "all"),
            Map.entry("Google-News-(Argentina)", "ar"),
            Map.entry("Google-News-(Australia)", "au"),
            Map.entry("Google-News-(Brasil)", "br"),
            Map.entry("Google-News-(Canada)", "ca"),
            Map.entry("Google-News-(France)", "fr"),
            Map.entry("Google-News-(India)", "in"),
            Map.entry("Google-News-(Israel)", "il"),
            Map.entry("Google-News-(Italy)", "it"),
            Map.entry("Google-News-(Russia)", "ru"),
            Map.entry("Google-News-(Saudi Arabia)", "sa"),
            Map.entry("Google-News-(UK)", "gb"),
            Map.entry("Göteborgs-Posten", "se"),
            Map.entry("Gruenderszene", "de"),
            Map.entry("Hacker-News", "us"),
            Map.entry("Handelsblatt", "de"),
            Map.entry("IGN", "us"),
            Map.entry("Il-Sole-24-Ore", "it"),
            Map.entry("Independent", "gb"),
            Map.entry("Infobae", "ar"),
            Map.entry("InfoMoney", "br"),
            Map.entry("La-Gaceta", "es"),
            Map.entry("La-Nacion", "ar"),
            Map.entry("La-Repubblica", "it"),
            Map.entry("Le-Monde", "fr"),
            Map.entry("Lenta", "ru"),
            Map.entry("L'equipe", "fr"),
            Map.entry("Les-Echos", "fr"),
            Map.entry("Liberation", "fr"),
            Map.entry("Marca", "es"),
            Map.entry("Mashable", "us"),
            Map.entry("Medical-News-Today", "us"),
            Map.entry("MSNBC", "us"),
            Map.entry("MTV-News", "us"),
            Map.entry("MTV-News-(UK)", "gb"),
            Map.entry("National-Geographic", "us"),
            Map.entry("National-Review", "us"),
            Map.entry("NBC-News", "us"),
            Map.entry("News24", "za"),
            Map.entry("New-Scientist", "gb"),
            Map.entry("News.com.au", "au"),
            Map.entry("Newsweek", "us"),
            Map.entry("New-York-Magazine", "us"),
            Map.entry("Next-Big-Future", "us"),
            Map.entry("NFL-News", "us"),
            Map.entry("NHL-News", "us"),
            Map.entry("NRK", "no"),
            Map.entry("Politico", "us"),
            Map.entry("Polygon", "us"),
            Map.entry("RBC", "ca"),
            Map.entry("Recode", "us"),
            Map.entry("Reddit-/r/all", "all"),
            Map.entry("Reuters", "gb"),
            Map.entry("RT", "ru"),
            Map.entry("RTE", "ie"),
            Map.entry("RTL-Nieuws", "nl"),
            Map.entry("SABQ", "sa"),
            Map.entry("Spiegel-Online", "de"),
            Map.entry("Svenska-Dagbladet", "se"),
            Map.entry("T3n", "de"),
            Map.entry("TalkSport", "gb"),
            Map.entry("TechCrunch", "us"),
            Map.entry("TechCrunch-(CN)", "cn"),
            Map.entry("TechRadar", "gb"),
            Map.entry("The American-Conservative", "us"),
            Map.entry("The-Globe-And-Mail", "ca"),
            Map.entry("The-Hill", "us"),
            Map.entry("The-Hindu", "in"),
            Map.entry("The-Huffington-Post", "us"),
            Map.entry("The-Irish-Times", "ie"),
            Map.entry("The-Jerusalem-Post", "il"),
            Map.entry("The-Lad-Bible", "gb"),
            Map.entry("The-Next-Web", "us"),
            Map.entry("The-Sport-Bible", "gb"),
            Map.entry("The-Times-of-India", "in"),
            Map.entry("The-Verge", "us"),
            Map.entry("The-Wall-Street-Journal", "us"),
            Map.entry("The Washington Post", "us"),
            Map.entry("The-Washington-Times", "us"),
            Map.entry("Time", "us"),
            Map.entry("USA-Today", "us"),
            Map.entry("Vice-News", "us"),
            Map.entry("Wired", "us"),
            Map.entry("Wired.de", "de"),
            Map.entry("Wirtschafts-Woche", "de"),
            Map.entry("Xinhua-Net", "cn"),
            Map.entry("Ynet", "il")
        );
        return sourceCountryMapping.getOrDefault(sourceName, "us");
    }
}
