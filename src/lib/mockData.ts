// PSNA College of Engineering and Technology - Driver Comfort Analytics Mock Data

export const mockDrivers = [
  { id: 'd1', name: 'Murugesan', score: 94, rank: 1, consistency: 96, risk: 'Top Performer', driverContrib: 15, roadContrib: 85, trips: 142, trend: 'up', badge: 'Stable', route: 'Dindigul → Madurai' },
  { id: 'd2', name: 'Karthikeyan', score: 91, rank: 2, consistency: 92, risk: 'Top Performer', driverContrib: 18, roadContrib: 82, trips: 138, trend: 'up', badge: 'Stable', route: 'Dindigul → Theni' },
  { id: 'd3', name: 'Anbazhagan', score: 87, rank: 3, consistency: 89, risk: 'Good', driverContrib: 22, roadContrib: 78, trips: 156, trend: 'stable', badge: 'Stable', route: 'City Local - Route A' },
  { id: 'd4', name: 'Selvakumar', score: 84, rank: 4, consistency: 85, risk: 'Good', driverContrib: 25, roadContrib: 75, trips: 124, trend: 'up', badge: 'Stable', route: 'Dindigul → Madurai' },
  { id: 'd5', name: 'Rajagopal', score: 79, rank: 5, consistency: 81, risk: 'Good', driverContrib: 28, roadContrib: 72, trips: 112, trend: 'down', badge: 'Stable', route: 'City Local - Route B' },
  { id: 'd6', name: 'Deivanai', score: 72, rank: 6, consistency: 68, risk: 'Needs Improvement', driverContrib: 42, roadContrib: 58, trips: 98, trend: 'down', badge: 'Unpredictable', route: 'Dindigul → Theni' },
  { id: 'd7', name: 'Meenakshi', score: 68, rank: 7, consistency: 64, risk: 'Needs Improvement', driverContrib: 45, roadContrib: 55, trips: 104, trend: 'down', badge: 'Unpredictable', route: 'City Local - Route C' },
  { id: 'd8', name: 'Pazhanivel', score: 62, rank: 8, consistency: 58, risk: 'High-Risk', driverContrib: 52, roadContrib: 48, trips: 86, trend: 'down', badge: 'Unpredictable', route: 'Dindigul → Madurai' },
  { id: 'd9', name: 'Thangavel', score: 58, rank: 9, consistency: 52, risk: 'High-Risk', driverContrib: 58, roadContrib: 42, trips: 92, trend: 'down', badge: 'Unpredictable', route: 'Dindigul → Theni' },
  { id: 'd10', name: 'Ilayaraja', score: 54, rank: 10, consistency: 48, risk: 'High-Risk', driverContrib: 65, roadContrib: 35, trips: 74, trend: 'down', badge: 'Unpredictable', route: 'City Local - Route D' },
];

export const mockTrips = [
  {
    id: 't1',
    driverId: 'd1',
    driverName: 'Murugesan',
    date: '2025-05-06',
    time: '07:30 AM',
    duration: '1h 15m',
    distance: '62 km',
    avgComfort: 94,
    peakWRMS: 0.32,
    spikes: 1,
    driverDiscomfort: 8,
    couldImprove: 5,
    route: 'Dindigul → Madurai',
    rating: 5,
    driverInducedSpikes: 0,
  },
  {
    id: 't2',
    driverId: 'd8',
    driverName: 'Pazhanivel',
    date: '2025-05-06',
    time: '07:45 AM',
    duration: '1h 20m',
    distance: '64 km',
    avgComfort: 64,
    peakWRMS: 0.82,
    spikes: 12,
    driverDiscomfort: 42,
    couldImprove: 35,
    route: 'Dindigul → Madurai',
    rating: 2,
    driverInducedSpikes: 9,
  },
  {
    id: 't3',
    driverId: 'd2',
    driverName: 'Karthikeyan',
    date: '2025-05-06',
    time: '08:00 AM',
    duration: '1h 45m',
    distance: '78 km',
    avgComfort: 92,
    peakWRMS: 0.38,
    spikes: 3,
    driverDiscomfort: 12,
    couldImprove: 8,
    route: 'Dindigul → Theni',
    rating: 5,
    driverInducedSpikes: 1,
  },
  {
    id: 't4',
    driverId: 'd10',
    driverName: 'Ilayaraja',
    date: '2025-05-06',
    time: '08:15 AM',
    duration: '45m',
    distance: '12 km',
    avgComfort: 56,
    peakWRMS: 0.94,
    spikes: 18,
    driverDiscomfort: 62,
    couldImprove: 50,
    route: 'Dindigul City Local',
    rating: 1,
    driverInducedSpikes: 14,
  }
];

export const mockEvents = [
  { id: 'e1', timestamp: '2025-05-06 08:22:14', driver: 'Ilayaraja', type: 'Harsh Braking', severity: 'high', wrms: 0.94, speed: 42, cause: 'Driver-induced', description: 'Sudden brake at city intersection' },
  { id: 'e2', timestamp: '2025-05-06 08:35:07', driver: 'Pazhanivel', type: 'Rapid Acceleration', severity: 'medium', wrms: 0.72, speed: 58, cause: 'Driver-induced', description: 'Aggressive acceleration on highway' },
  { id: 'e3', timestamp: '2025-05-06 08:42:33', driver: 'Thangavel', type: 'Speed Spike', severity: 'high', wrms: 0.88, speed: 72, cause: 'Driver-induced', description: 'Overtaking maneuver without progressive speed' },
  { id: 'e4', timestamp: '2025-05-06 09:05:22', driver: 'Deivanai', type: 'Poor Handling', severity: 'medium', wrms: 0.65, speed: 48, cause: 'Driver-induced', description: 'Rapid steering correction' },
  { id: 'e5', timestamp: '2025-05-06 09:12:10', driver: 'Ilayaraja', type: 'Harsh Braking', severity: 'high', wrms: 0.89, speed: 35, cause: 'Driver-induced', description: 'Emergency stop due to late reaction' },
  { id: 'e6', timestamp: '2025-05-06 09:20:45', driver: 'Meenakshi', type: 'Instability', severity: 'medium', wrms: 0.58, speed: 52, cause: 'Driver-induced', description: 'Jerky steering input' },
];

export const mockAlerts = [
  { id: 'a1', driver: 'Ilayaraja', type: 'Critical High-Risk', severity: 'critical', count: 24, trend: '↑ 40%', message: 'Ilayaraja causes 40% more discomfort during braking compared to fleet average.' },
  { id: 'a2', driver: 'Thangavel', type: 'Aggressive Pattern', severity: 'high', count: 18, trend: '↑ 22%', message: 'Comfort drops significantly above 50 km/h due to aggressive throttle.' },
  { id: 'a3', driver: 'Pazhanivel', type: 'Safety Alert', severity: 'high', count: 12, trend: '↑ 15%', message: 'Most issues occur in the first 10 minutes of the trip, indicating poor warm-up handling.' },
];

export const mockInsights = [
  {
    driverId: 'd10',
    name: 'Ilayaraja',
    behaviorMetrics: { smoothness: 42, aggression: 88, stability: 38 },
    contribution: { driver: 65, road: 35 },
    insights: [
      { type: 'causal', text: 'Driver causes 40% more discomfort during braking', priority: 'high' },
      { type: 'pattern', text: 'Comfort drops significantly above 50 km/h', priority: 'high' },
      { type: 'timing', text: 'Most issues occur in first 10 minutes of trip', priority: 'medium' },
      { type: 'suggestion', text: 'Reduce sudden braking', priority: 'action' },
      { type: 'suggestion', text: 'Maintain smoother acceleration', priority: 'action' },
      { type: 'suggestion', text: 'Avoid rapid steering corrections', priority: 'action' },
    ]
  },
  {
    driverId: 'd1',
    name: 'Murugesan',
    behaviorMetrics: { smoothness: 96, aggression: 12, stability: 94 },
    contribution: { driver: 15, road: 85 },
    insights: [
      { type: 'causal', text: 'Exceptional smoothness during city navigation', priority: 'low' },
      { type: 'pattern', text: 'Maintains consistent comfort levels regardless of speed', priority: 'low' },
      { type: 'recommendation', text: 'Model driver for peer training sessions', priority: 'action' },
    ]
  }
];

export const fleetSummary = {
  avgComfort: 76,
  totalDrivers: 10,
  totalTrips: 1240,
  activeToday: 10,
  topDriver: 'Murugesan',
  topScore: 94,
  needsAttention: 3,
  avgDiscomfortContrib: 38,
  avgRoadContrib: 62,
  weeklyTrend: '+2.4%',
  operator: 'PSNA College of Engineering and Technology',
  location: 'Dindigul',
  program: 'Pilot Program - 10 Buses'
};

export const comfortTrendData = [
  { week: 'W1', score: 70 }, { week: 'W2', score: 72 }, { week: 'W3', score: 71 },
  { week: 'W4', score: 73 }, { week: 'W5', score: 75 }, { week: 'W6', score: 74 },
  { week: 'W7', score: 76 }, { week: 'W8', score: 78 }, { week: 'W9', score: 77 },
  { week: 'W10', score: 79 }, { week: 'W11', score: 81 }, { week: 'W12', score: 83 },
];

export const behaviorWeightage = {
  smoothness: 40,
  spikeFrequency: 35,
  consistency: 25
};
