class Burger {
  constructor(filling) {
    this.filling = fillings.getFilling(filling);
    this.checkSeasoning = false;
    this.checkMayonnaise = false;
  }

  // если специй нет, добавление, иначе удаление
  addSeasoning() {
    if (!this.checkSeasoning) {
      this.price += 15;
      this.checkSeasoning = true;
    } else {
      this.price -= 15;
      this.checkSeasoning = false;
    }
  }

  // если майонеза нет, добавление, иначе удаление
  addMayonnaise() {
    if (!this.checkMayonnaise) {
      this.price += 20;
      this.calories += 5;
      this.checkMayonnaise = true;
    } else {
      this.price -= 20;
      this.calories -= 5;
      this.checkMayonnaise = false;
    }
  }

  getCalories() {
    return this.calories + this.filling.calories;
  }

  getPrice() {
    return this.price + this.filling.price;
  }
}

class SmallBurger extends Burger{
  constructor(filling) {
    super(filling);
    this.calories = 20;
    this.price = 50;
  }

}

class BigBurger extends Burger{
  constructor(filling) {
    super(filling);
    this.calories = 40;
    this.price = 100;
  }
}

const fillings = {
  fillingsList: [
    {filling: 'cheese', calories: 20, price: 10},
    {filling: 'salad', calories: 5, price: 20},
    {filling: 'potatoes', calories: 10, price: 15},
  ],

  getFilling(filling) {
    for (let i = 0; i < this.fillingsList.length; i++) {
      if (this.fillingsList[i].filling === filling) {
        return this.fillingsList[i];
      }
    }
  }
}

class Cart {
  constructor() {
    this.selectedOptions();
  }

  // создание бургера на основе выбранных параметров
  selectedOptions() {
    this.size = this.selectedSize();
    this.filling = this.selectedFilling();

    if (this.size === 'small') {
      this.burger = new SmallBurger(this.filling);
    } else this.burger = new BigBurger(this.filling);

    if (this.selectedMayonnaise()) this.burger.addMayonnaise();
    if (this.selectedSeasoning()) this.burger.addSeasoning();

    this.loadImg();
    this.calculateTotal();
  }

  // определение выбранного размера
  selectedSize() {
    let size = document.querySelector('.order-size').
    querySelectorAll('input');

    for (let i = 0; i < size.length; i++) {
      if (size[i].checked) {
        return size[i].dataset.size;
      }
    }
  }

  // определение выбранной начинки
  selectedFilling() {
    let filling = document.querySelector('.order-filling').
    querySelectorAll('input');

    for (let i = 0; i < filling.length; i++) {
      if (filling[i].checked) {
        return filling[i].dataset.filling;
      }
    }
  }

  // определение наличие майонеза
  selectedMayonnaise() {
    let mayonnaise = document.querySelector('#mayonnaise');
    if (mayonnaise.checked) {
      return true;
    }
  }

  // определение наличие специй
  selectedSeasoning() {
    let seasoning = document.querySelector('#seasoning');
    if (seasoning.checked) {
      return true;
    }
  }

  loadImg() {
    let img = document.getElementById('order-img');
    if(this.size === 'small') {
      img.src = 'img/smallBurger.png';
    } else {
      img.src = 'img/bigBurger.png';
    }
  }

  calculateTotal() {
    document.getElementById('total-price').innerText = `Цена: ${this.burger.getPrice()}`
    document.getElementById('total-calories').innerText = `Калорийность: ${this.burger.getCalories()}`
  }
}

let cart = new Cart();

// добавление обработчика события для всех input
let inputs = document.querySelectorAll('input');
for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener('change', () => cart.selectedOptions());
}




