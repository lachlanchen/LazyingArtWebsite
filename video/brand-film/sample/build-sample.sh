#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "Usage: $0 /path/to/madeira-shot-directory" >&2
  exit 64
fi

source_dir="$1"
output_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
sources=(
  "$source_dir/shot-01-attempt-01.mp4"
  "$source_dir/shot-02-attempt-01.mp4"
  "$source_dir/shot-03-attempt-01.mp4"
  "$source_dir/shot-04-attempt-01.mp4"
  "$source_dir/shot-05-attempt-01.mp4"
  "$source_dir/shot-08-attempt-02.mp4"
)

for source_file in "${sources[@]}"; do
  if [[ ! -f "$source_file" ]]; then
    echo "Missing source: $source_file" >&2
    exit 66
  fi
done

filter_complex='[0:v]trim=duration=7.2,setpts=PTS-STARTPTS,crop=1024:576:0:48,scale=1280:720,setsar=1[v0];
[1:v]trim=duration=7.2,setpts=PTS-STARTPTS,crop=1024:576:0:48,scale=1280:720,setsar=1[v1];
[2:v]trim=duration=7.2,setpts=PTS-STARTPTS,crop=1024:576:0:48,scale=1280:720,setsar=1[v2];
[3:v]trim=duration=7.2,setpts=PTS-STARTPTS,crop=1024:576:0:48,scale=1280:720,setsar=1[v3];
[4:v]trim=duration=7.2,setpts=PTS-STARTPTS,crop=1024:576:0:48,scale=1280:720,setsar=1[v4];
[5:v]trim=duration=7.2,setpts=PTS-STARTPTS,crop=1024:576:0:48,scale=1280:720,setsar=1[v5];
[0:a]atrim=duration=7.2,asetpts=PTS-STARTPTS,aresample=48000[a0];[1:a]atrim=duration=7.2,asetpts=PTS-STARTPTS,aresample=48000[a1];[2:a]atrim=duration=7.2,asetpts=PTS-STARTPTS,aresample=48000[a2];[3:a]atrim=duration=7.2,asetpts=PTS-STARTPTS,aresample=48000[a3];[4:a]atrim=duration=7.2,asetpts=PTS-STARTPTS,aresample=48000[a4];[5:a]atrim=duration=7.2,asetpts=PTS-STARTPTS,aresample=48000[a5];
[v0][v1]xfade=transition=fade:duration=0.25:offset=6.95[xv1];[xv1][v2]xfade=transition=fade:duration=0.25:offset=13.90[xv2];[xv2][v3]xfade=transition=fade:duration=0.25:offset=20.85[xv3];[xv3][v4]xfade=transition=fade:duration=0.25:offset=27.80[xv4];[xv4][v5]xfade=transition=fade:duration=0.25:offset=34.75,format=yuv420p[vout];
[a0][a1]acrossfade=d=0.25:c1=tri:c2=tri[xa1];[xa1][a2]acrossfade=d=0.25:c1=tri:c2=tri[xa2];[xa2][a3]acrossfade=d=0.25:c1=tri:c2=tri[xa3];[xa3][a4]acrossfade=d=0.25:c1=tri:c2=tri[xa4];[xa4][a5]acrossfade=d=0.25:c1=tri:c2=tri[aout]'

ffmpeg -hide_banner -y -loglevel warning \
  -i "${sources[0]}" -i "${sources[1]}" -i "${sources[2]}" \
  -i "${sources[3]}" -i "${sources[4]}" -i "${sources[5]}" \
  -filter_complex "$filter_complex" -map '[vout]' -map '[aout]' \
  -c:v libx264 -preset medium -crf 21 -profile:v high -pix_fmt yuv420p \
  -c:a aac -b:a 160k -ar 48000 -ac 2 -movflags +faststart \
  "$output_dir/madeira-six-clip-master.mp4"

ffmpeg -hide_banner -y -loglevel warning \
  -i "$output_dir/madeira-six-clip-master.mp4" \
  -filter_complex '[0:v]trim=start=0:end=13.9,setpts=PTS-STARTPTS[v0];[0:v]trim=start=28.05:end=41.95,setpts=PTS-STARTPTS[v1];[0:a]atrim=start=0:end=13.9,asetpts=PTS-STARTPTS[a0];[0:a]atrim=start=28.05:end=41.95,asetpts=PTS-STARTPTS[a1];[v0][a0][v1][a1]concat=n=2:v=1:a=1[vout][aout]' \
  -map '[vout]' -map '[aout]' -c:v libx264 -preset medium -crf 21 \
  -profile:v high -pix_fmt yuv420p -c:a aac -b:a 160k -ar 48000 -ac 2 \
  -movflags +faststart "$output_dir/madeira-four-beat-web-cut.mp4"

ffmpeg -hide_banner -y -loglevel error \
  -i "$output_dir/madeira-six-clip-master.mp4" -ss 2 -frames:v 1 \
  -vf 'scale=960:-2' -q:v 2 "$output_dir/madeira-six-clip-poster.jpg"

ffmpeg -hide_banner -y -loglevel error \
  -i "${sources[0]}" -i "${sources[1]}" -i "${sources[2]}" \
  -i "${sources[3]}" -i "${sources[4]}" -i "${sources[5]}" \
  -filter_complex '[0:v]trim=start=3:end=3.05,setpts=PTS-STARTPTS,crop=1024:576:0:48,scale=320:180[c0];[1:v]trim=start=3:end=3.05,setpts=PTS-STARTPTS,crop=1024:576:0:48,scale=320:180[c1];[2:v]trim=start=3:end=3.05,setpts=PTS-STARTPTS,crop=1024:576:0:48,scale=320:180[c2];[3:v]trim=start=3:end=3.05,setpts=PTS-STARTPTS,crop=1024:576:0:48,scale=320:180[c3];[4:v]trim=start=3:end=3.05,setpts=PTS-STARTPTS,crop=1024:576:0:48,scale=320:180[c4];[5:v]trim=start=3:end=3.05,setpts=PTS-STARTPTS,crop=1024:576:0:48,scale=320:180[c5];[c0][c1][c2]hstack=inputs=3[row0];[c3][c4][c5]hstack=inputs=3[row1];[row0][row1]vstack=inputs=2,format=yuvj420p[out]' \
  -map '[out]' -frames:v 1 -q:v 2 "$output_dir/madeira-six-source-contact-sheet.jpg"
