
package com.tradelearn.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CourseDataInitializer {

    @Bean
    CommandLineRunner seedCourses(CourseRepository repository) {
        return args -> {
            if (repository.count() > 0) {
                return;
            }

            repository.save(new Course(
                    "Stock Market Fundamentals",
                    "Learn stocks, NSE, BSE, demat accounts and order types.",
                    "Stock Market", "Beginner", 999.0, "TradeLearn Academy"));

            repository.save(new Course(
                    "Technical Analysis Masterclass",
                    "Learn candlesticks, support, resistance and indicators.",
                    "Technical Analysis", "Intermediate", 1499.0, "TradeLearn Academy"));

            repository.save(new Course(
                    "Intraday Trading",
                    "Learn intraday setups, entries, exits and stop-loss.",
                    "Intraday", "Intermediate", 1999.0, "TradeLearn Academy"));

            repository.save(new Course(
                    "Swing Trading Strategies",
                    "Understand multi-day setups and position sizing.",
                    "Swing Trading", "Intermediate", 1499.0, "TradeLearn Academy"));

            repository.save(new Course(
                    "Futures and Options",
                    "Understand futures, calls, puts and options risks.",
                    "Futures & Options", "Advanced", 2499.0, "TradeLearn Academy"));

            repository.save(new Course(
                    "Fundamental Analysis",
                    "Learn financial statements and company valuation.",
                    "Investing", "Intermediate", 1999.0, "TradeLearn Academy"));

            repository.save(new Course(
                    "Cryptocurrency Trading",
                    "Learn crypto markets and risk management.",
                    "Crypto", "Beginner", 1999.0, "TradeLearn Academy"));

            repository.save(new Course(
                    "Forex and Currency Markets",
                    "Learn currency pairs, spreads and leverage risks.",
                    "Forex", "Intermediate", 1999.0, "TradeLearn Academy"));

            repository.save(new Course(
                    "Commodity Trading",
                    "Learn gold, silver and commodity market basics.",
                    "Commodities", "Intermediate", 1999.0, "TradeLearn Academy"));

            repository.save(new Course(
                    "Risk Management and Trading Psychology",
                    "Learn position sizing, discipline and risk control.",
                    "Risk Management", "All Levels", 999.0, "TradeLearn Academy"));

            System.out.println("TradeLearn: 10 sample courses inserted.");
        };
    }
}
