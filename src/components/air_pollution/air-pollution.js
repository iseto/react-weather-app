import "./air-pollution.css";

const AirPollution = ({ data }) => {
  const AIR_QUALITY_INDEX = {
    1: "Good",
    2: "Fair",
    3: "Moderate",
    4: "Poor",
    5: "Very Poor",
  };

  let aqi = data.list[0].main.aqi;

  const handleAirQualityIndex = (object, row) => {
    return object[row];
  };

  return (
    <div className="air-pollution">
      <div className="top">
        <p>
          Air Quality Index: {handleAirQualityIndex(AIR_QUALITY_INDEX, aqi)}
        </p>
      </div>
    </div>
  );
};

export default AirPollution;
