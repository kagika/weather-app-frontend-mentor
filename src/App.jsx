import { useState, useEffect } from "react";
import countryBg from "./assets/bg-today-large.svg";
import sun from "./assets/icon-sunny.webp";
import "./App.css";
import { coordinateApi, fetchWeather } from "../api";

function App() {
  const [openUnit, setopenUnit] = useState(false);
  const [rotation, setRotation] = useState(false);
  const [unit, setUnit] = useState(false);
  const [tempUnit, settempUnit] = useState(false);
  const [wspeedUnit, setwspeedUnit] = useState(false);
  const [precipitationUnit, setprecipitationUnit] = useState(false);
  const [formData, setformData] = useState("");
  const [locationSuggestions, setlocationSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const filtered = [
    ...new Set(
      locationSuggestions.filter((loc) =>
        loc.toLowerCase().includes(formData.toLowerCase()),
      ),
    ),
  ];

  function fetchData() {
    return setTimeout(async () => {
      const results = await coordinateApi(formData);
      setlocationSuggestions(results.map((loc) => loc.name));
    }, 300);
  }

  useEffect(() => {
    if (!formData) {
      setlocationSuggestions([]);
      return;
    }
    const timer = setTimeout(async () => {
      const results = await coordinateApi(formData);
      setlocationSuggestions(results.map((loc) => loc.name));
    }, 300);
    return () => clearTimeout(timer);
  }, [formData]);

  function handleinputChange(e) {
    setformData(e.target.value);
  }

  function handleonSubmit(e) {
    e.preventDefault();
  }
  function unitsButton() {
    setopenUnit(!openUnit);
    setRotation(!rotation);
  }

  return (
    <>
      <main>
        <div className="container">
          <nav className="navbar">
            <ul className="nav-items">
              <span>
                <h1>Weather Now</h1>
              </span>
              <div className="dropdown">
                <div className="select" onClick={unitsButton}>
                  <i
                    className={`bi bi-gear-fill ${rotation ? "gear-spin" : null}`}
                  ></i>
                  <span>Units</span>
                  <i
                    className={`bi bi-arrow-down ${openUnit ? "flip" : null}`}
                  ></i>
                </div>

                <div
                  className={openUnit ? "dropdown-content" : null}
                  style={{ display: openUnit ? null : "none" }}
                >
                  {/* False in this case needs to be the metric system while true means imperial system */}
                  <h5
                    onClick={() => {
                      (setUnit(!unit),
                        settempUnit(!tempUnit),
                        setwspeedUnit(!wspeedUnit),
                        setprecipitationUnit(!precipitationUnit));
                    }}
                  >
                    Switch to {unit ? "Metric" : "Imperial"}
                  </h5>

                  <ul className="content-items">
                    <h6>Temperature</h6>
                    <p className={tempUnit ? null : "container-items-active"}>
                      Celcius (&#x2103;)
                      {tempUnit ? null : <i class="bi bi-check"></i>}{" "}
                    </p>
                    <p className={tempUnit ? "container-items-active" : null}>
                      Fahrenheit (&#x2109;){" "}
                      {tempUnit ? <i class="bi bi-check"></i> : null}
                    </p>
                  </ul>
                  <ul className="content-items">
                    <h6>Wind Speed</h6>
                    <p className={tempUnit ? null : "container-items-active"}>
                      km/h {unit ? null : <i class="bi bi-check"></i>}{" "}
                    </p>
                    <p className={tempUnit ? "container-items-active" : null}>
                      mph {unit ? <i class="bi bi-check"></i> : null}
                    </p>
                  </ul>
                  <ul className="content-items">
                    <h6>Precipitation</h6>
                    <p className={tempUnit ? null : "container-items-active"}>
                      Millimeters (mm){" "}
                      {unit ? null : <i class="bi bi-check"></i>}
                    </p>
                    <p className={tempUnit ? "container-items-active" : null}>
                      Inches (in) {unit ? <i class="bi bi-check"></i> : null}
                    </p>
                  </ul>
                </div>
              </div>
            </ul>
          </nav>
          <div className="title">
            <h1>How's the sky looking today</h1>
          </div>

          {/* SEARCH INPUT BAR  */}

          <div className="search-bar">
            
              <form action="GET" onSubmit={handleonSubmit}>
                <label htmlFor="locationInput"></label>
                <div className="input-wrapper">
                <input
                  type="text"
                  value={formData}
                  name="locationInput "
                  id=""
                  onChange={(e) => handleinputChange(e)}
                />
                <div className="location-suggestions">
                {filtered.map((loc, index) => (
                  <p key={index}> {loc}</p>
                ))}
              </div>
                </div>
                <button type="submit">Search </button>
              </form>

            
            
          </div>

          <div className="weather">
            <div className="data">
              <div
                className="today"
                style={{
                  backgroundImage: `url(${countryBg})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "bottom",
                }}
              >
                <div className="today-text">
                  <h3>Berlin,Germany</h3>
                  <p>Tuesday, Aug 5 2025</p>
                </div>
                <div className="weather-icon">
                  <img src={sun} alt="" style={{ maxHeight: "100px" }} />
                  <p>20</p>
                </div>
              </div>
              <div className="forecast">
                <div className="forecast-details">
                  <h5>Feels like</h5>
                  <p>18</p>
                </div>
                <div className="forecast-details">
                  <h5>Humidity</h5>
                  <p>46%</p>
                </div>
                <div className="forecast-details">
                  <h5>Wind</h5>
                  <p>14 km/h</p>
                </div>
                <div className="forecast-details">
                  <h5>Precipitation</h5>
                  <p>0 mm</p>
                </div>
              </div>
              <div className="daily-forecast">
                <h5>Daily Forecast</h5>
                <div className="week">
                  <div className="day-of-the-week">Tuesday</div>
                  <div className="day-of-the-week">Wednesday</div>
                  <div className="day-of-the-week">Thursday</div>
                  <div className="day-of-the-week">Friday</div>
                  <div className="day-of-the-week">Saturday</div>
                  <div className="day-of-the-week">Sunday</div>
                  <div className="day-of-the-week">Monday</div>
                </div>
              </div>
            </div>

            <div className="hourly-forecast">
              <div className="hourly-title">
                <h5>Hourly forecast</h5>
                <button>Tuesday</button>
              </div>
              <div className="hourly-weather">
                <div className="hourly-data"></div>
                <div className="hourly-data"></div>
                <div className="hourly-data"></div>
                <div className="hourly-data"></div>
                <div className="hourly-data"></div>
                <div className="hourly-data"></div>
                <div className="hourly-data"></div>
                <div className="hourly-data"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
