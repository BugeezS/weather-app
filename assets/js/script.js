import { getLocation } from "./getLocation.js";
import { background } from "./background.js";
import { chart } from "./charts.js";
import { fetchCityNames, displayAutocompleteOptions } from "./inputText.js";

getLocation();
background();
fetchCityNames();
displayAutocompleteOptions();
chart();
