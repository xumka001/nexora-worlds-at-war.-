# NEXORA: Worlds at War — Game Design

## Vision
A colorful stylized 3D mobile sci-fi multiplayer game where players begin as astronauts on Earth, build a personal island base, fight other players, develop technology, launch into space, join clans, and eventually compete for territory across planets and star systems.

## Core loop
1. Explore the base as a physical astronaut character.
2. Gather and produce resources.
3. Build and upgrade structures.
4. Research new technology.
5. Fight PvP battles and earn rewards.
6. Build the first spacecraft and reach orbit.
7. Expand to the Moon, Mars and later worlds.
8. Join a clan and compete for planetary territory.

## MVP v0.1
The first playable version focuses on proving the core experience:
- Earth starter island.
- Third-person astronaut movement.
- Camera follow/orbit.
- Resource inventory.
- Placement and construction foundation.
- Basic resource-producing building.
- First spacecraft progression placeholder.
- Simple PvP arena foundation.
- Architecture prepared for multiplayer expansion.

## Multiplayer direction
Target modes:
- Shared multiplayer world/session presence.
- 1v1.
- 2v2.
- 4v4.
- 8v8.
- Clans and clan wars.
- Scheduled planetary territory wars.

Initial technical direction: Unity 6 + Netcode for GameObjects, with Unity multiplayer sessions/Relay considered for internet connectivity. Gameplay rules should be designed so authoritative validation can be moved server-side as the project grows.

## World progression
Earth -> Orbit Hub -> Moon -> Mars -> outer planets -> other star systems -> galaxies.

## Technology progression
Chemical rockets -> nuclear propulsion -> fusion -> antimatter -> warp -> intergalactic travel.

## Base systems
Planned building categories:
- Headquarters.
- Resource producers.
- Storage.
- Defensive towers.
- Research center.
- Hangar.
- Spaceport.

## Economy
Primary resources for prototype:
- Credits.
- Metal.
- Energy.

Later resources can be planet-specific and used to motivate territory wars and trade.

## Monetization principles
- Space Pass / subscription concept around $4.99 per month.
- Premium currency.
- Cosmetics.
- Convenience and timer acceleration.
- Avoid making direct combat power overwhelmingly pay-to-win.

## Art direction
Bright, readable, stylized 3D sci-fi. Friendly enough for a broad mobile audience while preserving large-scale progression and competitive clan warfare.

## Development rule
Build the smallest playable vertical slice first. Do not attempt planets, clans, economy, matchmaking, construction, combat and live operations simultaneously. Each system should have a clean interface so it can be expanded without rewriting the whole game.
