export interface Icon {
  id: string;
  label: string;
  emoji?: string;
  imageUrl?: string;
  category: string;
  color?: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  emoji?: string;
}

export interface Message {
  id: string;
  text: string;
  timestamp: number;
}

export interface AppState {
  icons: Icon[];
  categories: Category[];
  messages: Message[];
  currentText: string;
  selectedCategory: string | null;
}
