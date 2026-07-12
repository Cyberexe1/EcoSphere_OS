// Mock Settings/Configuration data.

export const defaultOrganizations = [
  { id: 1, name: 'EcoSphere North America', icon: 'apartment', users: 42, role: 'Regional Admin', permissions: 'Read/Write', status: 'Active' },
  { id: 2, name: 'EcoSphere Europe Hub', icon: 'factory', users: 118, role: 'Global Viewer', permissions: 'Read Only', status: 'Active' },
  { id: 3, name: 'Supply Chain Beta Org', icon: 'inventory', users: 5, role: 'Standard User', permissions: 'Restricted', status: 'Pending' },
]

export const defaultConfig = {
  esg: {
    autoEmission: true,
    requireReviewer: false,
    anonymize: true,
  },
  notifications: {
    complianceAlerts: true,
    weeklySummary: true,
    smsMfa: false,
  },
}

export const auditLog = [
  { id: 1, action: 'config.esg.autoEmission', value: true, changedBy: 'Sarah Jenkins', at: '2024-06-10T08:22:00Z' },
  { id: 2, action: 'org.add', value: 'Supply Chain Beta Org', changedBy: 'Sarah Jenkins', at: '2024-06-08T14:55:00Z' },
  { id: 3, action: 'config.notifications.smsMfa', value: false, changedBy: 'Admin', at: '2024-06-05T10:00:00Z' },
]
