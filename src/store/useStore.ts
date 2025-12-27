import { create } from 'zustand';
import { Icon, Category, Message } from '../types';

interface StoreState {
  icons: Icon[];
  categories: Category[];
  messages: Message[];
  currentText: string;
  selectedCategory: string | null;
  
  // Actions
  addIcon: (icon: Icon) => void;
  updateIcon: (id: string, icon: Partial<Icon>) => void;
  deleteIcon: (id: string) => void;
  addCategory: (category: Category) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  addMessage: (text: string) => void;
  clearMessages: () => void;
  setCurrentText: (text: string) => void;
  appendToCurrentText: (text: string) => void;
  clearCurrentText: () => void;
  setSelectedCategory: (categoryId: string | null) => void;
  
  // Initialize with default data
  initialize: () => void;
}

const defaultCategories: Category[] = [
  { id: '1', name: 'People', color: '#FF6B6B', emoji: '👥' },
  { id: '2', name: 'Actions', color: '#4ECDC4', emoji: '🏃' },
  { id: '3', name: 'Food', color: '#FFE66D', emoji: '🍎' },
  { id: '4', name: 'Places', color: '#95E1D3', emoji: '🏠' },
  { id: '5', name: 'Feelings', color: '#F38181', emoji: '😊' },
  { id: '6', name: 'Common', color: '#AA96DA', emoji: '⭐' },
];

const defaultIcons: Icon[] = [
  // People
  { id: '1', label: 'Mom', emoji: '👩', category: '1', color: '#FF6B6B' },
  { id: '2', label: 'Dad', emoji: '👨', category: '1', color: '#FF6B6B' },
  { id: '3', label: 'Me', emoji: '👤', category: '1', color: '#FF6B6B' },
  { id: '4', label: 'Friend', emoji: '👫', category: '1', color: '#FF6B6B' },
  
  // Actions
  { id: '5', label: 'Play', emoji: '🎮', category: '2', color: '#4ECDC4' },
  { id: '6', label: 'Eat', emoji: '🍽️', category: '2', color: '#4ECDC4' },
  { id: '7', label: 'Sleep', emoji: '😴', category: '2', color: '#4ECDC4' },
  { id: '8', label: 'Go', emoji: '🚶', category: '2', color: '#4ECDC4' },
  
  // Food
  { id: '9', label: 'Apple', emoji: '🍎', category: '3', color: '#FFE66D' },
  { id: '10', label: 'Water', emoji: '💧', category: '3', color: '#FFE66D' },
  { id: '11', label: 'Bread', emoji: '🍞', category: '3', color: '#FFE66D' },
  { id: '12', label: 'Milk', emoji: '🥛', category: '3', color: '#FFE66D' },
  
  // Places
  { id: '13', label: 'Home', emoji: '🏠', category: '4', color: '#95E1D3' },
  { id: '14', label: 'School', emoji: '🏫', category: '4', color: '#95E1D3' },
  { id: '15', label: 'Park', emoji: '🌳', category: '4', color: '#95E1D3' },
  { id: '16', label: 'Bathroom', emoji: '🚽', category: '4', color: '#95E1D3' },
  
  // Feelings
  { id: '17', label: 'Happy', emoji: '😊', category: '5', color: '#F38181' },
  { id: '18', label: 'Sad', emoji: '😢', category: '5', color: '#F38181' },
  { id: '19', label: 'Tired', emoji: '😴', category: '5', color: '#F38181' },
  { id: '20', label: 'Hungry', emoji: '🤤', category: '5', color: '#F38181' },
  
  // Common
  { id: '21', label: 'Yes', emoji: '✅', category: '6', color: '#AA96DA' },
  { id: '22', label: 'No', emoji: '❌', category: '6', color: '#AA96DA' },
  { id: '23', label: 'Please', emoji: '🙏', category: '6', color: '#AA96DA' },
  { id: '24', label: 'Thank you', emoji: '🙂', category: '6', color: '#AA96DA' },
];

export const useStore = create<StoreState>((set, get) => ({
  icons: [],
  categories: [],
  messages: [],
  currentText: '',
  selectedCategory: null,

  initialize: () => {
    const storedIcons = localStorage.getItem('aac-icons');
    const storedCategories = localStorage.getItem('aac-categories');
    
    set({
      icons: storedIcons ? JSON.parse(storedIcons) : defaultIcons,
      categories: storedCategories ? JSON.parse(storedCategories) : defaultCategories,
    });
    
    // Save defaults if first time
    if (!storedIcons) {
      localStorage.setItem('aac-icons', JSON.stringify(defaultIcons));
    }
    if (!storedCategories) {
      localStorage.setItem('aac-categories', JSON.stringify(defaultCategories));
    }
  },

  addIcon: (icon) => {
    const newIcons = [...get().icons, icon];
    set({ icons: newIcons });
    localStorage.setItem('aac-icons', JSON.stringify(newIcons));
  },

  updateIcon: (id, updates) => {
    const newIcons = get().icons.map(icon => 
      icon.id === id ? { ...icon, ...updates } : icon
    );
    set({ icons: newIcons });
    localStorage.setItem('aac-icons', JSON.stringify(newIcons));
  },

  deleteIcon: (id) => {
    const newIcons = get().icons.filter(icon => icon.id !== id);
    set({ icons: newIcons });
    localStorage.setItem('aac-icons', JSON.stringify(newIcons));
  },

  addCategory: (category) => {
    const newCategories = [...get().categories, category];
    set({ categories: newCategories });
    localStorage.setItem('aac-categories', JSON.stringify(newCategories));
  },

  updateCategory: (id, updates) => {
    const newCategories = get().categories.map(cat => 
      cat.id === id ? { ...cat, ...updates } : cat
    );
    set({ categories: newCategories });
    localStorage.setItem('aac-categories', JSON.stringify(newCategories));
  },

  deleteCategory: (id) => {
    const newCategories = get().categories.filter(cat => cat.id !== id);
    const newIcons = get().icons.filter(icon => icon.category !== id);
    set({ categories: newCategories, icons: newIcons });
    localStorage.setItem('aac-categories', JSON.stringify(newCategories));
    localStorage.setItem('aac-icons', JSON.stringify(newIcons));
  },

  addMessage: (text) => {
    const message: Message = {
      id: Date.now().toString(),
      text,
      timestamp: Date.now(),
    };
    const newMessages = [message, ...get().messages].slice(0, 50); // Keep last 50
    set({ messages: newMessages });
  },

  clearMessages: () => set({ messages: [] }),

  setCurrentText: (text) => set({ currentText: text }),

  appendToCurrentText: (text) => {
    const current = get().currentText;
    set({ currentText: current ? `${current} ${text}` : text });
  },

  clearCurrentText: () => set({ currentText: '' }),

  setSelectedCategory: (categoryId) => set({ selectedCategory: categoryId }),
}));
