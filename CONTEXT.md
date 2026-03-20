# Mehrwert — Project Context

## Concept
A personal "True Value Calculator" — measures life contributions beyond income:
health, mind, community (Freiwilligen-Arbeit), ecology, relationships.

## Current state
- React/JSX single-file artifact (true-value-calculator.jsx)
- 5 categories, slider-based input, research-backed CHF monetary estimates
- Sources: Freiwilligen-Monitor CH 2025, BFS SAKE 2024, Circular Economy Journal 2024, CDC, Holt-Lunstad 2010

## Key design decisions
- Dark theme, Playfair Display + DM Mono fonts
- Score 0–100 with radial rings per category
- Monetary banner showing CHF equivalent of non-monetary contributions
- "Sources" toggle per category showing research backing

## Next steps (to discuss in Claude Code)
- [ ] Persistent storage across sessions
- [ ] Swiss-specific activities (Pro Natura, Gemeinde, etc.)
- [ ] Share/export score
