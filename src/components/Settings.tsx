import { ISettings } from "@/types";
import React, { SetStateAction } from "react";

const clamp = (num: number, min: number, max: number) =>
  Math.max(min, Math.min(num, max));

type SettingsProps = {
  settings: ISettings;
  setSettings: React.Dispatch<SetStateAction<ISettings>>;
};

const Settings: React.FC<SettingsProps> = ({ settings, setSettings }) => {
  return (
    <div id="settings" className="no-fullscreen">
      <h1>Settings</h1>

      <form>
        <div className="input intervalInput">
          <label htmlFor="interval">
            Interval (
            <abbr title="milliseconds (NumberOfSeconds * 1000)">ms</abbr>):
          </label>

          <input
            type="number"
            max={1000 * 20}
            min={500}
            defaultValue={settings.interval}
            onChange={(e) =>
              setSettings({
                ...settings,
                interval: clamp(e.target.valueAsNumber, 500, 1000 * 20),
              })
            }
          />
        </div>

        <div className="input apiUrlInput">
          <label htmlFor="apiUrl">API URL:</label>

          <input
            type="url"
            title="See me before touching this"
            defaultValue={settings.apiUrl}
            onChange={(e) =>
              setSettings({
                ...settings,
                apiUrl: e.target.value,
              })
            }
            readOnly
          />
        </div>
      </form>

      <div>
        Tip: Press <code>F11</code> to toggle fullscreen mode
      </div>
    </div>
  );
};

export default Settings;
