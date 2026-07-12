// Mock Reports data for the Reports & Analytics module.

export const reportTypes = [
  { id: 'environmental', title: 'Environmental', icon: 'forest', description: 'Carbon footprint, energy efficiency metrics, and water usage analysis across all facilities.' },
  { id: 'social', title: 'Social', icon: 'diversity_3', description: 'Workforce diversity, employee turnover, and community impact programs and engagement.' },
  { id: 'governance', title: 'Governance', icon: 'account_balance', description: 'Board structure, executive compensation, and compliance tracking with global regulations.' },
  { id: 'summary', title: 'ESG Summary', icon: 'analytics', description: 'A holistic overview combining all pillars into a single stakeholder-ready executive summary.' },
]

export const facilityData = [
  { facility: 'Oslo Central Hub', co2: 1240.5, energy: 3890, water: 1200, waste: 45, status: 'Optimized' },
  { facility: 'Berlin Production Plant B', co2: 4560.2, energy: 12100, water: 5800, waste: 230, status: 'Attention' },
  { facility: 'Singapore Logistics Center', co2: 890.4, energy: 2150, water: 980, waste: 62, status: 'Optimized' },
  { facility: 'São Paulo Distribution Hub', co2: 2100.8, energy: 6450, water: 3200, waste: 145, status: 'On Track' },
  { facility: 'Tokyo R&D Campus', co2: 680.1, energy: 1890, water: 720, waste: 28, status: 'Optimized' },
]

export const monthlySummary = [
  { month: 'Jan', co2: 9200, energy: 28000, renewablePercent: 34 },
  { month: 'Feb', co2: 8800, energy: 27200, renewablePercent: 36 },
  { month: 'Mar', co2: 8500, energy: 26100, renewablePercent: 38 },
  { month: 'Apr', co2: 8100, energy: 25400, renewablePercent: 41 },
  { month: 'May', co2: 7600, energy: 24200, renewablePercent: 44 },
  { month: 'Jun', co2: 7200, energy: 23500, renewablePercent: 47 },
]

export const reportHistory = [
  { id: 1, title: 'Q1 2024 Environmental Report', type: 'Environmental', generatedAt: '2024-04-02T09:30:00Z', status: 'Completed', format: 'PDF' },
  { id: 2, title: 'Annual ESG Summary 2023', type: 'ESG Summary', generatedAt: '2024-01-15T14:00:00Z', status: 'Completed', format: 'PDF' },
  { id: 3, title: 'Social Impact Q4 2023', type: 'Social', generatedAt: '2023-12-20T11:00:00Z', status: 'Completed', format: 'Excel' },
]
