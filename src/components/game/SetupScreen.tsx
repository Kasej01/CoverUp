import { useState } from "react";
import { motion } from "framer-motion";
import { Users, UserX, Play, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SetupScreenProps {
  onStartGame: (playerCount: number, spyCount: number) => void;
}

const SetupScreen = ({ onStartGame }: SetupScreenProps) => {
  const [playerCount, setPlayerCount] = useState(4);
  const [spyCount, setSpyCount] = useState(1);

  const maxSpies = Math.floor(playerCount / 2);

  const adjustPlayers = (delta: number) => {
    const newCount = Math.max(3, Math.min(25, playerCount + delta));
    setPlayerCount(newCount);
    if (spyCount > Math.floor(newCount / 2)) {
      setSpyCount(Math.floor(newCount / 2));
    }
  };

  const adjustSpies = (delta: number) => {
    setSpyCount(Math.max(1, Math.min(maxSpies, spyCount + delta)));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="font-display text-5xl md:text-6xl font-bold text-gold-gradient mb-4">
          CoverUp
        </h1>
        <p className="text-muted-foreground text-lg">
          Find the spy. Protect your cover.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full max-w-sm space-y-8"
      >
        {/* Player Count */}
        <div className="bg-card rounded-2xl p-6 card-glow">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center">
                <Users className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display text-lg">Players</span>
            </div>
            <span className="text-3xl font-display font-bold text-primary">
              {playerCount}
            </span>
          </div>
          <div className="flex gap-3">
            <Button
              variant="secondary"
              size="lg"
              className="flex-1 h-14"
              onClick={() => adjustPlayers(-1)}
              disabled={playerCount <= 3}
            >
              <Minus className="w-6 h-6" />
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="flex-1 h-14"
              onClick={() => adjustPlayers(1)}
              disabled={playerCount >= 25}
            >
              <Plus className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Spy Count */}
        <div className="bg-card rounded-2xl p-6 card-glow">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full spy-gradient flex items-center justify-center">
                <UserX className="w-5 h-5 text-foreground" />
              </div>
              <span className="font-display text-lg">Spies</span>
            </div>
            <span className="text-3xl font-display font-bold text-spy">
              {spyCount}
            </span>
          </div>
          <div className="flex gap-3">
            <Button
              variant="secondary"
              size="lg"
              className="flex-1 h-14"
              onClick={() => adjustSpies(-1)}
              disabled={spyCount <= 1}
            >
              <Minus className="w-6 h-6" />
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="flex-1 h-14"
              onClick={() => adjustSpies(1)}
              disabled={spyCount >= maxSpies}
            >
              <Plus className="w-6 h-6" />
            </Button>
          </div>
          <p className="text-muted-foreground text-sm mt-3 text-center">
            Max {maxSpies} spies for {playerCount} players
          </p>
        </div>

        {/* Start Button */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            size="lg"
            className="w-full h-16 text-xl font-display gold-gradient hover:opacity-90 transition-opacity"
            onClick={() => onStartGame(playerCount, spyCount)}
          >
            <Play className="w-6 h-6 mr-2" />
            Start Game
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SetupScreen;
