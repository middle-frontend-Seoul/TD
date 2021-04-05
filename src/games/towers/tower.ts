import { GameError } from '../game-error';
import { loadingImage } from '../helpers';

export abstract class Tower {
  abstract name: string;

  abstract price: number;

  abstract pathImage: string;

  abstract radius: number;

  abstract color: string;

  protected size;

  protected element?: HTMLDivElement;

  image?: HTMLImageElement;

  constructor(size: number) {
    this.size = size;
  }

  init = async (): Promise<void> => {
    await this.loadingImage();
    this.createElemen();
  };

  private createElemen = () => {
    if (!this.image) {
      throw new GameError('Требуется загризть изображение');
    }

    const elm = document.createElement('div');
    elm.classList.add('tower');
    elm.appendChild(this.image);

    const title = document.createElement('span');
    title.classList.add('tower__title');
    title.innerText = this.name;
    elm.appendChild(title);

    const price = document.createElement('span');
    price.classList.add('tower__price');
    price.innerText = String(this.price);
    elm.appendChild(price);

    this.element = elm;
  };

  private loadingImage = async () => {
    try {
      this.image = await loadingImage(this.pathImage);
      this.image.classList.add('tower__image');
    } catch (err) {
      throw new GameError(`Ошибка загрузки изображения ${this.pathImage}`, err);
    }
  };

  getElement = (): HTMLDivElement | undefined => {
    return this.element;
  };
}
