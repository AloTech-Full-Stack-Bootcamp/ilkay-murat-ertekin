import { series } from "./data.js";
import { fancyLogSeriesReport } from "./utils.js";

export function SeriesTracker(series) {
  this.numberOfWatched = 0;
  this.numberOfUnWatched = 0;
  this.series = [];
  this.lastSerie = undefined;
  this.currentSerie = undefined;
  this.nextSerie = undefined;

  this.add = function (serie) {
    this.series.push(serie);

    if (serie.isWatched) {
      // increase numberOfWatched
      this.numberOfWatched += 1;
      // Calculate numberOfUnWatched
      this.numberOfUnWatched = this.series.length - this.numberOfWatched;
      // Convert finishedDate type string to Date
      serie.finishedDate = new Date(serie.finishedDate);
      // sort series
      this.series.sort((a, b) => !a.finishedDate - !b.finishedDate);
      this.lastSerie = this.series[0];
      // Define lastSerie by FinishedDate
      if (
        serie.finishedDate &&
        serie.finishedDate > this.lastSerie.finishedDate
      ) {
        this.lastSerie = serie;
      }
    } else {
      // Define currentSerie
      if (serie.isCurrent === true) {
        this.currentSerie = serie;
      } else if (!this.nextSerie) {
        // If nextSerie does not exist, define nextSerie
        this.nextSerie = serie;
      }
    }
  };

  //check to see if we have series to process
  if (series.length > 0) {
    series.map((serie) => this.add(serie));
    //Loop through all of the series in the "series" argument
    //Use the .add function to handle adding series, so we keep counts updated.
  }

  this.finishSerie = function () {
    this.series.map((serie) => {
      if (serie.isCurrent === true) {
        return (
          // Set isCurrent property to false when serial is finished
          (serie.isCurrent = false),
          // Add the isWatched property with a value of true
          (serie["isWatched"] = true),
          // Add the finishedDate property with a value of Now
          (serie["finishedDate"] = new Date())
        );
      }
    });
    // add the finished series to the lastSeries
    this.lastSerie = this.currentSerie;
    // Add the isCurrent property of the previous nextSeries with the value true
    this.nextSerie["isCurrent"] = true;
    // currentSerie assing previous nextSerie
    this.currentSerie = this.nextSerie;
    // Define existing nextSeries as undefine
    this.nextSerie = undefined;
    // İf nextSerie is undefined and
    // isCurrent and Watched property false, define nextSerie
    this.series.map((serie) => {
      if (
        serie.isCurrent !== true &&
        serie.isWatched !== true &&
        !this.nextSerie
      ) {
        this.nextSerie = serie;
      }
    });
    // incrase numberOfWatched
    this.numberOfWatched += 1;
    // decrease numberOfUnWatched
    this.numberOfUnWatched -= 1;
  };

  this.printSeriesReport = function () {
    fancyLogSeriesReport(this);
  };
}

// Case 1
// -------------------------------------------------

/* const mySeriesTracker = new SeriesTracker(series);
mySeriesTracker.printSeriesReport(); */

// Case 2
// -------------------------------------------------

/* const mySeriesTracker = new SeriesTracker(series);
mySeriesTracker.finishSerie();
mySeriesTracker.printSeriesReport(); */

// Case 3
// -------------------------------------------------

/* const mySeriesTracker = new SeriesTracker(series);
const newSerie = {
  id: "9",
  name: "Lost",
  genre: "Adventure",
  directorId: "4"
};
mySeriesTracker.add(newSerie);
mySeriesTracker.printSeriesReport(); */
