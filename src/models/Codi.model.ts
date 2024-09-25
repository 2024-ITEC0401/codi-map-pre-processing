import { Category } from "../types";

interface Clothes {
  category: Category;
  baseColor: Color;
  pointColor: Color;
  season: Season;
  styles: Style;
  textile: Textile;
  pattern: Pattern;
}

interface Codi {
  name: string;
  clothes: Clothes[];
}

class CodiSchema implements Codi {}
