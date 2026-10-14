
package com.tradelearn.backend;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://127.0.0.1:5173"
})
public class CourseController {

    @GetMapping
    public List<Course> getCourses() {
        return List.of(
            new Course(
                1L,
                "Stock Market Fundamentals",
                "Learn NSE, BSE, stocks, demat accounts and order types.",
                "Stock Market",
                "Beginner",
                999.0,
                "TradeLearn Academy"
            ),
            new Course(
                2L,
                "Technical Analysis Masterclass",
                "Learn candlesticks, support, resistance and indicators.",
                "Technical Analysis",
                "Intermediate",
                1499.0,
                "TradeLearn Academy"
            ),
            new Course(
                3L,
                "Intraday Trading",
                "Understand trading setups, entries, exits and stop-loss.",
                "Intraday",
                "Intermediate",
                1999.0,
                "TradeLearn Academy"
            ),
            new Course(
                4L,
                "Swing Trading Strategies",
                "Learn multi-day setups, trends and position sizing.",
                "Swing Trading",
                "Intermediate",
                1499.0,
                "TradeLearn Academy"
            ),
            new Course(
                5L,
                "Futures and Options",
                "Understand futures, calls, puts, option Greeks and risks.",
                "Futures & Options",
                "Advanced",
                2499.0,
                "TradeLearn Academy"
            ),
            new Course(
                6L,
                "Fundamental Analysis",
                "Learn financial statements, valuation and company analysis.",
                "Investing",
                "Intermediate",
                1999.0,
                "TradeLearn Academy"
            ),
            new Course(
                7L,
                "Cryptocurrency Trading",
                "Learn crypto markets, blockchain basics and risk management.",
                "Crypto",
                "Beginner",
                1999.0,
                "TradeLearn Academy"
            ),
            new Course(
                8L,
                "Forex and Currency Markets",
                "Learn currency pairs, spreads, leverage and applicable risks.",
                "Forex",
                "Intermediate",
                1999.0,
                "TradeLearn Academy"
            ),
            new Course(
                9L,
                "Commodity Trading",
                "Learn gold, silver, crude oil and commodity futures basics.",
                "Commodities",
                "Intermediate",
                1999.0,
                "TradeLearn Academy"
            ),
            new Course(
                10L,
                "Risk Management and Trading Psychology",
                "Learn position sizing, discipline and risk control.",
                "Risk Management",
                "All Levels",
                999.0,
                "TradeLearn Academy"
            )
        );
    }
}
