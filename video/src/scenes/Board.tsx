import type { CSSProperties, ReactNode } from 'react';
import { AbsoluteFill, Img, useCurrentFrame } from 'remotion';
import { Icon } from '../components/Icon';
import { roadmap } from '../lib/assets';
import { useVertical } from '../lib/format';
import { keys, pop, prog, rise } from '../lib/motion';

// Port of src/components/Roadmap.astro. Each card flies in with a spring; columns drift at their own speed.

const card = 'rounded-[20px] bg-white p-3 text-[10.5px] leading-[1.35] shadow-[0_24px_60px_-24px_rgba(21,23,27,0.25),0_0_0_1px_rgba(21,23,27,0.05)]';
const title = 'text-[11px] font-bold';
const btn = 'inline-block rounded-full bg-[#23408e] px-3 py-[5px] text-[10px] font-bold text-white';

const Fly: React.FC<{ frame: number; at: number; className?: string; style?: CSSProperties; children: ReactNode }> = ({ frame, at, className = card, style, children }) => {
  const s = pop(frame, at, { damping: 15, stiffness: 120 });
  return (
    <div className={className} style={{ ...style, opacity: Math.min(1, s * 1.5), transform: `translateY(${(1 - s) * 140}px) scale(${0.9 + s * 0.1})` }}>
      {children}
    </div>
  );
};

export const Board: React.FC = () => {
  const frame = useCurrentFrame();
  const vertical = useVertical();

  // camera: start close on the left columns, pan right, then pull out to the whole board
  // 16:9 pans across one long row; 9:16 stacks the six columns into a 3×2 grid and pans diagonally
  const scale = vertical
    ? keys(frame, [0, 60, 170, 250, 320], [2.3, 2.3, 2.3, 1.36, 1.33])
    : keys(frame, [0, 60, 170, 250, 320], [1.75, 1.75, 1.75, 1.18, 1.14]);
  const panX = vertical ? keys(frame, [0, 60, 170, 250], [330, 330, -330, 0]) : keys(frame, [0, 60, 170, 250], [560, 560, -560, 0]);
  const panY = vertical ? keys(frame, [0, 60, 170, 250], [620, 620, -560, 70]) : keys(frame, [0, 170, 250], [120, 120, 40]);
  const PT = vertical ? [60, 10, 0, 30, 0, 20] : [190, 130, 100, 60, 0, 40];
  const colStyle = (i: number, speed: number): CSSProperties => ({ ...col(speed), paddingTop: PT[i] });

  const col = (speed: number): CSSProperties => ({ transform: `translateY(${keys(frame, [0, 320], [90 * speed, -70 * speed], (t) => t)}px)` });
  const tick = (i: number) => pop(frame, 95 + i * 9, { damping: 11, stiffness: 220 });
  const tilt = Math.sin(frame / 38) * 11;
  const drag = prog(frame, 120, 70);
  const dropped = prog(frame, 185, 20);
  const track = prog(frame, 110, 90);

  return (
    <AbsoluteFill className="items-center justify-center overflow-hidden bg-paper">
      <div className={`absolute left-0 right-0 text-center ${vertical ? 'top-[170px]' : 'top-[54px]'}`} style={{ ...rise(frame, 190, { dist: 24 }) }}>
        <h2 className="font-serif text-[76px] leading-none tracking-[-0.02em]">Segera hadir di 2027</h2>
      </div>

      <div style={{ transform: `translate(${panX}px, ${panY}px) scale(${scale})` }}>
        <div
          className={
            vertical
              ? 'grid w-[760px] grid-cols-[250px_260px_210px] items-start justify-items-center gap-x-5 gap-y-10'
              : 'flex w-[1480px] items-start justify-center gap-5'
          }
        >
          {/* 1: job matches */}
          <div className="flex w-[230px] flex-col gap-5" style={colStyle(0, 0.9)}>
            <Fly frame={frame} at={6}>
              <p className={title}>3 formasi paling cocok untukmu</p>
              <div className="mt-2.5 rounded-[14px] border border-line">
                {[
                  ['Pranata Komputer Ahli Pertama', 'Badan Pusat Statistik', roadmap.agency.bps],
                  ['Analis Data Ahli Muda', 'Kementerian Kesehatan', roadmap.agency.kemenkes],
                  ['Perancang Sistem Informasi', 'BMKG', roadmap.agency.bmkg],
                ].map(([role, org, icon], n) => (
                  <div key={role} className={`px-2.5 py-2 ${n > 0 ? 'border-t border-line' : ''}`}>
                    <div className="flex items-start gap-2">
                      <Img src={icon} className="mt-0.5 size-5 shrink-0 rounded-full object-cover" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold">{role}</p>
                        <p className="truncate text-muted">{org}</p>
                      </div>
                    </div>
                    {n === 0 && (
                      <ul className="mt-2 space-y-1 pl-7 text-muted">
                        <li className="flex items-center gap-1.5"><Icon name="pin" className="size-3" /> Jakarta Pusat</li>
                        <li className="flex items-center gap-1.5"><Icon name="money" className="size-3" /> Rp 6–9 jt per bulan</li>
                        <li className="flex items-center gap-1.5"><Icon name="home" className="size-3" /> Hibrida · 2 hari WFH</li>
                      </ul>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-2.5 text-right"><span className={btn}>Lamar</span></div>
            </Fly>
          </div>

          {/* 2: campsites + CV drop zone */}
          <div className="flex w-[260px] flex-col gap-5" style={colStyle(1, 1.15)}>
            <Fly frame={frame} at={14}>
              <p className={title}>Pilih lokasi kemah di TN Gede Pangrango</p>
              <div className="mt-2.5 grid grid-cols-[1fr_78px] gap-2 overflow-hidden rounded-[14px] border border-line p-1.5">
                <div className="space-y-1.5">
                  {[
                    ['Bumi Perkemahan Mandalawangi', 'Cibodas, Cianjur'],
                    ['Pos Kandang Batu', 'Jalur Cibodas'],
                    ['Pos Kandang Badak', 'Jalur Cibodas'],
                    ['Alun-alun Suryakencana', 'Jalur Gunung Putri'],
                  ].map(([name, place], n) => (
                    <div key={name} className="flex items-center gap-1.5 rounded-lg bg-white p-1 shadow-[0_0_0_1px_rgba(21,23,27,0.06)]">
                      <Img src={roadmap.camps[n]} className="size-7 shrink-0 rounded-md object-cover" />
                      <div className="min-w-0 flex-1 leading-tight">
                        <p className="truncate text-[9.5px] font-semibold">{name}</p>
                        <p className="truncate text-[9px] text-muted">{place}</p>
                      </div>
                      <span className="rounded-full bg-paper px-1.5 py-0.5 text-[8.5px] font-semibold">Pilih</span>
                    </div>
                  ))}
                </div>
                <svg className="h-full w-full rounded-lg" viewBox="0 0 80 160" preserveAspectRatio="xMidYMid slice">
                  <rect width="80" height="160" fill="#dfeadb" />
                  {[60, 48, 36, 24, 14].map((r, k) => (
                    <ellipse key={r} cx="46" cy="72" rx={r * 0.8} ry={r} fill={k % 2 ? '#b9d3b1' : '#c6dbbf'} stroke="#a7c49e" strokeWidth=".6" />
                  ))}
                  <path d="M70 0C62 40 76 80 60 160" fill="none" stroke="#9ec3dd" strokeWidth="3" />
                  <path d="M8 150C20 120 18 100 34 92S50 70 46 60" fill="none" stroke="#c8102e" strokeWidth="1.6" strokeDasharray="3 2.5" style={{ clipPath: `inset(${(1 - prog(frame, 40, 90)) * 100}% 0 0 0)` }} />
                  {[[34, 92], [44, 64], [20, 124], [52, 44]].map(([x, y], k) => (
                    <g key={k} transform={`translate(${x} ${y}) scale(${pop(frame, 50 + k * 8)})`}>
                      <circle r="5" fill="#fff" stroke="#15171b" strokeOpacity=".2" />
                      <path d="M-2.5 1.5 0-2.5l2.5 4Z" fill="#0c7a4d" />
                    </g>
                  ))}
                </svg>
              </div>
            </Fly>

            <Fly
              frame={frame}
              at={30}
              className={`${card} relative flex h-[110px] items-center justify-center border-2 border-dashed`}
              style={{ borderColor: `rgba(35,64,142,${0.4 + dropped * 0.5})`, background: dropped > 0 ? '#dfe7fa' : '#eef2fb', boxShadow: 'none' }}
            >
              <span className="font-semibold text-[#23408e]">Tarik CV ke mana saja</span>
              <div
                className="absolute -bottom-3 right-6 flex items-center gap-1"
                style={{ transform: `translate(${90 - drag * 130}px, ${60 - drag * 100}px) scale(${1 - dropped * 0.4})`, opacity: 1 - dropped }}
              >
                <span className="rounded-[3px] bg-merah px-1 py-0.5 text-[7px] font-bold text-white">PDF</span>
                <span className="rounded bg-[#23408e] px-1.5 py-0.5 text-[9px] font-semibold text-white">CV_2026.pdf</span>
                <svg className="absolute -bottom-4 left-9 size-5" viewBox="0 0 24 24">
                  <path d="M5 3v16l4.5-4.2L12.4 21l2.6-1.2-2.9-6.1H18Z" fill="#15171b" stroke="#fff" strokeWidth="1.3" strokeLinejoin="round" />
                </svg>
              </div>
            </Fly>
          </div>

          {/* 3: passport photo + update data */}
          <div className="flex w-[210px] flex-col gap-5" style={colStyle(2, 0.8)}>
            <Fly frame={frame} at={22}>
              <p className={title}>Konfirmasi fotomu</p>
              <div className="relative mt-2.5 overflow-hidden rounded-[10px] border border-line bg-[repeating-radial-gradient(circle_at_70%_60%,#eef3ea_0_3px,#e3ece0_3px_6px)] p-2">
                <div className="flex justify-between text-[6.5px] font-bold tracking-wider text-[#1f4d36]">
                  <span>REPUBLIK INDONESIA</span>
                  <span>PASPOR</span>
                </div>
                <div className="mt-1.5 flex gap-2">
                  <Img src={roadmap.portrait} className="h-[74px] w-[58px] rounded-[3px] object-cover" />
                  <div className="min-w-0 flex-1 space-y-1 text-[6.5px] leading-none">
                    {[['Nama', 'PUTRI ANJANI'], ['Kewarganegaraan', 'INDONESIA'], ['Tgl. lahir', '17 AGU 2001'], ['No. paspor', 'X0000000']].map(([k, v]) => (
                      <div key={k}>
                        <p className="text-[#1f4d36]/60">{k}</p>
                        <p className="font-bold">{v}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="mt-1.5 truncate font-mono text-[6px] text-ink/70">P&lt;IDNANJANI&lt;&lt;PUTRI&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</p>
                <span className="absolute right-2 top-7 rotate-[-18deg] rounded border border-merah/50 px-1 text-[8px] font-bold tracking-widest text-merah/60" style={{ transform: `rotate(-18deg) scale(${pop(frame, 70, { damping: 9 })})` }}>
                  CONTOH
                </span>
              </div>
              <div className="mt-2.5 text-right"><span className={btn}>Ajukan permohonan paspor</span></div>
            </Fly>

            <Fly frame={frame} at={38}>
              <p className={title}>Perbarui data di semua instansi</p>
              <div className="mt-2.5 rounded-[14px] border border-line">
                {[
                  ['Dukcapil', roadmap.agency.dukcapil],
                  ['Imigrasi', roadmap.agency.imigrasi],
                  ['BPJS Kesehatan', roadmap.agency.bpjs],
                  ['Direktorat Jenderal Pajak', roadmap.agency.djp],
                ].map(([name, icon], n) => (
                  <div key={name} className={`flex items-center gap-2 px-2.5 py-2 ${n > 0 ? 'border-t border-line' : ''}`}>
                    <Img src={icon} className="size-5 shrink-0 rounded-full object-cover" />
                    <span className="flex-1 truncate font-semibold">{name}</span>
                    <span className="grid size-3.5 place-items-center rounded-[4px] bg-[#23408e] text-white" style={{ transform: `scale(${tick(n)})` }}>
                      <Icon name="check" className="size-2.5" strokeWidth={2.6} />
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-2.5 text-right"><span className={btn}>Ubah data</span></div>
            </Fly>
          </div>

          {/* 4: medicines + housing + login */}
          <div className="flex w-[250px] flex-col gap-5" style={colStyle(3, 1.2)}>
            <Fly frame={frame} at={18}>
              <p className={title}>Cek obat yang ditanggung BPJS</p>
              <div className="mt-2.5 flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-muted">
                <Icon name="search" className="size-3" /> Cari obat
              </div>
              <div className="mt-2 rounded-[14px] border border-line p-2.5">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-semibold"><span className="size-4 rounded bg-emerald-100" /> Amoxicillin</span>
                  <span className="rounded-full bg-paper px-2 py-0.5 text-[9px] font-semibold">Hapus</span>
                </div>
                {([
                  ['Bentuk', ['Kapsul', 'Sirup']],
                  ['Kekuatan', ['500 mg']],
                  ['Jumlah', ['10', '15', '30']],
                ] as const).map(([label, opts], r) => {
                  const pos = r === 2 ? keys(frame, [80, 110, 170, 200], [0, 1, 1, 2]) : 0;
                  return (
                    <div key={label} className="mt-2 grid grid-cols-[52px_1fr] items-center gap-2">
                      <span className="text-muted">{label}</span>
                      <div className="relative flex rounded-full bg-paper p-0.5">
                        <span className="absolute inset-y-0.5 rounded-full bg-white shadow" style={{ left: 2, width: `calc((100% - 4px) / ${opts.length})`, transform: `translateX(${pos * 100}%)` }} />
                        {opts.map((o) => (
                          <span key={o} className="relative z-10 flex-1 py-0.5 text-center text-[9.5px]">{o}</span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-2.5 text-right"><span className={btn}>Ambil resep</span></div>
            </Fly>

            <div className="flex items-start gap-3">
              <Fly frame={frame} at={34} className={`${card} w-[150px] overflow-hidden !p-0`}>
                <Img src={roadmap.rumah} className="h-[86px] w-full object-cover" />
                <div className="p-2.5 leading-snug">
                  <p className="text-[10px] font-semibold text-[#23408e]">Perumahan Griya Asri, rumah subsidi</p>
                  <p className="mt-1 text-[9.5px] text-muted">Jl. Raya Setu No. 12,<br />Bekasi, Jawa Barat</p>
                </div>
              </Fly>
              <Fly frame={frame} at={44} className={`${card} mt-6 flex items-center gap-1.5 !rounded-full px-3 py-2`}>
                <span className="grid size-5 place-items-center rounded-full bg-merah text-white"><Icon name="shield" className="size-3" strokeWidth={2.2} /></span>
                <span className="font-semibold">Masuk</span>
              </Fly>
            </div>
          </div>

          {/* 5: passport cover + tracking */}
          <div className="flex w-[200px] flex-col gap-5" style={colStyle(4, 0.85)}>
            <Fly frame={frame} at={10} className="" style={{ perspective: 700 }}>
              <div className="relative aspect-[3/4.2] overflow-hidden rounded-[10px] p-4 text-center shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)]" style={{ transform: `rotateY(${tilt}deg) rotateX(${tilt * -0.4}deg)` }}>
                <Img src={roadmap.passportCover} className="absolute inset-0 size-full object-cover" />
                <p className="relative text-[7px] font-semibold tracking-[0.3em] text-[#d9bd73]/70">PASPOR</p>
                <p className="relative mt-3 font-serif text-[17px] leading-tight tracking-[0.12em] text-[#d9bd73]">REPUBLIK<br />INDONESIA</p>
                <span className="absolute inset-0" style={{ background: `radial-gradient(circle at ${50 + tilt * 4}% 25%, rgba(255,240,200,0.3), transparent 45%)`, mixBlendMode: 'screen' }} />
              </div>
            </Fly>
            <Fly frame={frame} at={40}>
              <div className="flex items-center gap-2">
                <span className="grid h-7 w-5 place-items-center rounded-[3px] bg-[#1f4d36]"><span className="size-1.5 rounded-full border border-[#d9bd73]" /></span>
                <div className="leading-tight">
                  <p className="font-semibold">Paspor</p>
                  <p className="text-muted">Tiba sekitar 5 Nov 2026</p>
                </div>
              </div>
              <div className="relative mt-3.5 h-4">
                <span className="absolute inset-x-2 top-1/2 h-[2px] -translate-y-1/2 bg-ink/10" />
                <span className="absolute left-2 top-1/2 h-[2px] -translate-y-1/2 bg-[#23408e]" style={{ width: `${track * 46}%` }} />
                <span className="absolute left-0 top-0 grid size-4 place-items-center rounded-full bg-[#23408e] text-white"><Icon name="check" className="size-2.5" strokeWidth={2.6} /></span>
                <span className="absolute left-[48%] top-0 size-4 rounded-full border-[4px] border-[#23408e] bg-white" style={{ transform: `scale(${pop(frame, 190, { damping: 8 })})`, boxShadow: `0 0 0 ${((frame % 70) / 70) * 9}px rgba(35,64,142,${0.35 * (1 - (frame % 70) / 70)})` }} />
                <span className="absolute right-0 top-1 size-2 rounded-full bg-ink/15" />
              </div>
              <div className="mt-1.5 flex justify-between text-[9px] text-muted"><span>Diajukan</span><span>Diproses</span><span>Dikirim</span></div>
            </Fly>
          </div>

          {/* 6: faskes on a map */}
          <div className="flex w-[210px] flex-col gap-5" style={colStyle(5, 1.1)}>
            <Fly frame={frame} at={26}>
              <p className={title}>Pilih faskes BPJS terdekat</p>
              <div className="relative mt-2.5 h-[170px] overflow-hidden rounded-[14px] border border-line">
                <svg className="absolute inset-0 size-full" viewBox="0 0 200 170" preserveAspectRatio="xMidYMid slice">
                  <rect width="200" height="170" fill="#eef0ea" />
                  <path d="M120 0h80v70c-30 6-50-10-80-4Z" fill="#d6e8cf" />
                  <path d="M-5 120C40 110 60 140 110 128S170 150 205 138" fill="none" stroke="#b7d4ec" strokeWidth="8" />
                  {[20, 55, 90, 125, 160].map((x) => <path key={x} d={`M${x} 0v170`} stroke="#fff" strokeWidth="3" />)}
                  {[25, 60, 95, 150].map((y) => <path key={y} d={`M0 ${y}h200`} stroke="#fff" strokeWidth="3" />)}
                  <path d="M0 40L200 100" stroke="#f3cf8a" strokeWidth="5" />
                  <path d="M70 0 110 170" stroke="#f3cf8a" strokeWidth="4" />
                </svg>
                <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-white px-2 py-1 text-[9px] font-semibold shadow">12110 <Icon name="down" className="size-2.5" /></span>
                {[[40, 42], [62, 55], [108, 48], [132, 90]].map(([x, y], k) => {
                  const d = prog(frame, 60 + k * 9, 40, (t) => 1 - Math.abs(Math.cos(t * Math.PI * 1.5)) * (1 - t));
                  return (
                    <span key={k} className="absolute grid size-5 place-items-center rounded-full rounded-bl-none bg-white text-[#23408e] shadow" style={{ left: `${x / 2}%`, top: `${(y / 170) * 100}%`, transform: `translate(-50%, ${-100 - (1 - d) * 120}%)`, opacity: d > 0 ? 1 : 0 }}>
                      <Icon name="pin" className="size-3" />
                    </span>
                  );
                })}
                <div className="absolute inset-x-2 bottom-2 flex items-center gap-2 rounded-xl bg-white p-1.5 shadow-lg" style={rise(frame, 100, { dist: 20, blur: 0 })}>
                  <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-emerald-50 text-emerald-700"><Icon name="home" className="size-3.5" /></span>
                  <div className="min-w-0 flex-1 leading-tight">
                    <p className="truncate text-[9.5px] font-semibold">Puskesmas Kebayoran Baru</p>
                    <p className="truncate text-[8.5px] text-muted">Jl. Sungai Bambu, Jakarta Selatan</p>
                  </div>
                  <span className="grid h-5 w-8 place-items-center rounded-full bg-[#23408e] text-white"><Icon name="check" className="size-3" strokeWidth={2.4} /></span>
                </div>
              </div>
            </Fly>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
