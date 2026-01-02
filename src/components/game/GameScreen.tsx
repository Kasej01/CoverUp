import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { RotateCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import RoleCard from "./RoleCard";
import locationsData from "@/data/locations.json";

interface GameScreenProps {
  playerCount: number;
  spyCount: number;
  onRestart: () => void;
  onHome: () => void;
}

interface PlayerRole {
  isSpy: boolean;
  role: string | null;
}

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const GameScreen = ({
  playerCount,
  spyCount,
  onRestart,
  onHome,
}: GameScreenProps) => {
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [isRevealed, setIsRevealed] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const gameData = useMemo(() => {
    // Pick a random location
    const location =
      locationsData.locations[
        Math.floor(Math.random() * locationsData.locations.length)
      ];

    // Shuffle roles
    const shuffledRoles = shuffleArray(location.roles);

    // Create player assignments
    const players: PlayerRole[] = [];

    // Assign spies
    for (let i = 0; i < spyCount; i++) {
      players.push({ isSpy: true, role: null });
    }

    // Assign regular players with roles
    for (let i = 0; i < playerCount - spyCount; i++) {
      players.push({
        isSpy: false,
        role: shuffledRoles[i % shuffledRoles.length],
      });
    }

    // Shuffle player order
    return {
      location: location.name,
      players: shuffleArray(players),
    };
  }, [playerCount, spyCount]);

  const handleReveal = () => {
    setIsRevealed(true);
  };

  const handleHide = () => {
    setIsRevealed(false);
  };

  const handleNext = () => {
    if (currentPlayer >= playerCount) {
      setGameStarted(true);
    } else {
      setCurrentPlayer((prev) => prev + 1);
      setIsRevealed(false);
    }
  };

  if (gameStarted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="text-6xl mb-6">🎭</div>
          <h1 className="font-display text-4xl font-bold text-gold-gradient mb-4">
            Game On!
          </h1>
          <p className="text-muted-foreground text-lg mb-2">
            Start asking questions to find the spy!
          </p>
          <p className="text-muted-foreground mb-8">
            {playerCount} players · {spyCount} {spyCount === 1 ? "spy" : "spies"}
          </p>

          <div className="bg-card rounded-2xl p-6 card-glow mb-8 max-w-sm mx-auto">
            <p className="text-muted-foreground text-sm uppercase tracking-wider mb-2">
              The Location Is
            </p>
            <p className="font-display text-2xl font-bold text-primary">
              {gameData.location}
            </p>
            <p className="text-muted-foreground text-sm mt-2">
              (Don't show this to the spies!)
            </p>
          </div>

          <div className="flex gap-4 justify-center">
            <Button
              variant="secondary"
              size="lg"
              className="h-14 px-6"
              onClick={onHome}
            >
              <Home className="w-5 h-5 mr-2" />
              Home
            </Button>
            <Button
              size="lg"
              className="h-14 px-6 gold-gradient"
              onClick={onRestart}
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              New Game
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  const currentPlayerData = gameData.players[currentPlayer - 1];

  return (
    <RoleCard
      playerNumber={currentPlayer}
      totalPlayers={playerCount}
      role={currentPlayerData.role}
      location={gameData.location}
      isSpy={currentPlayerData.isSpy}
      isRevealed={isRevealed}
      onReveal={handleReveal}
      onHide={handleHide}
      onNext={handleNext}
      isLastPlayer={currentPlayer === playerCount}
    />
  );
};

export default GameScreen;
