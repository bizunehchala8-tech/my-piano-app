import React, { useState, useEffect, useCallback, useRef } from 'react';

const TRANSLATIONS = {
  "en-US": {
    "appTitle": "PianoBar",
    "songInputPlaceholder": "Request a song...",
    "parseSongButton": "Parse song",
    "processingButton": "Processing...",
    "playingPrefix": "Playing: ",
    "readyToPlayPrefix": "Ready to play: ",
    "playButton": "Play",
    "stopButton": "Stop",
    "parseErrorMessage": "Sorry, I had trouble parsing that song.",
    "happyBirthday": "Happy birthday",
    "twinkleTwinkle": "Twinkle twinkle little star",
    "maryHadLamb": "Mary had a little lamb",
    "jingleBells": "Jingle bells",
    "sadMelody": "Sad melody",
    "amazingGrace": "Amazing grace",
    "silentNight": "Silent night",
    "auldLangSyne": "Auld lang syne"
  },
  "am-ET": {
    "appTitle": "ፒያኖ ባር",
    "songInputPlaceholder": "ዘፈን ይጠይቁ...",
    "parseSongButton": "ዘፈኑን አውጣ",
    "processingButton": "በመፈለግ ላይ...",
    "playingPrefix": "በመጫወት ላይ: ",
    "readyToPlayPrefix": "ለማጫወት ዝግጁ: ",
    "playButton": "አጫውት",
    "stopButton": "አቁም",
    "parseErrorMessage": "ይቅርታ፣ ዘፈኑን ማውጣት አልቻልኩም ተመልሰው ይሞክሩ።",
    "happyBirthday": "መልካም ልደት",
    "twinkleTwinkle": "ልጭልጭ ኮከብ",
    "maryHadLamb": "ማርያም በግ ነበራት",
    "jingleBells": "ጂንግል ቤልስ",
    "sadMelody": "የሀዘን ዜማ",
    "amazingGrace": "አስደናቂ ጸጋ",
    "silentNight": "ጸጥ ያለች ሌሊት",
    "auldLangSyne": "የድሮ ትዝታ"
  }
};

const appLocale = 'am-ET'; // ወደ እንግሊዝኛ ለመቀየር 'en-US' አድርገው

const PianoPlayer = () => {
  const [activeKeys, setActiveKeys] = useState(new Set());
  const [songInput, setSongInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef(null);
  const sequenceRef = useRef(null);

  const noteFrequencies = {
    'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13, 'E4': 329.63,
    'F4': 349.23, 'F#4': 369.99, 'G4': 392.00, 'G#4': 415.30, 'A4': 440.00,
    'A#4': 466.16, 'B4': 493.88, 'C5': 523.25, 'C#5': 554.37, 'D5': 587.33,
    'D#5': 622.25, 'E5': 659.25, 'F5': 698.46, 'F#5': 739.99, 'G5': 783.99
  };

  const pianoKeys = [
    { note: 'C4', type: 'white', key: 'a' },
    { note: 'C#4', type: 'black', key: 'w' },
    { note: 'D4', type: 'white', key: 's' },
    { note: 'D#4', type: 'black', key: 'e' },
    { note: 'E4', type: 'white', key: 'd' },
    { note: 'F4', type: 'white', key: 'f' },
    { note: 'F#4', type: 'black', key: 't' },
    { note: 'G4', type: 'white', key: 'g' },
    { note: 'G#4', type: 'black', key: 'y' },
    { note: 'A4', type: 'white', key: 'h' },
    { note: 'A#4', type: 'black', key: 'u' },
    { note: 'B4', type: 'white', key: 'j' },
    { note: 'C5', type: 'white', key: 'k' },
    { note: 'C#5', type: 'black', key: 'o' },
    { note: 'D5', type: 'white', key: 'l' },
    { note: 'D#5', type: 'black', key: 'p' },
    { note: 'E5', type: 'white', key: ';' },
    { note: 'F5', type: 'white', key: "'" }
  ];

  const t = (key) => TRANSLATIONS[appLocale][key] || key;

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">{t('appTitle')}</h1>
      
      <div className="max-w-md mx-auto mb-8 flex gap-2">
        <input 
          className="flex-1 p-2 border rounded shadow-sm"
          placeholder={t('songInputPlaceholder')}
          value={songInput}
          onChange={(e) => setSongInput(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {t('parseSongButton')}
        </button>
      </div>

      <div className="flex justify-center overflow-x-auto p-4 bg-white rounded-xl shadow-lg relative h-64">
        {pianoKeys.map((key) => (
          <button
            key={key.note}
            className={`
              ${key.type === 'white' ? 'w-12 h-48 bg-white border z-0' : 'w-8 h-32 bg-black text-white -mx-4 z-10'}
              hover:bg-blue-100 border-gray-300 rounded-b-md transition-colors
            `}
          >
            <span className="block mt-auto pb-2 text-[10px]">{key.note}</span>
          </button>
        ))}
      </div>
      
      <div className="mt-8 flex flex-wrap gap-2 justify-center">
        {['happyBirthday', 'twinkleTwinkle', 'jingleBells'].map(s => (
          <button key={s} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
            {t(s)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PianoPlayer;
