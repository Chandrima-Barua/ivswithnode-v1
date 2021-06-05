import { render, screen } from '@testing-library/react';
import Channel from './Channel';

test('renders learn react link', () => {
  render(<Channel />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
