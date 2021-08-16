const aqiBreakPoints = [
  {
    concentrationsLow: 0,
    concentrationsHigh: 12,
    aqiLow: 0,
    aqiHigh: 50,
  },
  {
    concentrationsLow: 12.1,
    concentrationsHigh: 35.4,
    aqiLow: 51,
    aqiHigh: 100,
  },
  {
    concentrationsLow: 35.5,
    concentrationsHigh: 55.4,
    aqiLow: 101,
    aqiHigh: 150,
  },
  {
    concentrationsLow: 55.5,
    concentrationsHigh: 150.4,
    aqiLow: 151,
    aqiHigh: 200,
  },
  {
    concentrationsLow: 150.5,
    concentrationsHigh: 250.4,
    aqiLow: 201,
    aqiHigh: 300,
  },
  {
    concentrationsLow: 250.5,
    concentrationsHigh: 500.4,
    aqiLow: 301,
    aqiHigh: 500,
  },
];

// https://forum.airnowtech.org/t/the-aqi-equation/169
export const pm25ToAqi = pm25 => {
  const breakPoints = aqiBreakPoints.find(
    x => x.concentrationsLow <= pm25 && x.concentrationsHigh >= pm25
  );
  if (breakPoints == null) return 500;

  const {
    concentrationsLow,
    concentrationsHigh,
    aqiLow,
    aqiHigh,
  } = breakPoints;
  return Math.round(
    ((aqiHigh - aqiLow) / (concentrationsHigh - concentrationsLow)) *
      (pm25 - concentrationsLow) +
      aqiLow
  );
};

export const aqiToClass = aqi => {
  switch (true) {
    case aqi <= 50 && aqi >= 0:
      return "good";
    case aqi <= 100 && aqi >= 51:
      return "fair";
    case aqi <= 150 && aqi >= 101:
      return "unhealthy-sensitive";
    case aqi <= 200 && aqi >= 151:
      return "unhealthy";
    case aqi <= 300 && aqi >= 201:
      return "very-unhealthy";
    case aqi <= 500 && aqi >= 301:
      return "hazardous";
    default:
      throw Error("invalid aqi");
  }
};
