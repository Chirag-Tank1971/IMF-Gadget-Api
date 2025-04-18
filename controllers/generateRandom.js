const adjectives = [
    "Silent", "Crimson", "Phantom", "Iron", "Ghost", "Shadow", "Quantum",
    "Silver", "Golden", "Electric", "Stealth", "Inferno", "Omega", "Cyber"
  ];
  
  const nouns = [
    "Falcon", "Viper", "Kraken", "Specter", "Hawk", "Scorpion", "Wraith",
    "Nightingale", "Sentinel", "Raven", "Predator", "Mantis", "Hornet", "Blade"
  ];

module.exports.generateCodename =  () => {
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const codename = `${adj} ${noun}`;
    return codename;
  }


module.exports.generateProbo =  () => {
  const probo =  Math.floor(Math.random() * 51) + 50
  return  probo;
}