import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RoleCardProps {
  playerNumber: number;
  totalPlayers: number;
  role: string | null;
  location: string | null;
  isSpy: boolean;
  isRevealed: boolean;
  onReveal: () => void;
  onHide: () => void;
  onNext: () => void;
  isLastPlayer: boolean;
}

const RoleCard = ({
  playerNumber,
  totalPlayers,
  role,
  location,
  isSpy,
  isRevealed,
  onReveal,
  onHide,
  onNext,
  isLastPlayer,
}: RoleCardProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mb-8"
      >
        <p className="text-muted-foreground text-lg mb-2">
          Player {playerNumber} of {totalPlayers}
        </p>
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPlayers }).map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors ${
                i < playerNumber ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>
      </motion.div>

      <div className="w-full max-w-sm perspective-1000">
        <AnimatePresence mode="wait">
          {!isRevealed ? (
            <motion.div
              key="hidden"
              initial={{ rotateY: 180, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -180, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-3xl p-8 card-glow min-h-[400px] flex flex-col items-center justify-center cursor-pointer"
              onClick={onReveal}
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mb-6"
              >
                <Eye className="w-12 h-12 text-primary" />
              </motion.div>
              <h2 className="font-display text-2xl font-bold mb-2">
                Player {playerNumber}
              </h2>
              <p className="text-muted-foreground text-center">
                Tap to reveal your role
              </p>
              <p className="text-muted-foreground text-sm mt-4 opacity-60">
                Make sure no one else can see!
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="revealed"
              initial={{ rotateY: -180, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: 180, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className={`rounded-3xl p-8 card-glow min-h-[400px] flex flex-col items-center justify-center ${
                isSpy ? "bg-card" : "bg-card"
              }`}
            >
              {isSpy ? (
                <>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="text-6xl mb-6"
                  >
                    🕵️
                  </motion.div>
                  <h2 className="font-display text-4xl font-bold mb-4 text-foreground">
                    YOU ARE THE SPY
                  </h2>
                  <p className="text-foreground/80 text-center text-lg">
                    You don't know the location.
                  </p>
                  <p className="text-foreground/60 text-center mt-2">
                    Try to blend in and figure it out!
                  </p>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full gold-gradient flex items-center justify-center mb-6">
                    <span className="text-3xl">📍</span>
                  </div>
                  <p className="text-muted-foreground text-sm uppercase tracking-wider mb-2">
                    Location
                  </p>
                  <h2 className="font-display text-3xl font-bold text-primary mb-6">
                    {location}
                  </h2>
                  <div className="w-full h-px bg-border mb-6" />
                  <p className="text-muted-foreground text-sm uppercase tracking-wider mb-2">
                    Your Role
                  </p>
                  <h3 className="font-display text-2xl font-semibold">
                    {role}
                  </h3>
                </>
              )}

              <div className="flex gap-3 mt-8 w-full">
                <Button
                  variant="secondary"
                  size="lg"
                  className="flex-1 h-14"
                  onClick={onHide}
                >
                  <EyeOff className="w-5 h-5 mr-2" />
                  Hide
                </Button>
                <Button
                  size="lg"
                  className={`flex-1 h-14 ${
                    isLastPlayer ? "gold-gradient" : ""
                  }`}
                  onClick={onNext}
                >
                  {isLastPlayer ? "Start Round" : "Next"}
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RoleCard;
