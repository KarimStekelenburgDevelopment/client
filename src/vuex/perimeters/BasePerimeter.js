// src/perimeters/BasePerimeter.js
import { Perimeter } from 'vue-kindergarten';
export default class BasePerimeter extends Perimeter {
  isAdmin() {
    return this.child && this.child.name === 'admin';
  }
}/**
 * Created by karimstekelenburg on 15/06/2017.
 */
