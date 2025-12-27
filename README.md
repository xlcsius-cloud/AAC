# AAC Application

A multi-platform Augmentative and Alternative Communication (AAC) application designed for non-verbal children. This application provides an easy-to-use interface for communication through icons and keyboard input.

## Features

### User Interface
- **Icons-based Communication**: Large, colorful icons organized by categories (People, Actions, Food, Places, Feelings, Common words)
- **Keyboard-based Spelling**: Full QWERTY keyboard with quick word buttons for fast communication
- **Text-to-Speech**: Built-in speech synthesis to vocalize messages
- **Message History**: Keep track of recent messages for easy access
- **Category Filtering**: Filter icons by category for easier navigation

### Admin Interface
- **Icon Management**: Add, edit, and delete icons with custom labels and emojis
- **Category Management**: Create and customize categories with colors and emojis
- **Persistent Storage**: All customizations are saved to browser localStorage

## Technology Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **React Router** for navigation
- **Zustand** for state management
- **Web Speech API** for text-to-speech functionality

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory:
```bash
cd AAC
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in the terminal)

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory. You can serve these files using any static file server.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## Usage

### User Mode

1. Click "User Mode" on the home page
2. Choose between Icons or Keyboard interface
3. **Icons View**: Click on icons to build your message, then click "Send" or "Speak" to communicate
4. **Keyboard View**: Type your message using the on-screen keyboard, use quick word buttons, or click "Send"

### Admin Mode

1. Click "Admin Mode" on the home page
2. **Manage Icons**: Add new icons with labels and emojis, organize them into categories
3. **Manage Categories**: Create custom categories with colors and emojis
4. Changes are automatically saved and will be available in User Mode

## Multi-platform Support

This application runs in any modern web browser, making it accessible on:
- **Desktop**: Windows, macOS, Linux
- **Tablets**: iPad, Android tablets
- **Mobile**: iOS, Android phones
- Can be installed as a Progressive Web App (PWA) for offline access

## Design Principles

- **Ease of Use**: Large buttons, clear labels, intuitive navigation
- **Child-Friendly**: Colorful design with emojis and visual cues
- **Accessibility**: High contrast, large touch targets, keyboard navigation support
- **Responsive**: Works on screens of all sizes

## Default Categories and Icons

The application comes with pre-loaded categories and icons:
- **People**: Mom, Dad, Me, Friend
- **Actions**: Play, Eat, Sleep, Go
- **Food**: Apple, Water, Bread, Milk
- **Places**: Home, School, Park, Bathroom
- **Feelings**: Happy, Sad, Tired, Hungry
- **Common**: Yes, No, Please, Thank you

All of these can be customized or replaced through the Admin interface.

## Browser Support

This application requires a modern browser with support for:
- ES6+ JavaScript
- CSS Grid and Flexbox
- Web Speech API (for text-to-speech)
- LocalStorage (for data persistence)

Recommended browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Contributing

This project is designed to be free and open for use by SEN (Special Educational Needs) children. Contributions and improvements are welcome!

## License

This project is intended for free use by SEN children and their families.

## Support

For issues or questions, please check the documentation or create an issue in the project repository.