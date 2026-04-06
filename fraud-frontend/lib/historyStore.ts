"use client";

// Utility to manage local storage history and derive analytics

export const getHistory = () => {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem("transaction_history_v2");
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Failed to parse history", e);
  }
  return [];
};

export const getAlerts = () => {
  const history = getHistory();
  // Return only High or Critical risk as alerts, sorted by newest
  return history
    .filter((tx: any) => tx.risk === "High" || tx.risk === "Critical" || tx.score > 50)
    .slice(0, 10);
};

export const getAnalytics = () => {
  const history = getHistory();
  const total = history.length;
  const fraudCount = history.filter((tx: any) => tx.risk === "Critical" || tx.risk === "High").length;
  const safeCount = total - fraudCount;
  
  const riskDistribution = {
    Low: 0,
    Medium: 0,
    High: 0,
    Critical: 0
  };

  let totalAmountScanned = 0;
  let totalAmountBlocked = 0;

  history.forEach((tx: any) => {
    totalAmountScanned += tx.amount;
    if (tx.risk === "High" || tx.risk === "Critical") {
       totalAmountBlocked += tx.amount;
    }
    
    if (riskDistribution[tx.risk as keyof typeof riskDistribution] !== undefined) {
      riskDistribution[tx.risk as keyof typeof riskDistribution]++;
    } else {
       riskDistribution.Low++; // Fallback
    }
  });

  return {
    total,
    fraudCount,
    safeCount,
    riskDistribution,
    totalAmountScanned,
    totalAmountBlocked,
  };
};

// Fallback empty state for charts
export const getEmptyChartData = () => ({
  labels: ['Low Risk', 'Medium Risk', 'High Risk', 'Critical'],
  values: [0, 0, 0, 0]
});
