async function getProfil() {
  const profil = [
    {
      name: "Mimi Keel",
      city: "London",
      country: "UK",
      tagline: "Voir le beau dans le quotidien",
      portrait: "MimiKeel.jpg",
    },
  ];

  return {
    profil: [...profil],
  };
}
