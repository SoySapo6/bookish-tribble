const { spawn } = require('child_process');

const ffmpegPath = 'ffmpeg'; // usa ffmpeg instalado en sistema

const video = 'memes.mp4';

// usa la URL RTMP
const streamUrl = 'rtmp://rtmp.livepeer.com/live/a946-sgjb-dsui-j9wd';

function startStream() {
  console.log('🔥 Iniciando stream a Livepeer...');

  const ffmpeg = spawn(ffmpegPath, [
    '-stream_loop', '-1',
    '-re',
    '-i', video,
    '-c:v', 'libx264',
    '-preset', 'veryfast',
    '-b:v', '3000k',
    '-c:a', 'aac',
    '-b:a', '128k',
    '-f', 'flv',
    streamUrl
  ]);

  ffmpeg.stdout.on('data', data => {
    console.log(`📤 STDOUT: ${data}`);
  });

  ffmpeg.stderr.on('data', data => {
    console.error(`⚠️ STDERR: ${data}`);
  });

  ffmpeg.on('close', code => {
    console.log(`❌ ffmpeg cerró con código ${code}`);
    setTimeout(startStream, 5000);
  });
}

startStream();
