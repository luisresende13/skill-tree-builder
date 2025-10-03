import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it('renders the header with the correct title and domain', () => {
    const domain = 'Software Engineering';
    render(<Header domain={domain} />);

    expect(screen.getByText('Skill Tree Builder')).toBeInTheDocument();
    expect(screen.getByText(`Domain: ${domain}`)).toBeInTheDocument();
  });
});
