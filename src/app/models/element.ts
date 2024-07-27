export class Element {
  constructor(
    public name: string,
    public description: string,
    public dateOfCreation: Date,
    public dateOfCompletion: Date
  ) {}
}

export let elements: Element[] = [
  new Element(
    'Элемент 1',
    'Какое-то описание',
    new Date(),
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
      new Date().getHours(),
      new Date().getMinutes() + 1,
      0,
      0
    )
  ),
  new Element(
    'Элемент 2',
    'Какое-то описание',
    new Date(),
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
      new Date().getHours(),
      new Date().getMinutes() + 1,
      0,
      0
    )
  ),
  new Element(
    'Элемент 3',
    'Какое-то описание',
    new Date(),
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
      new Date().getHours(),
      new Date().getMinutes() + 1,
      0,
      0
    )
  ),
  new Element(
    'Элемент 4',
    'Какое-то описание',
    new Date(),
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
      new Date().getHours(),
      new Date().getMinutes() + 2,
      0,
      0
    )
  ),
  new Element(
    'Элемент 5',
    'Какое-то описание',
    new Date(),
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
      new Date().getHours(),
      new Date().getMinutes() + 2,
      0,
      0
    )
  ),
  new Element(
    'Элемент 6',
    'Какое-то описание',
    new Date(),
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
      new Date().getHours(),
      new Date().getMinutes() + 2,
      0,
      0
    )
  ),
  new Element(
    'Элемент 7',
    'Какое-то описание',
    new Date(),
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
      new Date().getHours(),
      new Date().getMinutes() + 3,
      0,
      0
    )
  ),
];
