"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { SpaceMapProps } from "./SpaceMap";

const PIN_SIZE = 28;

/** Pin bulat berisi icon gedung. Terpilih = hijau (seperti di Figma), lainnya abu-abu. */
const pinIcon = (active: boolean) =>
  L.divIcon({
    className: "",
    iconSize: [PIN_SIZE, PIN_SIZE],
    iconAnchor: [PIN_SIZE / 2, PIN_SIZE / 2],
    html: `<span style="display:flex;width:${PIN_SIZE}px;height:${PIN_SIZE}px;align-items:center;justify-content:center;border-radius:9999px;border:2px solid #fff;box-shadow:0 2px 6px rgb(0 0 0 / .3);background:${
      active ? "var(--color-success-600)" : "var(--color-neutral-500)"
    }"><span style="width:16px;height:16px;background:#fff;-webkit-mask:url(/icons/office-building.svg) center/contain no-repeat;mask:url(/icons/office-building.svg) center/contain no-repeat"></span></span>`,
  });

/** Peta Leaflet (tile OpenStreetMap) dengan satu pin per ruangan. Hanya jalan di browser. */
export default function SpaceMapCanvas({ rooms, activeId, onSelect, center }: SpaceMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const onSelectRef = useRef(onSelect);

  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  // Buat peta sekali.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const map = L.map(container, { zoomControl: true, scrollWheelZoom: false }).setView(center ?? [-6.2088, 106.8456], 12);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
    mapRef.current = map;

    const observer = new ResizeObserver(() => map.invalidateSize());
    observer.observe(container);
    const markers = markersRef.current;
    return () => {
      observer.disconnect();
      markers.clear();
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sinkronkan pin dengan daftar ruangan, lalu arahkan peta ke semuanya.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const markers = markersRef.current;
    markers.forEach((marker) => marker.remove());
    markers.clear();

    const points: L.LatLngTuple[] = [];
    rooms.forEach((room) => {
      if (room.lat === undefined || room.lng === undefined) return;
      const marker = L.marker([room.lat, room.lng], { icon: pinIcon(false), title: room.name })
        .on("click", () => onSelectRef.current?.(room.id))
        .addTo(map);
      markers.set(room.id, marker);
      points.push([room.lat, room.lng]);
    });

    if (points.length > 0) map.fitBounds(L.latLngBounds(points), { padding: [40, 40], maxZoom: 14 });
    else if (center) map.setView(center, 11);
  }, [rooms, center]);

  // Pin terpilih berwarna hijau dan di atas pin lain.
  useEffect(() => {
    markersRef.current.forEach((marker, id) => {
      marker.setIcon(pinIcon(id === activeId));
      marker.setZIndexOffset(id === activeId ? 1000 : 0);
    });
  }, [activeId, rooms]);

  return <div ref={containerRef} className="size-full" />;
}
