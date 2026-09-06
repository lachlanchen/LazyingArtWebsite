# Six clips to one finished idea

This is a project-owned editing sample made from six AI-assisted LALACHAN scenes. It demonstrates the same source limit, master length, web-cut length, aspect ratio, and handoff record used by the AI Clip Assembly Pilot. It is not customer work or evidence of advertising performance.

## Source selection

The six eight-second sources come from the original *Madeira: the island that keeps going up* story. The edit uses the first 7.2 seconds of each selected scene, for 43.2 seconds of source material:

1. arrive above the valley and mistake Madeira for Brazil;
2. move through the coastal tunnel into different weather;
3. cross the flower garden toward the sea;
4. follow the levada into the forest;
5. slow down in the laurel forest;
6. resolve at the volcanic coast.

The master is 41.958 seconds after five 0.25-second overlaps. The 27.816-second web cut keeps scenes 1, 2, 5, and 6 from that same timeline.

## Editing decisions

- Crop the 1024×768 sources to a centred 16:9 frame, then scale to 1280×720.
- Retain the source dialogue, ambience, and music; crossfade sound with picture.
- Let each scene perform one story job rather than preserving every generated frame.
- Derive the short cut from the accepted master instead of building a second unrelated film.
- Export H.264 video with stereo AAC audio and fast-start metadata.

## Files

- `madeira-six-clip-master.mp4` — 41.958 seconds; SHA-256 `ceb4f23f963e2571ac57b2a3023d76c00dba813c74e728a6371482e03a4d2f47`
- `madeira-four-beat-web-cut.mp4` — 27.816 seconds; SHA-256 `836af75cd57bcba8d72a50b3bd57020d92614d54fbe280dadb8347c6765fa653`
- `manifest.json` — source order, hashes, edit decisions, output probes, and claim boundary
- `build-sample.sh` — the FFmpeg build used for these files

Rebuild with:

```sh
./build-sample.sh /path/to/madeira-shot-directory
```

The source directory must contain the six filenames recorded in the manifest. FFmpeg 6.1.1 was used for this build.
