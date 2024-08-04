// src/context/LanguageContext.js
import React, { createContext, useState, useContext } from 'react';
import {CultureCode, languageMap} from "../../Constants/Language/cultureCode";
import {useTranslation} from "react-i18next";

const LanguageContext = createContext<any>();

export const LanguageProvider = ({ children }) => {

    const { i18n } = useTranslation()

    const [cultureCode, setCultureCode] = useState(CultureCode.EN);

    const switchLanguage = (code:any) => {
        const language = languageMap[code];
        if (language) {
            setCultureCode(code);
            i18n.changeLanguage(language); // Ensure the language is passed correctly
        } else {
            console.error(`Invalid culture code: ${code}`);
        }
    };

    return (
        <LanguageContext.Provider value={{ cultureCode, switchLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);