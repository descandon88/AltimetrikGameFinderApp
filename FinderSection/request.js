function showGameCards(games) {
    gameCards.innerHTML = '';
    games.forEach(game => {
      const card = document.createElement('div');
      card.className = 'card';
      card.textContent = game.name;
      gameCards.appendChild(card);
    });
  }