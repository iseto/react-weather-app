import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "./forecast.css";

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Forecast = ({ data }) => {
  const dayInAWeek = new Date().getDate();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
  );

  return (
    <div className="">
      <label className="title">Daily</label>
      <Accordion allowZeroExpanded>
        {data.list.splice(0, 7).map((item, index) => (
          <AccordionItem key={index}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="daily-item">
                  <img
                    alt="weather"
                    className="icon-small"
                    src={`icons/${item.weather[0].icon}.png`}
                  />
                  <label className="day">{forecastDays[index]}</label>
                  <label className="description">
                    {item.weather[0].description}
                  </label>
                  <label className="min-max">
                    {Math.round(item.main.temp_min)}°C /{" "}
                    {Math.round(item.main.temp_max)}°C
                  </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="daily-details-grid">
                <div className="daily-details-grid-item">
                  <label className="">Pressure</label>
                  <label className="">{item.main.pressure} hPa</label>
                </div>
                <div className="daily-details-grid-item">
                  <label className="">Humidity</label>
                  <label className="">{item.main.humidity} %</label>
                </div>
                <div className="daily-details-grid-item">
                  <label className="">Clouds</label>
                  <label className="">{item.clouds.all} %</label>
                </div>
                <div className="daily-details-grid-item">
                  <label className="">Wind speed</label>
                  <label className="">{item.wind.speed} m/s</label>
                </div>
                <div className="daily-details-grid-item">
                  <label className="">Sea level</label>
                  <label className="">{item.main.sea_level} m</label>
                </div>
                <div className="daily-details-grid-item">
                  <label className="">Feels like</label>
                  <label className="">
                    {Math.round(item.main.feels_like)} °C
                  </label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Forecast;
