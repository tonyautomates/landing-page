// The 8 photo slots of the intro animation (components/Intro.tsx).
//
// To add a real photo: put the file in public/intro/ and set its src,
// e.g. src: "/intro/alfama.jpg". Photos are cropped to a square (cover),
// so about 800×800 px JPG or WebP is plenty.
//
// While src is null the slot shows its placeholder tone and label.
// Every box flashes through all 8 photos. The last ones on screen before
// the name appears are slots 8, 2, 4 and 6.

export type IntroPhoto = {
  src: string | null;
  label: string;
  tone: string;
};

export const INTRO_PHOTOS: IntroPhoto[] = [
  { src: null, label: "Alfama", tone: "#D8D4CC" }, // 1
  { src: null, label: "Hieronimici", tone: "#C6C1B7" }, // 2
  { src: null, label: "Sintra", tone: "#E4E1DA" }, // 3
  { src: null, label: "Belém", tone: "#BCB6AB" }, // 4
  { src: null, label: "Nazaré", tone: "#D0CBC2" }, // 5
  { src: null, label: "Fátima", tone: "#E9E6E0" }, // 6
  { src: null, label: "Cabo da Roca", tone: "#C2BDB3" }, // 7
  { src: null, label: "Coimbra", tone: "#DDD9D1" }, // 8
];
