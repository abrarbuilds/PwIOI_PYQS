interface CatalogEmptyStateProps {
  onClear: () => void
}

export function CatalogEmptyState({ onClear }: CatalogEmptyStateProps) {
  return <div className="empty">
    <h2>No matching papers yet</h2>
    <p>Try clearing a filter or searching for a different subject.</p>
    <button className="button secondary" onClick={onClear}>Clear filters</button>
  </div>
}
