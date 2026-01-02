# 🎭 Location & Roles Social Deduction Game

A flexible social deduction / role-playing game built around **dynamic locations** and **unique character roles**.  
Each game places players into a shared location where everyone has a role — but not everyone has the same goal.

Perfect for:
- Party games
- Classroom games
- Online multiplayer experiments
- AI or chatbot role simulations
- Tabletop-style digital games

---

## 🧠 Core Game Concept

- Each round takes place in a **single location** (e.g. Police Station, Space Station, Pirate Ship).
- Every player is secretly assigned a **role** from that location.
- Roles may have:
  - Hidden objectives
  - Special abilities
  - Information advantages
  - Conflicting goals

Players must:
- Talk, lie, question, and reason
- Figure out who others are
- Complete objectives or expose opponents
- Survive until the end of the round

---

## 🗺️ Locations & Roles System

The game uses a structured JSON system:

- Each **location** contains **at least 12 roles**
- Roles are themed to match the location
- Locations can be swapped easily between rounds
- New locations can be added without changing game logic

### Example Structure

```json
{
  "name": "Police Station",
  "roles": [
    "Detective",
    "Police Chief",
    "Patrol Officer",
    "Dispatcher",
    "Forensic Specialist",
    "Evidence Technician",
    "Witness",
    "Informant",
    "Criminal",
    "Lawyer",
    "Journalist",
    "Secretary"
  ]
}
