import React, { useState, useRef } from 'react';
import { Window, WindowHeader, WindowContent, Button, Toolbar, Panel, MenuListItem, MenuList, Handle } from 'react95';
import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';
import { Music } from 'lucide-react';

const quotes = [
  "I didn’t invite them for a party, we were filming a ‘guys-only’ documentary!",
  "Bieber just dropped by to compare skincare routines—totally normal!",
  "Parties? Nah, it was a ‘men’s health’ summit. Just with more glow sticks.",
  "Weird? Nah, it’s just a creative mastermind gathering… with Bieber on background vocals.",
  "Bieber was there for research on ‘bro culture,’ obviously!",
  "That wasn’t a weird party, it was a ‘dude retreat’ with spontaneous choreography.",
  "Justin Bieber was just there to sing lullabies, totally innocent!",
  "Look, I didn’t invite Bieber; he just showed up with the weird vibes!"
];

const planets = {
  Party: 'p.webp',
  LIV: 'l.jpg',
  Nobu: 'n.webp',
  Jail: 'j.webp',
};

export default function App() {
  const [randomQuote, setRandomQuote] = useState(quotes[0]);
  const [selectedPlanet, setSelectedPlanet] = useState('p.webp'); // Default to Tatooine (t.jpg)
  const audioRef = useRef(new Audio('https://ia600201.us.archive.org/5/items/PuffDaddyIllBeMissingYou_201811/Puff%20Daddy%20-%20I%27ll%20Be%20Missing%20You.mp3'));
  const [isPlaying, setIsPlaying] = useState(false);

  const getNewQuote = () => {
    setRandomQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  };

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handlePlanetChange = (planet) => {
    setSelectedPlanet(planets[planet]);
  };

  return (
    <ThemeProvider theme={original}>
      <div
        className="h-screen w-screen flex flex-col justify-center items-center relative"
        style={{ backgroundImage: `url('./${selectedPlanet}')`, backgroundSize: 'cover' }}
      >
        <div className='absolute bottom-4'>
          <Window>
            <div className='text-xs'>CA: generating...</div>
          </Window>
        </div>
        <div className="absolute top-5 left-5">
          <MenuList inline>
            <MenuListItem square disabled>
              <span role="img" aria-label="🌐">🌐</span>
            </MenuListItem>
            <Handle size={38} />
            {Object.keys(planets).map((planet) => (
              <MenuListItem key={planet} onClick={() => handlePlanetChange(planet)}>
                <span className='text-sm md:text-base font-semibold'>{planet}</span>
              </MenuListItem>
            ))}
          </MenuList>
        </div>

          <Window className="w-80">
            <WindowHeader className="flex justify-between items-center">
              <span>Super Diddy v1.0</span>
              <Button size="sm" square>
                <span className="text-lg">×</span>
              </Button>
            </WindowHeader>
            <div className='flex justify-between'>
              <Toolbar>
                <Button variant="menu" size="sm" onClick={toggleMusic}>
                  <Music size={16} className="mr-2" />
                  {isPlaying ? 'Pause Music' : 'Play Music'}
                </Button>
              </Toolbar>
              <div className="flex items-center z-[50] pr-2 py-1 space-x-2">
                <a href="https://x.com/" className="transition ease-in-out duration-150 underline">
                  Twitter
                </a>
                <a href="https://t.me/" className="transition ease-in-out duration-150 underline">
                  TG
                </a>
              </div>
            </div>
            <WindowContent>
              <Panel variant="well" className="mb-4">
                <img
                  src="diddy.jpeg"
                  alt="Super Diddy"
                  className="w-full h-full object-cover"
                />
              </Panel>
              <div className="mb-4">{randomQuote}</div>
              <Button onClick={getNewQuote} fullWidth>
                Generate Innocence
              </Button>
            </WindowContent>
          </Window>
      </div>
    </ThemeProvider>
  );
}
