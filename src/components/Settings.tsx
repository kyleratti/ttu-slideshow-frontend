import { ISettings } from "@/types";
import React, { SetStateAction } from "react";
import { SettingsForm } from "./SettingsForm/SettingsForm";

export type SettingsProps = {
  settings: ISettings;
  setSettings: React.Dispatch<SetStateAction<ISettings>>;
};

const Settings: React.FC<SettingsProps> = ({ settings, setSettings }) => {
  return (
    <div id="settings" className="no-fullscreen">
      <h2>Settings</h2>

      <SettingsForm settings={settings} setSettings={setSettings} />

      <div>
        Tip: Press <code>F11</code> to toggle fullscreen mode
      </div>
    </div>
  );
};

export default Settings;
