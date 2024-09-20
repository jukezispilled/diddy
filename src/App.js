import React, { useState, useRef } from 'react';
import { Window, WindowHeader, WindowContent, Button, Toolbar, Panel, MenuListItem, MenuList, Handle } from 'react95';
import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';
import { Music } from 'lucide-react';

const quotes = [
  "Yesa! Yeye Binks gonna let you finish, but I'm the GOAT!",
  "Messa Yeezus! Just dropped the most fire track!",
  "Wesa in a Yeezy season! You ain’t got the answers, Sway!",
  "Yeye Binks be trendsetting! Like that mask at Fashion Week!",
  "Messa the best rapper! My Twitter rants go platinum!",
  "Wesa gonna drop a hot album! 'I Can’t Be Cancelled!'",
  "Messa gonna make you dance! Just like at that wedding crash!",
  "Yesa! Fashion is a lifestyle! Who wears flip-flops with suits?",
  "Messa gonna give you Kanye confidence! 'I am a God!'",
  "Wesa gonna change the game! Remember the VMAs?",
];

const planets = {
  Naboo: 'n.jpg',
  Coruscant: 'c.jpg',
  Tatooine: 't.jpg',
  Geonosis: 'g.jpg',
};

export default function App() {
  const [randomQuote, setRandomQuote] = useState(quotes[0]);
  const [selectedPlanet, setSelectedPlanet] = useState('n.jpg'); // Default to Tatooine (t.jpg)
  const audioRef = useRef(new Audio('https://ia601203.us.archive.org/34/items/datpiff-mixtape-m9943056/04%20-%20The%20Good%20Life.mp3'));
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
            <div className='text-xs'>CA: XXXXXXXXXX</div>
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
              <span>YeYe Binks v1.0</span>
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
                <a href="https://x.com/yeyebinks" className="transition ease-in-out duration-150 underline">
                  Twitter
                </a>
                <a href="https://t.me/yeyebinks" className="transition ease-in-out duration-150 underline">
                  TG
                </a>
              </div>
            </div>
            <WindowContent>
              <Panel variant="well" className="mb-4">
                <img
                  src="yeye.png"
                  alt="Yeye Binks"
                  className="w-full h-full object-cover"
                />
              </Panel>
              <div className="mb-4">{randomQuote}</div>
              <Button onClick={getNewQuote} fullWidth>
                Generate Yeye Wisdom
              </Button>
            </WindowContent>
          </Window>
      </div>
    </ThemeProvider>
  );
}
