class Card {
    constructor(id, proto, name, description, purity, user, image, genre = 'Card Game') {
      this.id = id;
      this.proto = proto;
      this.name = name;
      this.description = description;
      this.purity = purity;
      this.user = user;
      this.image = image;
      this.genre = genre;
    }
  }
  
  module.exports = Card;
  