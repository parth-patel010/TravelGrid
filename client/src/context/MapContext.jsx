import { createContext, useContext, useState, useEffect, useMemo } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapContext = createContext();

export const useMapContext = () => {
  const context = useContext(MapContext);
  if (!context) throw new Error("useMapContext must be used within MapProvider");
  return context;
};

export const MapProvider = ({ children }) => {
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    try {
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });
    } catch (err) {
      console.error("Leaflet icon fix failed:", err);
    }

    setMapReady(true);
  }, []);

  const contextValue = useMemo(() => ({ mapReady }), [mapReady]);

  return (
    <MapContext.Provider value={contextValue}>
      {children}
    </MapContext.Provider>
  );
};
