import { render, screen } from '@testing-library/react';
import App from './App';

test('renders event finder header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Seattle Eastside Event Finder/i);
  expect(headerElement).toBeInTheDocument();
});

test('displays events', () => {
  render(<App />);
  const eventElement = screen.getByText(/Seattle Tech Meetup/i);
  expect(eventElement).toBeInTheDocument();
});