import { Injectable } from '@angular/core';
import IConfiguration from "./configuration.model";

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  getConfiguration(): IConfiguration | null {
    const configFromLocalStorage = localStorage.getItem('configuration');

    if (configFromLocalStorage) {
      return JSON.parse(configFromLocalStorage);
    }

    return null;
  }

  saveConfiguration(config: IConfiguration) {
    localStorage.setItem('configuration', JSON.stringify(config));
  }
}
