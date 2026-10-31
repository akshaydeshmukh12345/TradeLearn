package com.tradelearn.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CurriculumDataInitializer {

    @Bean
    CommandLineRunner seedCurriculum(
            CourseRepository courses,
            CourseModuleRepository modules) {

        return args -> {
            seed(courses, modules, "Stock Market Fundamentals", new String[][]{
                {"Module 1: Stock Market Basics", "What is the Stock Market?|12 min", "How Stock Exchanges Work?|15 min", "NSE and BSE Explained|12 min"},
                {"Module 2: Understanding Shares", "Stocks and Shares|13 min", "Market Capitalization|16 min", "Bull and Bear Markets|11 min"},
                {"Module 3: Starting Your Investment Journey", "Demat and Trading Accounts|15 min", "Types of Orders|17 min", "Building Your First Investment Plan|20 min"}
            });

            seed(courses, modules, "Technical Analysis Masterclass", new String[][]{
                {"Module 1: Chart and Candlestick Basics", "Introduction to Price Charts|12 min", "Understanding Candlesticks|16 min", "Chart Timeframes|13 min"},
                {"Module 2: Technical Indicators", "Support and Resistance|18 min", "Moving Averages|16 min", "RSI and MACD|17 min"},
                {"Module 3: Chart Patterns", "Head and Shoulders Pattern|15 min", "Breakouts and False Breakouts|19 min", "Building a Technical Trading Plan|20 min"}
            });

            seed(courses, modules, "Intraday Trading", new String[][]{
                {"Module 1: Intraday Trading Basics", "What is Intraday Trading?|12 min", "Market Timings and Sessions|14 min", "Intraday Trading Rules|15 min"},
                {"Module 2: Entry and Exit Strategies", "Identifying Entry Points|16 min", "Stop-Loss and Target Setting|18 min", "Price and Volume Analysis|15 min"},
                {"Module 3: Intraday Practice", "Popular Intraday Setups|20 min", "Managing Trading Emotions|15 min", "Creating an Intraday Plan|18 min"}
            });

            seed(courses, modules, "Swing Trading Strategies", new String[][]{
                {"Module 1: Swing Trading Foundations", "Introduction to Swing Trading|12 min", "Finding Market Trends|15 min", "Choosing Timeframes|13 min"},
                {"Module 2: Swing Trading Setups", "Support and Resistance Zones|16 min", "Breakout Trading Strategies|18 min", "Pullback Strategies|15 min"},
                {"Module 3: Trade Management", "Position Sizing|14 min", "Managing Overnight Risk|17 min", "Building a Swing Trading Plan|20 min"}
            });

            seed(courses, modules, "Futures and Options", new String[][]{
                {"Module 1: Derivatives Fundamentals", "Introduction to Derivatives|12 min", "Understanding Futures Contracts|16 min", "Understanding Options Contracts|15 min"},
                {"Module 2: Calls and Puts", "Call Options Explained|14 min", "Put Options Explained|14 min", "Strike Price and Expiry|16 min"},
                {"Module 3: Options Risk", "Option Premium and Time Value|18 min", "Basic Options Strategies|20 min", "Understanding Options Risks|18 min"}
            });

            seed(courses, modules, "Fundamental Analysis", new String[][]{
                {"Module 1: Company Analysis", "Introduction to Fundamental Analysis|12 min", "Understanding Business Models|15 min", "Reading Annual Reports|18 min"},
                {"Module 2: Financial Statements", "Profit and Loss Statement|16 min", "Balance Sheet Basics|16 min", "Cash Flow Statement|15 min"},
                {"Module 3: Valuation", "Understanding P/E Ratio|14 min", "Financial Ratios|17 min", "Company Valuation Basics|20 min"}
            });

            seed(courses, modules, "Cryptocurrency Trading", new String[][]{
                {"Module 1: Crypto Fundamentals", "What is Cryptocurrency?|12 min", "Blockchain Technology|16 min", "Understanding Crypto Exchanges|14 min"},
                {"Module 2: Crypto Markets", "Crypto Market Cycles|15 min", "Reading Crypto Charts|17 min", "Bitcoin and Altcoins|14 min"},
                {"Module 3: Crypto Risk", "Crypto Wallet Safety|15 min", "Volatility and Risk|18 min", "Building a Responsible Crypto Plan|20 min"}
            });

            seed(courses, modules, "Forex and Currency Markets", new String[][]{
                {"Module 1: Forex Fundamentals", "Introduction to Forex|12 min", "Currency Pairs Explained|15 min", "Major and Minor Pairs|13 min"},
                {"Module 2: Forex Analysis", "Pips, Lots and Spreads|16 min", "Forex Charts and Trends|17 min", "Economic Events and News|18 min"},
                {"Module 3: Forex Risk Management", "Leverage and Margin|15 min", "Stop-Loss in Forex|16 min", "Forex Trading Plan|20 min"}
            });

            seed(courses, modules, "Commodity Trading", new String[][]{
                {"Module 1: Commodity Market Basics", "Introduction to Commodities|12 min", "Gold and Silver Markets|15 min", "Energy and Agricultural Commodities|16 min"},
                {"Module 2: Commodity Trading", "Commodity Futures Basics|17 min", "Understanding Contract Sizes|15 min", "Commodity Price Drivers|18 min"},
                {"Module 3: Commodity Risk", "Commodity Market Volatility|15 min", "Position Sizing|16 min", "Commodity Trading Checklist|20 min"}
            });

            seed(courses, modules, "Risk Management and Trading Psychology", new String[][]{
                {"Module 1: Risk Management Foundations", "Understanding Trading Risk|12 min", "Capital Protection|14 min", "Risk Tolerance|13 min"},
                {"Module 2: Position Sizing and Stop-Loss", "Position Sizing Explained|15 min", "Calculating Stop-Loss|17 min", "Risk-to-Reward Ratio|14 min"},
                {"Module 3: Trading Psychology", "Managing Trading Emotions|16 min", "Avoiding Revenge Trading|15 min", "Building Trading Discipline|20 min"}
            });

            System.out.println("TradeLearn: Curriculum seeding completed.");
        };
    }

    private void seed(
            CourseRepository courses,
            CourseModuleRepository modules,
            String courseTitle,
            String[][] moduleData) {

        Course course = courses.findAll().stream()
                .filter(item -> item.getTitle().equals(courseTitle))
                .findFirst()
                .orElse(null);

        if (course == null || modules.existsByCourse_Id(course.getId())) {
            return;
        }

        for (int i = 0; i < moduleData.length; i++) {
            String[] data = moduleData[i];

            CourseModule module = new CourseModule(
                    data[0],
                    i + 1,
                    course
            );

            for (int j = 1; j < data.length; j++) {
                String[] lessonData = data[j].split("\\|", 2);

                module.addLesson(new Lesson(
                        lessonData[0],
                        lessonData[1],
                        j
                ));
            }

            modules.save(module);
        }

        System.out.println("Curriculum added: " + courseTitle);
    }
}