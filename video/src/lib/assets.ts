// Photos are imported straight from the Astro site so the video and the site never drift apart.
import sim from '../../../src/assets/scenes/sim.png';
import paspor from '../../../src/assets/scenes/paspor.png';
import bpjs from '../../../src/assets/scenes/bpjs.png';
import dukcapil from '../../../src/assets/scenes/dukcapil.png';
import usaha from '../../../src/assets/scenes/usaha.png';
import pajak from '../../../src/assets/scenes/pajak.png';
import kerja from '../../../src/assets/scenes/kerja.png';
import samsat from '../../../src/assets/scenes/samsat.png';

import portrait from '../../../src/assets/roadmap/portrait.png';
import rumah from '../../../src/assets/roadmap/rumah.png';
import passportCover from '../../../src/assets/roadmap/passport-cover.png';
import campMandalawangi from '../../../src/assets/roadmap/camp-mandalawangi.png';
import campKandangBatu from '../../../src/assets/roadmap/camp-kandang-batu.png';
import campKandangBadak from '../../../src/assets/roadmap/camp-kandang-badak.png';
import campSuryakencana from '../../../src/assets/roadmap/camp-suryakencana.png';
import agencyDukcapil from '../../../src/assets/roadmap/agency-dukcapil.png';
import agencyImigrasi from '../../../src/assets/roadmap/agency-imigrasi.png';
import agencyBpjs from '../../../src/assets/roadmap/agency-bpjs.png';
import agencyDjp from '../../../src/assets/roadmap/agency-djp.png';
import agencyBps from '../../../src/assets/roadmap/agency-bps.png';
import agencyKemenkes from '../../../src/assets/roadmap/agency-kemenkes.png';
import agencyBmkg from '../../../src/assets/roadmap/agency-bmkg.png';

export const scenes: Record<string, string> = { sim, paspor, bpjs, dukcapil, usaha, pajak, kerja, samsat };

export const roadmap = {
  portrait,
  rumah,
  passportCover,
  camps: [campMandalawangi, campKandangBatu, campKandangBadak, campSuryakencana],
  agency: {
    dukcapil: agencyDukcapil,
    imigrasi: agencyImigrasi,
    bpjs: agencyBpjs,
    djp: agencyDjp,
    bps: agencyBps,
    kemenkes: agencyKemenkes,
    bmkg: agencyBmkg,
  },
};
