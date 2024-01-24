import React from "react";
import { useTranslation } from "react-i18next";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

// LanguageSelector component
const LanguageSelector = () => {
  // Access the translation functionality
  const { i18n } = useTranslation();

  // Handle language change
  const handleChangeLanguage = (event) => {
    // Get the selected language from the event
    const selectedLanguage = event.target.value;

    // Change the language using i18n
    i18n.changeLanguage(selectedLanguage);
  };

  // JSX structure for LanguageSelector component
  return (
    <FormControl fullWidth variant='outlined' margin='normal'>
      <InputLabel id='language-label'>Language</InputLabel>
      <Select
        labelId='language-label'
        id='language'
        value={i18n.language} // Set the current language as the default value
        onChange={handleChangeLanguage} // Handle language change
        label='Language'
        sx={{ width: "100%" }}
      >
        {/* Language options */}
        <MenuItem value='en'>English</MenuItem>
        <MenuItem value='it'>Italiano</MenuItem>
        <MenuItem value='fr'>Français</MenuItem>
        <MenuItem value='ja'>日本語</MenuItem>
        <MenuItem value='zh'>中文</MenuItem>
      </Select>
    </FormControl>
  );
};

// Export the LanguageSelector component as the default export
export default LanguageSelector;
