import React, { useEffect, useState } from "react";
import SongInfo from "../modal/SongInfo";
import axios from "axios";
import { cloneDeep } from "lodash";
import "./chart.css";

const Chart = () => {
  const [appTracks, setAppTracks] = useState([]); // varijablu (const) smo napravili koja će držati stanje naše//appTracks-sadrzi nase početno stanje, a setAppTrack-sdrži stanje koje se mijenja
  //dohvatili smo podatke s api.dezera 1.korak

  // umisto component didMOunt bolje useEffect 2.korak
  useEffect(() => {
    axios
      .get(" https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart")
      .then((response) => {
        setAppTracks(response.data.tracks.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const [sortValue, setSortValue] = useState("select");

  const sorter = (stringValue) => {
    let sortCopy = cloneDeep(appTracks); //varijabla je. a setAppTracks JE FUNKCIJA !!!!!!
    switch (stringValue) {
      case "ascending":
        sortCopy.sort((itemA, itemB) => {
          return itemA.duration - itemB.duration;
        });
        setAppTracks(sortCopy);
        break;
      case "descending":
        sortCopy.sort((itemA, itemB) => {
          return itemB.duration - itemA.duration;
        });
        setAppTracks(sortCopy);
        break;
      default:
        break;
    }
  };

  const handleChange = (e) => {
    setSortValue(e.target.value);
  };
  useEffect(() => {
    sorter(sortValue); //funkcija
  }, [sortValue]); //dependecy

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="d-flex justify-content-between">
        <img
          style={{ width: "100px", height: "50" }}
          src={"https://download.logo.wine/logo/Deezer/Deezer-Logo.wine.png"}
        />

        <select
          className="form-select sorter-button mt-4 mb-4"
          id="sorter"
          name="sorter"
          value={sortValue}
          onChange={(e) => handleChange(e)}
        >
          <option value="select" disabled>
            Top 10 Songs
          </option>
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
      </div>

      <table className="elements">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Artist</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {appTracks.map((item) => {
            return <SongInfo song={item} />;
          })}
        </tbody>
      </table>
    </div>
  );
};
export default Chart;
