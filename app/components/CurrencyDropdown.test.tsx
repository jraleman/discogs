import { render, screen } from '@testing-library/react';
import CurrencyDropdown from './CurrencyDropdown';

describe('CurrencyDropdown', () => {
    it('should render the dropdown', () => {
        const onCurrencyChange = jest.fn();
        render(<CurrencyDropdown onCurrencyChange={onCurrencyChange} />);
        const dropdownElement = screen.getByRole('combobox');
        expect(dropdownElement).toBeInTheDocument();
    });
});