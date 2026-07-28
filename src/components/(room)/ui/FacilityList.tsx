import type { IconType } from "react-icons";
import {
  LuAirVent,
  LuArmchair,
  LuBaby,
  LuBadgeCheck,
  LuBath,
  LuBedDouble,
  LuBike,
  LuCar,
  LuChefHat,
  LuCigaretteOff,
  LuClock,
  LuDroplets,
  LuLayoutPanelLeft,
  LuMonitor,
  LuRefrigerator,
  LuShirt,
  LuShowerHead,
  LuSofa,
  LuTable,
  LuToilet,
  LuUserRound,
  LuUsers,
  LuWifi,
} from "react-icons/lu";

const FACILITY_ICONS: Record<string, IconType> = {
  AC: LuAirVent,
  WiFi: LuWifi,
  Kasur: LuBedDouble,
  Meja: LuTable,
  Kursi: LuArmchair,
  Lemari: LuLayoutPanelLeft,
  "Lemari / Storage": LuLayoutPanelLeft,
  Jendela: LuLayoutPanelLeft,
  Cermin: LuLayoutPanelLeft,
  Bantal: LuBedDouble,
  TV: LuMonitor,
  Kulkas: LuRefrigerator,
  Dapur: LuChefHat,
  "K. Mandi Dalam": LuBath,
  "K. Mandi Luar": LuBath,
  "Kloset Duduk": LuToilet,
  "Ember mandi": LuDroplets,
  Shower: LuShowerHead,
  "Water Heater": LuShowerHead,
  "R. Tamu": LuSofa,
  "R. Jemur": LuShirt,
  Jemuran: LuShirt,
  "Penjaga Kos": LuUserRound,
  Laundry: LuShirt,
  "Parkir Mobil": LuCar,
  "Parkir Motor": LuBike,
  "Parkir Motor & Sepeda": LuBike,
  "Kolam Renang": LuDroplets,
  CCTV: LuMonitor,
  "Akses 24 Jam": LuClock,
  "Boleh pasutri": LuUsers,
  "Boleh bawa anak": LuBaby,
  "Dilarang merokok di kamar": LuCigaretteOff,
  "Lawan jenis dilarang ke kamar": LuUsers,
  "Termasuk listrik": LuBadgeCheck,
};

const FALLBACK_ICON = LuBadgeCheck;

export function FacilityList({ items }: { items: readonly string[] }) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {items.map((item) => {
        const Icon = FACILITY_ICONS[item] ?? FALLBACK_ICON;
        return (
          <li className="flex items-center gap-3 text-base text-ink" key={item}>
            <Icon aria-hidden className="size-5 shrink-0 text-ink-2" />
            {item}
          </li>
        );
      })}
    </ul>
  );
}

export function FacilityIcon({ name }: { name: string }) {
  const Icon = FACILITY_ICONS[name] ?? FALLBACK_ICON;
  return <Icon aria-hidden className="size-5 shrink-0 text-ink-2" />;
}
