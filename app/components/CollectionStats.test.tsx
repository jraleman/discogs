import { render, screen } from '@testing-library/react';
import CollectionStats from './CollectionStats';

const filteredCount = 100;
const count = 1000;
const min = '100';
const med = '200';
const max = '300';

describe('CollectionStats', () => {
    it('should render the stats', () => {
        render(<CollectionStats filteredCount={filteredCount} count={count} min={min} med={med} max={max} />);
        expect(screen.getByText(`💽 Rec: ${filteredCount} / ${count}`)).toBeInTheDocument();
        expect(screen.getByText(`💸 Min: ${min}`)).toBeInTheDocument();
        expect(screen.getByText(`💰 Avg: ${med}`)).toBeInTheDocument();
        expect(screen.getByText(`🤑 Max: ${max}`)).toBeInTheDocument();
    });
})
