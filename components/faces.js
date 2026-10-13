// Portraits cropped (Cloudinary transforms) from the licensed hero footage.
export const CLD = 'https://res.cloudinary.com/de3kbbv2o/video/upload';
// Portraits cropped from the licensed hero footage, keyed ring-member.
const HMZ = 'v1791179341/smiling-woman-assisted-by-caregiver-in-a-living-ro-2026-10-03-05-37-16-utc_hmz827.jpg';
const OGG = 'v1791184558/affectionate-couple-embracing-in-urban-canal-setti-2026-10-02-19-21-48-utc_oggy0e.jpg';
const UBG = 'v1791183998/healthcare-worker-with-senior-in-green-urban-park-2026-10-02-14-07-52-utc_ubgjuy.jpg';
export const FACES = {
  'near-0': `${CLD}/so_7,c_crop,w_320,h_320,x_660,y_340/c_scale,w_120/f_auto,q_auto/${HMZ}`,
  'near-1': `${CLD}/so_1,c_crop,w_600,h_600,x_1380,y_40/c_scale,w_120/f_auto,q_auto/${OGG}`,
  'chosen-0': `${CLD}/so_7,c_thumb,g_face,w_120,h_120,z_0.75/f_auto,q_auto/${HMZ}`,
  'chosen-1': `${CLD}/so_5,c_crop,w_260,h_260,x_940,y_230/e_brightness:35/c_scale,w_120/f_auto,q_auto/${UBG}`,
  'home-0': `${CLD}/so_3,c_thumb,g_face,w_120,h_120,z_0.75/f_auto,q_auto/${OGG}`,
};

