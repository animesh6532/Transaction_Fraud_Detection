export const getMockAlerts = () => [
  {
    id: "tx-7842A",
    amount: 14500.0,
    time: "2 mins ago",
    risk: "Critical",
    reason: "Amount spike + unusual geography",
    type: "Wire Transfer"
  },
  {
    id: "tx-9921B",
    amount: 450.0,
    time: "7 mins ago",
    risk: "High",
    reason: "Velocity: 5 txns in 10 mins",
    type: "Card Present"
  },
  {
    id: "tx-3290C",
    amount: 2100.5,
    time: "14 mins ago",
    risk: "Medium",
    reason: "First time merchant",
    type: "E-Commerce"
  },
  {
    id: "tx-4011D",
    amount: 8990.0,
    time: "22 mins ago",
    risk: "High",
    reason: "Time zone mismatch",
    type: "Card Not Present"
  }
];

export const getChartData = () => ({
  trendData: {
    labels: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
    safe: [140, 150, 130, 160, 180, 145, 120],
    fraud: [3, 2, 5, 1, 4, 2, 6]
  },
  distributionData: {
    labels: ['Low Risk', 'Medium Risk', 'High Risk', 'Critical'],
    values: [85, 10, 4, 1]
  }
});
