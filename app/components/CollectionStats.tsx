export type Props = {
  filteredCount: number;
  count: number;
  min: string;
  med: string;
  max: string;
}

export default function CollectionStats({ filteredCount, count, min, med, max }: Props) {
  return (
    <div className="pt-2">
      <div className="p-2">
        <kbd className="mr-2 px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
          💽 Rec: {filteredCount} / {count}
        </kbd>
      </div>
      <div className="p-2">
        <kbd className="mr-2 px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
          💸 Min: {min}
        </kbd>
        <kbd className="mr-2 px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
          💰 Avg: {med}
        </kbd>
        <kbd className="mr-2 px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
          🤑 Max: {max}
        </kbd>
      </div>
    </div>
  )
}