import {
  MealInfoType,
  ProductType,
  ProductWithWeightType,
} from "./productTypes";
import { userInfo } from "./userTypes";

export interface RootState {
  mealInfo: MealInfoState;
  productInfo: ProductType;
  modal: ModalState;
  user: UserState;
}

interface UserState {
  userInfo: userInfo;
}

interface ModalState {
  categoriesModal: boolean;
  productsModal: boolean;
  searchModal: boolean;
  searchInput: string;
  prodInfoModal: boolean;
}
export interface MealInfoState {
  mealProducts: ProductWithWeightType[];
  mealInfo: MealInfoType;
  portion: number;
}
