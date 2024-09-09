import { render, screen, fireEvent } from '@testing-library/react';
import RecordFilter from './RecordFilter';

const placeholder = 'Filter by artist, title, year, or genre';
const mockValue = 'test';

describe('RecordFilter', () => {
    it('should render the filter', () => {
        const onSearch = jest.fn();
        render(<RecordFilter onSearch={onSearch} />);
        const inputElement = screen.getByPlaceholderText(placeholder);
        expect(inputElement).toBeInTheDocument();
    });

    it('updates the input value when typing', () => {
        const onSearch = jest.fn();
        render(<RecordFilter onSearch={onSearch} />);
        const inputElement = screen.getByPlaceholderText(placeholder);
        fireEvent.change(inputElement, { target: { value: mockValue } });
        expect(inputElement).toHaveValue(mockValue);
    });

    it('calls the onSearch callback when typing', () => {
        const onSearch = jest.fn();
        render(<RecordFilter onSearch={onSearch} />);
        const inputElement = screen.getByPlaceholderText(placeholder);
        fireEvent.change(inputElement, { target: { value: mockValue } });
        expect(onSearch).toHaveBeenCalledWith(mockValue);
        expect(onSearch).toHaveBeenCalledTimes(1);
    });

    it('does not call the onSearch callback if the input is empty', () => {
        const onSearch = jest.fn();
        render(<RecordFilter onSearch={onSearch} />);
        const inputElement = screen.getByPlaceholderText(placeholder);
        fireEvent.change(inputElement, { target: { value: '' } });
        expect(onSearch).toHaveBeenCalledTimes(0);
    })
});
