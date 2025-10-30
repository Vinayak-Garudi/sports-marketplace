"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import EquipmentCard from "./EquipmentCard";
import { TennisEquipment } from "@/types";
import { loadMoreEquipment } from "@/app/browse/actions";

interface EquipmentListProps {
  initialEquipment: TennisEquipment[];
  filters: {
    category?: string;
    condition?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
  };
  initialHasMore: boolean;
  isAdmin?: boolean;
}

export default function EquipmentList({
  initialEquipment,
  filters,
  initialHasMore,
  isAdmin = false,
}: EquipmentListProps) {
  const [equipment, setEquipment] =
    useState<TennisEquipment[]>(initialEquipment);
  const [startPage, setStartPage] = useState(1); // First page in current window
  const [endPage, setEndPage] = useState(1); // Last page in current window
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [isLoadingBottom, setIsLoadingBottom] = useState(false);
  const [isLoadingTop, setIsLoadingTop] = useState(false);
  const topObserverRef = useRef<IntersectionObserver | null>(null);
  const bottomObserverRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const loadPreviousRef = useRef<HTMLDivElement>(null);

  // Reset when filters change
  useEffect(() => {
    setEquipment(initialEquipment);
    setStartPage(1);
    setEndPage(1);
    setHasMore(initialHasMore);
    setHasPrevious(false);
  }, [initialEquipment, initialHasMore]);

  const loadMore = useCallback(async () => {
    if (isLoadingBottom || !hasMore) return;

    setIsLoadingBottom(true);
    try {
      const nextPage = endPage + 1;
      const result = await loadMoreEquipment(filters, nextPage);

      setEquipment((prev) => [...prev, ...result.items]);
      setEndPage(nextPage);
      setHasMore(result.hasMore);

      // Enable loading previous items once we've loaded beyond page 1
      if (startPage === 1 && nextPage > 1) {
        setHasPrevious(true);
      }
    } catch (error) {
      console.error("Error loading more equipment:", error);
    } finally {
      setIsLoadingBottom(false);
    }
  }, [endPage, hasMore, isLoadingBottom, filters, startPage]);

  const loadPrevious = useCallback(async () => {
    if (isLoadingTop || !hasPrevious || startPage <= 1) return;

    setIsLoadingTop(true);
    try {
      const previousPage = startPage - 1;
      const result = await loadMoreEquipment(filters, previousPage);

      setEquipment((prev) => [...result.items, ...prev]);
      setStartPage(previousPage);
      setHasPrevious(previousPage > 1);
    } catch (error) {
      console.error("Error loading previous equipment:", error);
    } finally {
      setIsLoadingTop(false);
    }
  }, [startPage, hasPrevious, isLoadingTop, filters]);

  // Bottom observer for loading more
  useEffect(() => {
    if (bottomObserverRef.current) {
      bottomObserverRef.current.disconnect();
    }

    bottomObserverRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingBottom) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      bottomObserverRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (bottomObserverRef.current) {
        bottomObserverRef.current.disconnect();
      }
    };
  }, [loadMore, hasMore, isLoadingBottom]);

  // Top observer for loading previous
  useEffect(() => {
    if (topObserverRef.current) {
      topObserverRef.current.disconnect();
    }

    topObserverRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasPrevious && !isLoadingTop) {
          loadPrevious();
        }
      },
      { threshold: 0.1 }
    );

    if (loadPreviousRef.current) {
      topObserverRef.current.observe(loadPreviousRef.current);
    }

    return () => {
      if (topObserverRef.current) {
        topObserverRef.current.disconnect();
      }
    };
  }, [loadPrevious, hasPrevious, isLoadingTop]);

  return (
    <>
      {/* Load Previous Trigger */}
      {hasPrevious && (
        <div ref={loadPreviousRef} className="py-8 text-center">
          {isLoadingTop && (
            <div className="flex items-center justify-center gap-2">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span className="text-muted-foreground">
                Loading previous equipment...
              </span>
            </div>
          )}
        </div>
      )}

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {equipment.map((item) => (
          <EquipmentCard key={item._id} equipment={item} isAdmin={isAdmin} />
        ))}
      </div>

      {/* Load More Trigger */}
      {hasMore && (
        <div ref={loadMoreRef} className="py-8 text-center">
          {isLoadingBottom && (
            <div className="flex items-center justify-center gap-2">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span className="text-muted-foreground">
                Loading more equipment...
              </span>
            </div>
          )}
        </div>
      )}

      {!hasMore && equipment.length > 0 && (
        <div className="py-8 text-center text-muted-foreground">
          No more equipment to load
        </div>
      )}
    </>
  );
}
