/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F4F5F7',
        board: '#F1F2F4',
        column: '#F8F9FA',
        card: '#FFFFFF',
        'primary-action': '#4F46E5',
        'label-feature': '#6366F1',
        'label-bug': '#EF4444',
        'label-issue': '#F97316',
        'label-undefined': '#9CA3AF',
        'priority-high': '#EF4444',
        'priority-medium': '#F59E0B',
        'priority-low': '#10B981'
      },
      fontFamily: {
        sans: ['Inter', 'DM Sans', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
