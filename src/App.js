import React, { useState, useRef } from 'react';
import { Window, WindowHeader, WindowContent, Button, Toolbar, Panel, MenuListItem, MenuList, Handle } from 'react95';
import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';
import Draggable from 'react-draggable';
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
        className="h-screen w-screen flex flex-col justify-center items-center"
        style={{ backgroundImage: `url('./${selectedPlanet}')`, backgroundSize: 'cover' }}
      >
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

        <Draggable>
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
              <div className="flex items-center z-[50] pr-2 py-1">
                <a href="https://x.com/" className="transition ease-in-out duration-150">
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-7 md:size-9 md:hover:scale-105 transition ease-in-out duration-150 cursor-pointer" fill="#000000" viewBox="0 0 50 50">
                    <path d="M 6.9199219 6 L 21.136719 26.726562 L 6.2285156 44 L 9.40625 44 L 22.544922 28.777344 L 32.986328 44 L 43 44 L 28.123047 22.3125 L 42.203125 6 L 39.027344 6 L 26.716797 20.261719 L 16.933594 6 L 6.9199219 6 z"></path>
                  </svg>
                </a>
                <a href="https://t.me/" className="transition ease-in-out duration-150">
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-7 md:size-9  md:hover:scale-105 transition ease-in-out duration-150 cursor-pointer" fill="#00aaff" viewBox="0 0 50 50">
                    <path d="M46.137,6.552c-0.75-0.636-1.928-0.727-3.146-0.238l-0.002,0C41.708,6.828,6.728,21.832,5.304,22.445 c-0.259,0.09-2.521,0.934-2.288,2.814c0.208,1.695,2.026,2.397,2.248,2.478l8.893,3.045c0.59,1.964,2.765,9.21,3.246,10.758 c0.3,0.965,0.789,2.233,1.646,2.494c0.752,0.29,1.5,0.025,1.984-0.355l5.437-5.043l8.777,6.845l0.209,0.125 c0.596,0.264,1.167,0.396,1.712,0.396c0.421,0,0.825-0.079,1.211-0.237c1.315-0.54,1.841-1.793,1.896-1.935l6.556-34.077 C47.231,7.933,46.675,7.007,46.137,6.552z M22,32l-3,8l-3-10l23-17L22,32z"></path>
                  </svg>
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
        </Draggable>
      </div>
    </ThemeProvider>
  );
}
