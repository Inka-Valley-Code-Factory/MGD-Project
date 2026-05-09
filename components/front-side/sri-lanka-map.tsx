"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, Tooltip, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { motion, AnimatePresence } from "framer-motion";

// Fix Leaflet marker icons in Next.js
const customIcon = L.divIcon({
  className: "custom-marker",
  html: `<div class="relative flex items-center justify-center">
          <div class="absolute w-6 h-6 bg-orange-500/30 rounded-full animate-ping"></div>
          <div class="relative w-3 h-3 bg-orange-500 rounded-full border-2 border-white shadow-[0_0_10px_rgba(234,88,12,0.8)]"></div>
        </div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

interface SitePoint {
  id: number;
  name: string;
  position: [number, number];
  location: string;
  category: string;
  description: string;
  image: string;
}

interface SriLankaMapProps {
  onSiteClick?: (siteId: number) => void;
}

const sitePoints: SitePoint[] = [
  { id: 1, name: "The Obsidian Tower", location: "Colombo", category: "Commercial", position: [6.9271, 79.8612], description: "Landmark skyscraper engineering in the heart of the capital.", image: "/site_1.png" },
  { id: 2, name: "Azure Bay Villa", location: "Galle", category: "Residential", position: [6.0329, 80.2170], description: "Ultra-luxury coastal living with high-performance facade systems.", image: "/site_2.png" },
  { id: 3, name: "Nexus Tech Hub", location: "Kandy", category: "Industrial", position: [7.2906, 80.6337], description: "Modern industrial complex integrated with green technology.", image: "/site_3.png" },
  { id: 4, name: "Eco Link Bridge", location: "Jaffna", category: "Infrastructure", position: [9.6615, 80.0125], description: "Sustainable infrastructure connecting communities in the North.", image: "/site_4.png" },
  { id: 5, name: "Meridian Mall", location: "Negombo", category: "Commercial", position: [7.2008, 79.8737], description: "Premium retail destination with advanced climate control.", image: "/site_1.png" },
  { id: 6, name: "Serenity Gardens", location: "Kurunegala", category: "Residential", position: [7.4818, 80.3609], description: "Eco-conscious living integrated with vertical forests.", image: "/site_2.png" },
  { id: 7, name: "Velocity Logistics Park", location: "Hambantota", category: "Industrial", position: [6.1247, 81.1185], description: "Automated distribution hub for global logistics.", image: "/site_3.png" },
  { id: 8, name: "Pinnacle Airport Terminal", location: "Katunayake", category: "Infrastructure", position: [7.1725, 79.8853], description: "Futuristic passenger terminal with seamless flow design.", image: "/site_4.png" },
];

const SriLankaMap = ({ onSiteClick }: SriLankaMapProps) => {
  return (
    <div className="relative w-full h-[500px] lg:h-[700px] rounded-[32px] overflow-hidden border border-white/10 shadow-2xl bg-[#0b0d10]">
      <style jsx global>{`
        .leaflet-container {
          background: #0b0d10 !important;
          width: 100%;
          height: 100%;
        }
        .leaflet-tooltip {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          padding: 0 !important;
        }
        .leaflet-tooltip-top:before {
          border-top-color: transparent !important;
        }
        .leaflet-control-zoom {
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          background: rgba(11, 13, 16, 0.5) !important;
          backdrop-filter: blur(10px) !important;
          border-radius: 12px !important;
          overflow: hidden !important;
        }
        .leaflet-control-zoom a {
          background: transparent !important;
          color: white !important;
          border: none !important;
        }
        .leaflet-control-zoom a:hover {
          background: rgba(255, 255, 255, 0.1) !important;
        }
      `}</style>

      <MapContainer
        center={[7.8731, 80.7718]}
        zoom={7}
        minZoom={7}
        maxZoom={18}
        maxBounds={[[5.8, 79.2], [10.0, 82.0]]}
        maxBoundsViscosity={1.0}
        zoomControl={false}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        {/* Real Satellite/Dark Map Layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        {/*site markers*/}
        {sitePoints.map((site) => (
          <Marker 
            key={site.id} 
            position={site.position} 
            icon={customIcon}
            eventHandlers={{
              click: () => onSiteClick?.(site.id),
            }}
          >
            <Tooltip 
              direction="top" 
              offset={[0, -20]} 
              opacity={1}
              sticky={true}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="w-64 overflow-hidden rounded-2xl bg-[#0b0d10]/90 backdrop-blur-xl border border-white/10 shadow-2xl"
              >
                <div className="relative h-24 w-full">
                  <img src={site.image} alt={site.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d10] to-transparent" />
                  <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-orange-600/80 backdrop-blur-sm text-[0.5rem] font-bold uppercase tracking-widest text-white">
                    {site.category}
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    <span className="text-[0.55rem] font-bold uppercase tracking-[0.2em] text-orange-500">
                      {site.location}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-tight mb-2">
                    {site.name}
                  </h4>
                  <p className="text-[0.6rem] text-white/40 leading-relaxed line-clamp-2">
                    {site.description}
                  </p>
                </div>
              </motion.div>
            </Tooltip>
          </Marker>
        ))}

        <ZoomControl position="bottomright" />
      </MapContainer>

      {/* Map Overlay Gradient */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0b0d10] via-transparent to-transparent h-40 bottom-0 top-auto z-[1000]" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#0b0d10] via-transparent to-transparent h-40 top-0 z-[1000]" />

      {/* Legend Overlay */}
      <div className="absolute top-8 left-8 z-[1000] bg-[#0b0d10]/40 backdrop-blur-md border border-white/10 rounded-2xl p-4 hidden md:block">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(234,88,12,0.5)]" />
            <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-white/60">Major Developments</span>
          </div>
          <div className="flex items-center gap-3 opacity-40">
            <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-white">Planned Sites</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SriLankaMap;
