const fs = require("fs");
const path = require("path");

function generateRandomData(
  previousValue,
  min,
  max,
  avg,
  variance,
  isWeekend,
  weekendReduction
) {
  let randomDrift = (Math.random() - 0.5) * 2 * variance; // random drift within variance range
  let randomValue = previousValue * (1 + randomDrift);
  
  // Ensure the value stays within the specified min and max bounds
  randomValue = Math.max(min, Math.min(max, randomValue));

  if (isWeekend && weekendReduction) {
    const reductionFactor = 1 - (Math.random() * 0.15 + 0.1); // Reduce by 10-25%
    randomValue *= reductionFactor;
  }
  return Math.round(randomValue);
}

function generateData(startDate, endDate, categories) {
  const overviews = [];
  let currentDate = new Date(startDate);
  const endDateObj = new Date(endDate);

  // Initialize previous values with average values for each category
  const previousValues = {};
  categories.forEach((category) => {
    previousValues[category.name] = category.avg;
  });

  while (currentDate <= endDateObj) {
    const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6; // 0 = Sunday, 6 = Saturday
    const dataEntry = {
      date: currentDate.toISOString().split("T")[0] + "T00:00:00",
    };

    categories.forEach((category) => {
      dataEntry[category.name] = generateRandomData(
        previousValues[category.name],
        category.min,
        category.max,
        category.avg,
        category.variance,
        isWeekend,
        category.weekendReduction
      );
      previousValues[category.name] = dataEntry[category.name];
    });

    overviews.push(dataEntry);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return overviews;
}

const categories = [
  {
    name: "Rows written",
    min: 2500,
    max: 3700,
    avg: 3300,
    variance: 0.1,
    weekendReduction: false,
  },
  {
    name: "Rows read",
    min: 18000,
    max: 28000,
    avg: 22500,
    variance: 0.05,
    weekendReduction: false,
  },
  {
    name: "Queries",
    min: 478,
    max: 612,
    avg: 556,
    variance: 0.1,
    weekendReduction: true,
  },
];

const startDate = "2023-01-01";
const endDate = "2024-05-17";

const overviews = generateData(startDate, endDate, categories);

const dataString = `import { OverviewData } from "./schema";

export const overviews: OverviewData[] = ${JSON.stringify(overviews, null, 2)};
`;

const outputPath = path.join(__dirname, "overview-data.ts");

fs.writeFile(outputPath, dataString, (err) => {
  if (err) throw err;
  console.log(`Data has been written to ${outputPath}`);
});
