"use client";

import React from "react";
import { hasCookie, setCookie } from "cookies-next";
import { Button } from "./ui/button";

const CookieConsent = ({ cookiesBanner }:{cookiesBanner: string}) => {
  const [showConsent, setShowConsent] = React.useState(false);

  React.useEffect(() => {
    // Show the consent banner only if the 'localConsent' cookie does not exist
    setShowConsent(!hasCookie("localConsent"));
  }, []);

  const acceptCookie = () => {
    const oneYearFromNow = new Date();
    oneYearFromNow.setDate(oneYearFromNow.getDate() + 365);
    setCookie("localConsent", "true", { expires: oneYearFromNow });
    setShowConsent(false);
  };

  if (!showConsent) {
    return null;
  }
  // bg-gray-900 bg-opacity-50 z-50 
  return (
    <div className="fixed inset-x-0 sm:inset-x-auto sm:right-3 bottom-3 flex justify-center items-center z-50">
      <div className="w-full mx-4 max-w-2xl sm:max-w-xl sm:mx-auto bg-background border border-slate-200 p-3 shadow-lg rounded-lg">
        <div className="flex flex-col sm:flex-row justify-between items-center space-x-4">
          <p>{cookiesBanner}</p>
          <Button
            className="bg-gray-500 h-full hover:bg-gray-600 text-white text-xs sm:text-sm font-bold mt-2 sm:mt-0 py-1 px-2 sm:py-2 sm:px-6 rounded transition-all duration-300 ease-in-out"
            onClick={acceptCookie}
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
