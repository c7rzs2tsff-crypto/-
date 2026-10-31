import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

// --- DATA ---
const heroine = {
  name: "Aeliana",
  image: "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?q=80&w=600&auto=format&fit=crop",
  description: "A resilient survivor forged in the harsh realities of the Overworld. Aeliana wields ancient magic and modern ingenuity to protect the remnants of humanity from the encroaching darkness.",
  features: [
    "Dual-wielding combat system with magical artifacts",
    "Dynamic stealth mechanics to avoid overwhelming hordes",
    "Crafting and base-building under extreme pressure"
  ]
};

const steve = {
  name: "Steve",
  image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop",
  description: "The legendary pioneer. Steve's unmatched adaptability and raw determination make him the ultimate vanguard against the world's most terrifying threats. He builds, he fights, he endures.",
  features: [
    "Master of all weapon types and environmental traps",
    "Enhanced durability and resource gathering speed",
    "Leadership aura that buffs nearby allied NPCs"
  ]
};

const enemies = [
  { id: 1, name: "Zombie", tags: "Melee, slow, relentless", lore: "The classic undead menace. They roam the night in hordes, relentless in their pursuit of the living. Though slow, their sheer numbers make them a formidable threat.", image: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=400&auto=format&fit=crop" },
  { id: 2, name: "Skeleton", tags: "Ranged, highly accurate, fragile", lore: "Bone-chilling archers of the darkness. They maintain a deadly distance, firing with uncanny accuracy. A single well-placed arrow can turn the tide of battle.", image: "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?q=80&w=400&auto=format&fit=crop" },
  { id: 3, name: "Creeper", tags: "Stealthy, explosive, high burst damage", lore: "The silent assassin of the blocky world. Approaching without a sound, their only warning is a faint, terrifying hiss before a devastating explosion.", image: "https://images.unsplash.com/photo-1627850604058-52e40de1b847?q=80&w=400&auto=format&fit=crop" },
  { id: 4, name: "Enderman", tags: "Teleporting, agile, neutral until provoked", lore: "Tall, dark, and mysterious wanderers of the void. They mind their own business until you meet their gaze. Once provoked, their agility makes them a nightmare.", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=400&auto=format&fit=crop" },
  { id: 5, name: "Witch", tags: "Ranged, throws potions, heals allies", lore: "Masters of dark alchemy. They hurl debilitating potions of poison and weakness from afar, and can instantly heal themselves or their allies.", image: "https://images.unsplash.com/photo-1598556776374-0a3734771d54?q=80&w=400&auto=format&fit=crop" },
  { id: 6, name: "Phantom", tags: "Flying, swoops down, spawns when sleep is skipped", lore: "Nightmarish creatures of the sleepless. They circle high above before executing deadly swooping attacks. The only true defense is a regular sleep schedule.", image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=400&auto=format&fit=crop" },
  { id: 7, name: "Warden", tags: "Blind, detects vibrations, massive melee damage, sonic boom", lore: "The ultimate subterranean horror. Completely blind, it hunts by sensing vibrations. Its melee strikes can obliterate armored players, and its sonic boom bypasses all shields.", image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=400&auto=format&fit=crop" },
  { id: 8, name: "Wither", tags: "Boss, flies, shoots explosive skulls, applies decay", lore: "A monstrous artifact of destruction brought to life by dark magic. It flies erratically, firing explosive skulls that inflict a devastating decay effect.", image: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?q=80&w=400&auto=format&fit=crop" },
  { id: 9, name: "Ender Dragon", tags: "Final Boss, massive HP, breath attack, regenerates", lore: "The ruler of the End. A colossal beast with immense health, a devastating breath attack, and the ability to regenerate via End Crystals.", image: "https://images.unsplash.com/photo-1577493340887-b7bfff550145?q=80&w=400&auto=format&fit=crop" }
];

const weapons = [
  { id: 1, name: "Wooden Sword", damage: 1, image: "https://images.unsplash.com/photo-1589820296156-2454bb8a6d54?q=80&w=400&auto=format&fit=crop" },
  { id: 2, name: "Stone Sword", damage: 2, image: "https://images.unsplash.com/photo-1595590424283-b8f1d44b9c74?q=80&w=400&auto=format&fit=crop" },
  { id: 3, name: "Iron Sword", damage: 3, image: "https://images.unsplash.com/photo-1583316137290-2f0827e1c5d4?q=80&w=400&auto=format&fit=crop" },
  { id: 4, name: "Gold Sword", damage: 1, note: "High enchantability", image: "https://images.unsplash.com/photo-1615672967468-1c4b0c0c2b7f?q=80&w=400&auto=format&fit=crop" },
  { id: 5, name: "Diamond Sword", damage: 4, image: "https://images.unsplash.com/photo-1598556885317-0e2a8c8c7d2d?q=80&w=400&auto=format&fit=crop" },
  { id: 6, name: "Netherite Sword", damage: 5, image: "https://images.unsplash.com/photo-1535581652167-3d6b98c36cd1?q=80&w=400&auto=format&fit=crop" },
  { id: 7, name: "Bow", damage: 3, range: 5, image: "https://images.unsplash.com/photo-1563821731640-2d8d3d7d3f8e?q=80&w=400&auto=format&fit=crop" },
  { id: 8, name: "Crossbow", damage: 4, range: 5, image: "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?q=80&w=400&auto=format&fit=crop" },
  { id: 9, name: "Trident", damage: 4, range: 4, image: "https://images.unsplash.com/photo-1550948537-130a1ce83314?q=80&w=400&auto=format&fit=crop" }
];

// --- COMPONENTS ---

const DossierCard = ({ character }) => (
  <div className="bg-zinc-900/80 backdrop-blur-md border border-zinc-700 rounded-2xl p-8 max-w-4xl mx-auto shadow-2xl flex flex-col md:flex-row gap-8 items-center">
    <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 rounded-full overflow-hidden border-4 border-zinc-600 shadow-lg">
      <img src={character.image} alt={character.name} className="w-full h-full object-cover" />
    </div>
    <div className="flex-1 text-center md:text-left">
      <h2 className="text-4xl md:text-5xl font-rodin text-white mb-2">{character.name}</h2>
      <div className="h-1 w-24 bg-red-600 mb-6 mx-auto md:mx-0" />
      <p className="text-zinc-300 font-neue-frutiger text-lg leading-relaxed mb-6">
        {character.description}
      </p>
      <div className="bg-zinc-950/50 rounded-xl p-4 border border-zinc-800">
        <h3 className="text-sm font-kairos-sans text-red-500 uppercase tracking-widest mb-3">Gameplay Features</h3>
        <ul className="space-y-2">
          {character.features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-3 text-zinc-300 font-neue-frutiger">
              <span className="w-2 h-2 bg-red-600 rounded-full flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const FlipCard = ({ enemy }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="relative w-80 h-96 cursor-pointer group"
      onClick={() => setIsFlipped(!isFlipped)}
      style={{ transformStyle: "preserve-3d" }}
      animate={{ rotateY: isFlipped ? 180 : 0 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
    >
      {/* Front */}
      <div 
        className="absolute inset-0 w-full h-full rounded-xl overflow-hidden shadow-2xl bg-zinc-900 border border-zinc-800"
        style={{ backfaceVisibility: "hidden" }}
      >
        <img src={enemy.image} alt={enemy.name} className="w-full h-2/3 object-cover" />
        <div className="p-4 flex flex-col items-center justify-between h-1/3 bg-zinc-900">
          <h3 className="text-2xl font-rodin text-white">{enemy.name}</h3>
          <button className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-kairos-sans rounded transition-colors text-sm uppercase tracking-wider">
            Spoiler
          </button>
        </div>
      </div>

      {/* Back */}
      <div 
        className="absolute inset-0 w-full h-full rounded-xl overflow-hidden shadow-2xl bg-zinc-800 border border-zinc-700 p-6 flex flex-col justify-center"
        style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
      >
        <h3 className="text-2xl font-rodin text-red-500 mb-4">{enemy.name}</h3>
        <p className="text-zinc-300 font-neue-frutiger text-sm leading-relaxed mb-6">
          {enemy.lore}
        </p>
        <div className="mt-auto">
          <span className="inline-block px-3 py-1 bg-zinc-900 text-zinc-400 text-xs rounded-full font-kairos-sans border border-zinc-700">
            {enemy.tags}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const WeaponCard = ({ weapon }) => (
  <div className="w-72 flex-shrink-0 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-xl">
    <img src={weapon.image} alt={weapon.name} className="w-full h-40 object-cover" />
    <div className="p-5">
      <h3 className="text-xl font-rodin text-white mb-4">{weapon.name}</h3>
      
      {/* Damage Scale: Exactly 5 rectangular segments, SOLID RED */}
      <div className="mb-3">
        <span className="text-xs font-kairos-sans text-zinc-400 uppercase tracking-wider">Damage</span>
        <div className="flex gap-1 mt-1">
          {[...Array(5)].map((_, i) => (
            <div 
              key={`dmg-${i}`} 
              className={`h-3 flex-1 rounded-none ${i < weapon.damage ? 'bg-red-600' : 'bg-zinc-700'}`}
            />
          ))}
        </div>
      </div>

      {/* Range Scale (if applicable) */}
      {weapon.range && (
        <div className="mb-3">
          <span className="text-xs font-kairos-sans text-zinc-400 uppercase tracking-wider">Range</span>
          <div className="flex gap-1 mt-1">
            {[...Array(5)].map((_, i) => (
              <div 
                key={`rng-${i}`} 
                className={`h-3 flex-1 rounded-none ${i < weapon.range ? 'bg-blue-600' : 'bg-zinc-700'}`}
              />
            ))}
          </div>
        </div>
      )}

      {weapon.note && (
        <p className="text-xs text-zinc-500 font-neue-frutiger mt-2 italic">
          * {weapon.note}
        </p>
      )}
    </div>
  </div>
);

const SystemRequirements = () => (
  <div className="bg-zinc-950 py-20 px-4">
    <div className="container mx-auto max-w-5xl">
      <h2 className="text-4xl font-rodin text-white text-center mb-12">System Requirements</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8">
          <h3 className="text-2xl font-kairos-sans text-zinc-400 mb-6 border-b border-zinc-800 pb-4">Minimum</h3>
          <ul className="space-y-4 font-neue-frutiger text-zinc-300">
            <li><span className="text-zinc-500 block text-sm mb-1">OS</span> Windows 10 64-bit</li>
            <li><span className="text-zinc-500 block text-sm mb-1">Processor</span> Intel Core i5-4690 / AMD A10-7800</li>
            <li><span className="text-zinc-500 block text-sm mb-1">Memory</span> 8 GB RAM</li>
            <li><span className="text-zinc-500 block text-sm mb-1">Graphics</span> NVIDIA GeForce 700 Series / AMD Radeon Rx 200</li>
            <li><span className="text-zinc-500 block text-sm mb-1">Storage</span> 4 GB available space</li>
          </ul>
        </div>
        <div className="bg-zinc-900 border border-red-900/30 rounded-xl p-8 shadow-lg shadow-red-900/10">
          <h3 className="text-2xl font-kairos-sans text-red-500 mb-6 border-b border-zinc-800 pb-4">Recommended</h3>
          <ul className="space-y-4 font-neue-frutiger text-zinc-300">
            <li><span className="text-zinc-500 block text-sm mb-1">OS</span> Windows 10/11 64-bit</li>
            <li><span className="text-zinc-500 block text-sm mb-1">Processor</span> Intel Core i7-6700 / AMD Ryzen 5 1600</li>
            <li><span className="text-zinc-500 block text-sm mb-1">Memory</span> 16 GB RAM</li>
            <li><span className="text-zinc-500 block text-sm mb-1">Graphics</span> NVIDIA GeForce 1060 / AMD Radeon 580</li>
            <li><span className="text-zinc-500 block text-sm mb-1">Storage</span> 4 GB SSD</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

// --- MAIN APP COMPONENT ---

export default function MinecraftLandingPage() {
  const section2Ref = useRef(null);

  const scrollToSection2 = () => {
    section2Ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Orbitron:wght@500;700;900&family=Outfit:wght@300;400;500;600&display=swap');
        
        .font-neue-frutiger { font-family: 'Inter', sans-serif; }
        .font-kairos-sans { font-family: 'Outfit', sans-serif; }
        .font-rodin { font-family: 'Orbitron', sans-serif; }
        
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        
        @keyframes fog {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .fog-overlay {
          background: linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(20,20,20,0.5) 50%, rgba(0,0,0,0) 100%);
          background-size: 200% 100%;
          animation: fog 12s linear infinite;
        }
      `}</style>

      {/* Section 1: Hero Banner */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1587573089734-09cb69c0f2b4?q=80&w=2000&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-6xl md:text-8xl font-rodin text-white mb-8 tracking-tight drop-shadow-2xl"
          >
            ECHOES OF THE OVERWORLD
          </motion.h1>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            onClick={scrollToSection2}
            className="bg-red-600 hover:bg-red-700 text-white font-kairos-sans text-xl px-10 py-4 rounded-lg shadow-2xl transition-all transform hover:scale-105"
          >
            Read More
          </motion.button>
        </div>
      </section>

      {/* Section 2: Heroine Dossier */}
      <section ref={section2Ref} className="relative min-h-screen bg-zinc-950 flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2000&auto=format&fit=crop')",
              maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)"
            }}
          />
          <div className="absolute inset-0 shadow-[inset_0_0_150px_50px_rgba(9,9,11,1)] backdrop-blur-[2px]" />
        </div>
        <div className="absolute inset-0 z-10 bg-zinc-950/40 fog-overlay" />
        
        <div className="relative z-20 container mx-auto px-4 py-20">
          <DossierCard character={heroine} />
        </div>
      </section>

      {/* Section 3: Steve's Dossier */}
      <section className="relative min-h-screen bg-zinc-950 flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2000&auto=format&fit=crop')",
              maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)"
            }}
          />
          <div className="absolute inset-0 shadow-[inset_0_0_150px_50px_rgba(9,9,11,1)] backdrop-blur-[2px]" />
        </div>
        <div className="absolute inset-0 z-10 bg-zinc-950/40 fog-overlay" />
        
        <div className="relative z-20 container mx-auto px-4 py-20">
          <DossierCard character={steve} />
        </div>
      </section>

      {/* Section 4: Enemies Slider */}
      <section className="bg-zinc-950 py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-rodin text-white text-center mb-4">Bestiary</h2>
          <p className="text-zinc-400 font-neue-frutiger text-center mb-12 max-w-2xl mx-auto">Know your foes. Click the spoiler button on any card to reveal their hidden lore and tactical weaknesses.</p>
          <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide px-4">
            {enemies.map(enemy => (
              <div key={enemy.id} className="snap-center flex-shrink-0">
                <FlipCard enemy={enemy} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Weapons Slider */}
      <section className="bg-zinc-900 py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-rodin text-white text-center mb-4">Armory</h2>
          <p className="text-zinc-400 font-neue-frutiger text-center mb-12 max-w-2xl mx-auto">Choose your tools wisely. The red scale indicates raw damage potential.</p>
          <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide px-4">
            {weapons.map(weapon => (
              <div key={weapon.id} className="snap-center flex-shrink-0">
                <WeaponCard weapon={weapon} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: System Requirements & Footer */}
      <SystemRequirements />
      
      <footer className="bg-zinc-950 border-t border-zinc-900 py-12 text-center">
        <button 
          onClick={scrollToTop}
          className="bg-zinc-800 hover:bg-zinc-700 text-white font-kairos-sans px-8 py-3 rounded-lg shadow-lg transition-colors border border-zinc-700"
        >
          Back to Top
        </button>
        <p className="mt-8 text-zinc-600 font-neue-frutiger text-sm">
          © 2026 Echoes of the Overworld. All rights reserved. Not affiliated with Mojang Studios.
        </p>
      </footer>
    </>
  );
}