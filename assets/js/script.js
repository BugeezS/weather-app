import { getLocation } from "./getLocation.js";
import { background } from "./background.js";
import { fetchCityNames, displayAutocompleteOptions } from "./inputText.js";

getLocation();
background();
fetchCityNames();
displayAutocompleteOptions();
