export function AssetFormSkeleton() {
  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-gradient-to-br from-card via-card to-card border border-border/50 rounded-lg shadow-xl space-y-8 animate-fadeIn">
      {/* Upload Section Skeleton */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 bg-muted rounded animate-pulse" />
          <div className="h-6 w-32 bg-muted rounded animate-pulse" />
        </div>
        <div className="border-2 border-dashed border-border rounded-xl p-12 shimmer h-48" />
      </div>

      {/* Settings Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* Color Picker Skeleton */}
        <div className="space-y-3">
          <div className="h-4 w-24 bg-muted rounded animate-pulse" />
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-muted rounded-lg animate-pulse" />
            <div className="h-4 w-20 bg-muted rounded animate-pulse" />
          </div>
        </div>

        {/* App Name Skeleton */}
        <div className="space-y-3">
          <div className="h-4 w-24 bg-muted rounded animate-pulse" />
          <div className="h-10 bg-muted rounded animate-pulse" />
        </div>
      </div>

      {/* Checkbox Skeleton */}
      <div className="flex items-center gap-3 p-4 bg-secondary/30 rounded-lg border border-border">
        <div className="h-5 w-5 bg-muted rounded animate-pulse" />
        <div className="h-4 w-48 bg-muted rounded animate-pulse" />
      </div>

      {/* Button Skeleton */}
      <div className="h-12 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg shimmer" />
    </div>
  );
}
