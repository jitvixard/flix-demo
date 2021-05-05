import { AbstractItem } from '../model/items/abstract-item';
import { Apple } from '../model/items/impl/apple';
import { Banana } from '../model/items/impl/banana';
import { Bread } from '../model/items/impl/bread';
import { Carrot } from '../model/items/impl/carrot';
import { Orange } from '../model/items/impl/orange';
import { Pear } from '../model/items/impl/pear';
import { removeElement } from './utility';

export function createHotBarItem(item: AbstractItem) {
  if (item.contentRef) removeElement(item.contentRef);

  const hotBarContent = document.createElement('div');
  hotBarContent.className = 'hotbar-content';

  const iconImg = document.createElement('img');
  iconImg.setAttribute('src', item.getPath());
  iconImg.style.opacity = (0).toString();

  const amountText = document.createElement('p');
  amountText.innerText = item.amount.toString();

  hotBarContent.appendChild(iconImg);
  hotBarContent.appendChild(amountText);

  item.contentRef = hotBarContent;
  item.iconRef = iconImg;
  item.textRef = amountText;
}

export function updateHotBarText(item: AbstractItem) {
  item.textRef.innerText = item.amount.toString();
}

export function createToast(item: AbstractItem): AbstractItem {
  //create toast element and set opacity
  let toast = document.createElement('div');
  toast.className = 'popup-toast';
  toast.style.opacity = (0).toString();

  //create content
  let content = document.createElement('div');
  content.classList.add('item', item.id);

  //create image
  let image = document.createElement('img');
  image.setAttribute('src', item.getPath());

  //set text
  let text = document.createElement('p');
  text.innerText = item.amount + ' x ' + item.displayName + ' Added';

  //append elements to pop-up
  content.appendChild(image);
  content.appendChild(text);

  //set content
  toast.appendChild(content);

  //setting to model
  item.popupRef = toast;

  return item;
}

export function getItemFromName(name: string): AbstractItem {
  switch (name.toLowerCase()) {
    case 'apple': {
      return new Apple(1);
    }
    case 'banana': {
      return new Banana(1);
    }
    case 'bread': {
      return new Bread(1);
    }
    case 'carrot': {
      return new Carrot(1);
    }
    case 'orange': {
      return new Orange(1);
    }
    case 'pear': {
      return new Pear(1);
    }
  }
}
