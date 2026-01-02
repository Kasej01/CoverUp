import { useState } from "react";
import SetupScreen from "@/components/game/SetupScreen";
import GameScreen from "@/components/game/GameScreen";

type GameState = "setup" | "playing";

interface GameConfig {
  playerCount: number;
  spyCount: number;
}

const Index = () => {
  const [gameState, setGameState] = useState<GameState>("setup");
  const [gameConfig, setGameConfig] = useState<GameConfig>({
    playerCount: 4,
    spyCount: 1,
  });
  const [gameKey, setGameKey] = useState(0);

  const handleStartGame = (playerCount: number, spyCount: number) => {
    setGameConfig({ playerCount, spyCount });
    setGameState("playing");
  };

  const handleRestart = () => {
    setGameKey((prev) => prev + 1);
    setGameState("playing");
  };

  const handleHome = () => {
    setGameState("setup");
  };

  return (
    <div className="min-h-screen bg-background">
      {gameState === "setup" ? (
        <SetupScreen onStartGame={handleStartGame} />
      ) : (
        <GameScreen
          key={gameKey}
          playerCount={gameConfig.playerCount}
          spyCount={gameConfig.spyCount}
          onRestart={handleRestart}
          onHome={handleHome}
        />
      )}
    </div>
  );
};

export default Index;
