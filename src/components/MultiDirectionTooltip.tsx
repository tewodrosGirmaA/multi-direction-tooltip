import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  useId,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";
import {
  type MultiDirectionTooltipProps,
  type BasePopupMetadata,
  PopupPlacement,
  PopupType,
} from "../types/tooltip";

export const MultiDirectionTooltip: React.FC<MultiDirectionTooltipProps> = ({
  content,
  children,
  placement = PopupPlacement.TOP,
  type = PopupType.HOVER,
  offset = 8,
  openDelay = 0,
  closeDelay = 0,
  autoFlip = true,
  maxWidth = 300,
  zIndex = 1000,
  className,
  contentClassName,
  triggerClassName,
  onOpen,
  onClose,
  onPlacementChange,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
  disabled = false,
  closeOnClickOutside = true,
  closeOnEscape = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPlacement, setCurrentPlacement] = useState(placement);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const id = useId();

  // Memoized metadata for callbacks
  const metadata = useMemo<BasePopupMetadata>(
    () => ({
      id,
      placement: currentPlacement,
      type,
      isOpen,
      triggerElement: triggerRef.current,
      tooltipElement: tooltipRef.current,
    }),
    [id, currentPlacement, type, isOpen]
  );

  // Calculate optimal placement considering viewport constraints
  const calculatePlacement = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current || !autoFlip) {
      return currentPlacement;
    }

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const placements = [
      PopupPlacement.TOP,
      PopupPlacement.BOTTOM,
      PopupPlacement.LEFT,
      PopupPlacement.RIGHT,
    ];
    let bestPlacement = currentPlacement;

    for (const placementOption of placements) {
      const { x, y } = calculatePosition(
        placementOption,
        triggerRect,
        tooltipRect,
        offset
      );

      if (
        x >= 0 &&
        x + tooltipRect.width <= viewport.width &&
        y >= 0 &&
        y + tooltipRect.height <= viewport.height
      ) {
        bestPlacement = placementOption;
        break;
      }
    }

    return bestPlacement;
  }, [currentPlacement, autoFlip, offset]);

  // Calculate position for a given placement
  const calculatePosition = useCallback(
    (
      placementOption: PopupPlacement,
      triggerRect: DOMRect,
      tooltipRect: DOMRect,
      offsetValue: number
    ) => {
      let x = 0;
      let y = 0;

      switch (placementOption) {
        case PopupPlacement.TOP:
          x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
          y = triggerRect.top - tooltipRect.height - offsetValue;
          break;
        case PopupPlacement.BOTTOM:
          x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
          y = triggerRect.bottom + offsetValue;
          break;
        case PopupPlacement.LEFT:
          x = triggerRect.left - tooltipRect.width - offsetValue;
          y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
          break;
        case PopupPlacement.RIGHT:
          x = triggerRect.right + offsetValue;
          y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
          break;
      }

      return { x, y };
    },
    []
  );

  // Update position and placement
  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const newPlacement = calculatePlacement();
    if (newPlacement !== currentPlacement) {
      setCurrentPlacement(newPlacement);
      onPlacementChange?.(newPlacement);
    }

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const { x, y } = calculatePosition(
      newPlacement,
      triggerRect,
      tooltipRect,
      offset
    );

    setPosition({ x, y });
  }, [
    calculatePlacement,
    currentPlacement,
    offset,
    onPlacementChange,
    calculatePosition,
  ]);

  // Handle open/close with delays
  const handleOpen = useCallback(() => {
    if (disabled) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsOpen(true);
      onOpen?.(metadata);
    }, openDelay);
  }, [disabled, openDelay, onOpen, metadata]);

  const handleClose = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      onClose?.(metadata);
    }, closeDelay);
  }, [closeDelay, onClose, metadata]);

  // Event handlers
  const handleMouseEnter = useCallback(() => {
    if (type === PopupType.HOVER) {
      handleOpen();
    }
  }, [type, handleOpen]);

  const handleMouseLeave = useCallback(() => {
    if (type === PopupType.HOVER) {
      handleClose();
    }
  }, [type, handleClose]);

  const handleClick = useCallback(() => {
    if (type === PopupType.CLICK) {
      setIsOpen(!isOpen);
      if (!isOpen) {
        onOpen?.(metadata);
      } else {
        onClose?.(metadata);
      }
    }
  }, [type, isOpen, onOpen, onClose, metadata]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Escape" && closeOnEscape) {
        setIsOpen(false);
        onClose?.(metadata);
      }
    },
    [closeOnEscape, onClose, metadata]
  );

  // Click outside handler
  useEffect(() => {
    if (!closeOnClickOutside || type !== PopupType.CLICK) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        onClose?.(metadata);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeOnClickOutside, type, onClose, metadata]);

  // Update position on scroll/resize
  useEffect(() => {
    if (!isOpen) return;

    const handleUpdate = () => {
      updatePosition();
    };

    window.addEventListener("scroll", handleUpdate, true);
    window.addEventListener("resize", handleUpdate);

    return () => {
      window.removeEventListener("scroll", handleUpdate, true);
      window.removeEventListener("resize", handleUpdate);
    };
  }, [isOpen, updatePosition]);

  // Update position when tooltip opens
  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure DOM is updated
      const timer = setTimeout(updatePosition, 0);
      return () => clearTimeout(timer);
    }
  }, [isOpen, updatePosition]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Animation variants
  const animationVariants = {
    [PopupPlacement.TOP]: {
      initial: { opacity: 0, y: 10, scale: 0.95 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, y: 10, scale: 0.95 },
    },
    [PopupPlacement.BOTTOM]: {
      initial: { opacity: 0, y: -10, scale: 0.95 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, y: -10, scale: 0.95 },
    },
    [PopupPlacement.LEFT]: {
      initial: { opacity: 0, x: 10, scale: 0.95 },
      animate: { opacity: 1, x: 0, scale: 1 },
      exit: { opacity: 0, x: 10, scale: 0.95 },
    },
    [PopupPlacement.RIGHT]: {
      initial: { opacity: 0, x: -10, scale: 0.95 },
      animate: { opacity: 1, x: 0, scale: 1 },
      exit: { opacity: 0, x: -10, scale: 0.95 },
    },
  };

  const currentAnimation = animationVariants[currentPlacement];

  return (
    <div className={cn("relative inline-block", className)}>
      {/* Trigger */}
      <div
        ref={triggerRef}
        className={cn("inline-block cursor-pointer", triggerClassName)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        aria-expanded={type === PopupType.CLICK ? isOpen : undefined}
        aria-haspopup={type === PopupType.CLICK ? "dialog" : undefined}
      >
        {children}
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={tooltipRef}
            id={id}
            role="tooltip"
            aria-hidden="false"
            className={cn(
              "fixed z-[1000] pointer-events-none",
              contentClassName
            )}
            style={{
              left: position.x,
              top: position.y,
              maxWidth: maxWidth,
              zIndex: zIndex,
            }}
            initial={currentAnimation.initial}
            animate={currentAnimation.animate}
            exit={currentAnimation.exit}
            transition={{
              duration: 0.15,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            <div
              className={cn(
                "bg-popover text-popover-foreground px-3 py-2 text-sm rounded-md border shadow-md",
                "pointer-events-auto"
              )}
              style={{
                maxWidth: maxWidth,
              }}
            >
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
