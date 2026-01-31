# DiabeTwin Results Visualization Framework

## Overview

This document outlines the visualization components available for displaying diabetes risk assessment results. These components provide a foundation for creating engaging and informative user interfaces that help communicate the severity and implications of the risk assessment.

## Components Available

### 1. **RiskGauge**
Visual representation of risk severity on a color-coded gauge.

**Props:**
- `riskLevel: 'low' | 'medium' | 'high'`

**Usage:**
```tsx
<RiskGauge riskLevel="high" />
```

**Purpose:** Shows at a glance whether the diabetes risk is low, medium, or high with visual color coding (green, yellow, red).

---

### 2. **ProbabilityDisplay**
Large, prominent display of the diabetes risk probability as a percentage.

**Props:**
- `probability: number` (0-1, e.g., 0.75 for 75%)

**Usage:**
```tsx
<ProbabilityDisplay probability={0.75} />
```

**Purpose:** Makes the risk percentage immediately visible and emphasizes severity through color changes.

---

### 3. **ImpactBreakdown**
Shows the top 5 factors that contributed most to the risk assessment result.

**Props:**
- `impacts: Array<{ feature: string; impact: number }>`

**Usage:**
```tsx
<ImpactBreakdown impacts={[
  { feature: "BMI", impact: 12.5 },
  { feature: "Age", impact: 8.3 },
  // ...
]} />
```

**Purpose:** Helps users understand which specific factors influenced their result most.

---

### 4. **RiskFactorsList**
Displays risk factors and protective factors in two columns.

**Props:**
- `positive: string[]` - Factors increasing risk
- `protective: string[]` - Factors decreasing risk

**Usage:**
```tsx
<RiskFactorsList 
  positive={["High BMI", "Family History"]}
  protective={["Regular Exercise", "Healthy Diet"]}
/>
```

**Purpose:** Makes it clear which lifestyle and health factors are working for or against the user.

---

### 5. **ComparisonChart**
Compares user's health metrics against healthy reference ranges.

**Props:**
- `metrics: Array<{ label: string; your: number; healthy: number; unit: string }>`

**Usage:**
```tsx
<ComparisonChart metrics={[
  { label: "BMI", your: 28, healthy: 24, unit: "" },
  { label: "Blood Glucose", your: 145, healthy: 100, unit: "mg/dL" }
]} />
```

**Purpose:** Visualizes how user metrics compare to healthy ranges.

---

### 6. **TimelineRecommendation**
Action plan recommendations organized by timeframe and priority.

**Props:**
- `recommendations: Array<{ timeframe: string; action: string; priority: 'high' | 'medium' | 'low' }>`

**Usage:**
```tsx
<TimelineRecommendation recommendations={[
  { timeframe: "Immediate", action: "Schedule doctor appointment", priority: "high" },
  { timeframe: "This Month", action: "Start daily 30-min walks", priority: "medium" }
]} />
```

**Purpose:** Provides actionable, prioritized steps for risk reduction.

---

### 7. **HealthScoreCard**
Overall health score with color-coded severity indicator.

**Props:**
- `score: number` (0-100)

**Usage:**
```tsx
<HealthScoreCard score={65} />
```

**Purpose:** Provides a simple numeric summary of overall health status.

---

## Design Approach

### Color Scheme
- **Green**: Healthy, low risk, protective factors
- **Yellow**: Moderate risk, caution needed
- **Red**: High risk, immediate action needed
- **Blue**: Neutral, informational

### Visual Hierarchy
Components use:
- Large, bold numbers for critical values
- Color coding for quick risk assessment
- Clear labeling and legends
- Comparative visualizations for context

### Accessibility
- All components use semantic HTML
- Color is supplemented with text/icons for color-blind users
- Font sizes ensure readability
- High contrast ratios maintained

---

## Future Enhancement Opportunities

### Advanced Chart Libraries
Currently, visualizations use CSS-based bars and gauges. Future versions could integrate:
- **Recharts** for interactive charts (ROC curves, feature importance plots)
- **D3.js** for custom interactive visualizations
- **Apache ECharts** for complex medical dashboards

### Potential New Components
1. **ROC Curve** - Show model performance
2. **Feature Importance Waterfall** - Detailed SHAP value visualization
3. **Risk Trajectory Chart** - Show how different interventions could change risk over time
4. **Heatmap** - Show correlation between factors
5. **Sankey Diagram** - Show flow of risk from multiple factors
6. **Risk Distribution Comparison** - Show where user falls in population

### Interactive Features
- Hover tooltips with detailed explanations
- Toggle between different data views
- Export results as PDF/image
- Download recommendations as action plan
- Share results securely with healthcare provider

---

## Integration Example

Here's how to use multiple components together in a results view:

```tsx
'use client';

import { RiskGauge, ProbabilityDisplay, ImpactBreakdown, RiskFactorsList, TimelineRecommendation, HealthScoreCard } from '@/components/ResultsVisualization';

export function ResultsPage({ results }: { results: PredictionResults }) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {/* Main Result */}
      <div className="md:col-span-1">
        <RiskGauge riskLevel={results.riskLevel} />
        <ProbabilityDisplay probability={results.probability} />
        <HealthScoreCard score={results.healthScore} />
      </div>

      {/* Analysis */}
      <div className="md:col-span-2 space-y-6">
        <ImpactBreakdown impacts={results.impacts} />
        <RiskFactorsList 
          positive={results.riskFactors}
          protective={results.protectiveFactors}
        />
        <TimelineRecommendation recommendations={results.recommendations} />
      </div>
    </div>
  );
}
```

---

## Development Guidelines

### Adding New Visualization Component

1. **Create component** in `/components/ResultsVisualization.tsx`
2. **Follow naming convention**: `[Feature]Display` or `[Feature]Chart`
3. **Export from file**: Add to exports at top
4. **Document in this file**: Update components list with props and usage
5. **Use consistent styling**: Follow existing color and spacing patterns
6. **Ensure accessibility**: Add alt text, ARIA labels, sufficient contrast

### Testing Visualizations

Test with different data ranges:
- Edge cases (0%, 100%, min, max values)
- Realistic ranges from model output
- Different screen sizes
- Accessibility tools (color blind simulators, screen readers)

---

## Tips for Medical Context

When displaying health risk information:
- Always include disclaimer: "Results are for reference only. Consult healthcare professionals."
- Avoid alarming language for high-risk results
- Emphasize actionability: "Here's what you can do..."
- Include educational resources
- Provide clear pathway to professional consultation
- Consider mental health impact of risk information

---

## Resources

- [Recharts Documentation](https://recharts.org/)
- [SHAP Documentation](https://shap.readthedocs.io/)
- [Medical Data Visualization Best Practices](https://www.interaction-design.org/literature/article/information-visualization-in-healthcare)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
