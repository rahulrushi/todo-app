import { useEffect, useState } from "react";

const PWAInstallPrompt = () => {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault(); // Prevent default browser banner
      setInstallPrompt(event);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (installPrompt) {
      installPrompt.prompt();
      installPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the PWA install.");
        } else {
          console.log("User dismissed the PWA install.");
        }
        setShowPrompt(false);
      });
    }
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-md flex items-center justify-between">
      <p>Install this app for a better experience!</p>
      <button
        className="bg-white text-blue-600 px-3 py-1 rounded-lg font-semibold"
        onClick={handleInstallClick}
      >
        Install
      </button>
    </div>
  );
};

export default PWAInstallPrompt;
