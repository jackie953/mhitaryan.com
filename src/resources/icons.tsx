import { IconType } from "react-icons";

import {
  HiArrowUpRight,
  HiOutlineLink,
  HiArrowTopRightOnSquare,
  HiOutlineEnvelope,
  HiCalendarDays,
  HiArrowRight,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineDocument,
  HiOutlineGlobeAsiaAustralia,
  HiOutlineRocketLaunch,
} from "react-icons/hi2";

import {
  PiHouseDuotone,
  PiUserCircleDuotone,
  PiGridFourDuotone,
  PiBookBookmarkDuotone,
  PiImageDuotone,
} from "react-icons/pi";

import {
  SiJavascript,
  SiNextdotjs,
  SiFigma,
  SiSupabase,
} from "react-icons/si";

import { FaDiscord, FaGithub, FaLinkedin, FaX, FaThreads, FaXTwitter, FaFacebook, FaPinterest, FaWhatsapp, FaReddit, FaTelegram, } from "react-icons/fa6";

const FlagSE: IconType = () => (
  <svg width="18" height="13" viewBox="0 0 20 14" fill="none" style={{ borderRadius: 2 }}>
    <rect width="20" height="14" fill="#006AA7" />
    <rect y="5" width="20" height="4" fill="#FFCC00" />
    <rect x="8" width="4" height="14" fill="#FFCC00" />
  </svg>
);

const FlagUS: IconType = () => (
  <svg width="18" height="13" viewBox="0 0 20 14" fill="none" style={{ borderRadius: 2 }}>
    <rect width="20" height="14" fill="#3C3B6B" />
    <rect y="1" width="20" height="1" fill="white" />
    <rect y="3" width="20" height="1" fill="white" />
    <rect y="5" width="20" height="1" fill="white" />
    <rect y="7" width="20" height="1" fill="white" />
    <rect y="9" width="20" height="1" fill="white" />
    <rect y="11" width="20" height="1" fill="white" />
    <rect y="13" width="20" height="1" fill="white" />
    <rect width="8" height="7" fill="#B22234" />
    <rect y="2" width="8" height="2" fill="#B22234" />
    <rect y="4" width="8" height="2" fill="#B22234" />
    <rect y="6" width="8" height="2" fill="#B22234" />
  </svg>
);

export const iconLibrary: Record<string, IconType> = {
  flagSE: FlagSE,
  flagUS: FlagUS,
  arrowUpRight: HiArrowUpRight,
  arrowRight: HiArrowRight,
  email: HiOutlineEnvelope,
  globe: HiOutlineGlobeAsiaAustralia,
  person: PiUserCircleDuotone,
  grid: PiGridFourDuotone,
  book: PiBookBookmarkDuotone,
  openLink: HiOutlineLink,
  calendar: HiCalendarDays,
  home: PiHouseDuotone,
  gallery: PiImageDuotone,
  discord: FaDiscord,
  eye: HiOutlineEye,
  eyeOff: HiOutlineEyeSlash,
  github: FaGithub,
  linkedin: FaLinkedin,
  x: FaX,
  twitter: FaXTwitter,
  threads: FaThreads,
  arrowUpRightFromSquare: HiArrowTopRightOnSquare,
  document: HiOutlineDocument,
  rocket: HiOutlineRocketLaunch,
  javascript: SiJavascript,
  nextjs: SiNextdotjs,
  supabase: SiSupabase,
  figma: SiFigma,
  facebook: FaFacebook,
  pinterest: FaPinterest,
  whatsapp: FaWhatsapp,
  reddit: FaReddit,
  telegram: FaTelegram,
};

export type IconLibrary = typeof iconLibrary;
export type IconName = keyof IconLibrary;
