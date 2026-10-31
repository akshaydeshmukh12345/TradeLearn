package com.tradelearn.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;

@Configuration
public class CourseDataInitializer {

    @Bean
    @Order(1)
    CommandLineRunner seedCourses(CourseRepository repository) {

        return args -> {

            saveCourse(
                    repository,
                    "Stock Market Fundamentals",
                    "Learn stocks, NSE, BSE, demat accounts and order types.",
                    "Stock Market",
                    "Beginner",
                    999.0,
                    "TradeLearn Academy"
            );

            saveCourse(
                    repository,
                    "Technical Analysis Masterclass",
                    "Learn candlesticks, support, resistance and indicators.",
                    "Technical Analysis",
                    "Intermediate",
                    1499.0,
                    "TradeLearn Academy"
            );

            saveCourse(
                    repository,
                    "Intraday Trading",
                    "Learn intraday setups, entries, exits and stop-loss.",
                    "Intraday",
                    "Intermediate",
                    1999.0,
                    "TradeLearn Academy"
            );

            saveCourse(
                    repository,
                    "Swing Trading Strategies",
                    "Understand multi-day setups and position sizing.",
                    "Swing Trading",
                    "Intermediate",
                    1499.0,
                    "TradeLearn Academy"
            );

            saveCourse(
                    repository,
                    "Futures and Options",
                    "Understand futures, calls, puts and options risks.",
                    "Futures & Options",
                    "Advanced",
                    2499.0,
                    "TradeLearn Academy"
            );

            saveCourse(
                    repository,
                    "Fundamental Analysis",
                    "Learn financial statements and company valuation.",
                    "Investing",
                    "Intermediate",
                    1999.0,
                    "TradeLearn Academy"
            );

            saveCourse(
                    repository,
                    "Cryptocurrency Trading",
                    "Learn crypto markets and risk management.",
                    "Crypto",
                    "Beginner",
                    1999.0,
                    "TradeLearn Academy"
            );

            saveCourse(
                    repository,
                    "Forex and Currency Markets",
                    "Learn currency pairs, spreads and leverage risks.",
                    "Forex",
                    "Intermediate",
                    1999.0,
                    "TradeLearn Academy"
            );

            saveCourse(
                    repository,
                    "Commodity Trading",
                    "Learn gold, silver and commodity market basics.",
                    "Commodities",
                    "Intermediate",
                    1999.0,
                    "TradeLearn Academy"
            );

            saveCourse(
                    repository,
                    "Risk Management and Trading Psychology",
                    "Learn position sizing, discipline and risk control.",
                    "Risk Management",
                    "All Levels",
                    999.0,
                    "TradeLearn Academy"
            );

            System.out.println(
                    "TradeLearn: Course initialization completed."
            );
        };
    }

    private void saveCourse(
            CourseRepository repository,
            String title,
            String description,
            String category,
            String level,
            double price,
            String instructor
    ) {

        boolean exists = repository.findAll()
                .stream()
                .anyMatch(course -> course.getTitle().equals(title));

        if (exists) {
            return;
        }

        Course course = new Course(
                title,
                description,
                category,
                level,
                price,
                instructor
        );

        repository.save(course);

        System.out.println("Course added: " + title);
    }
}