import { ReactNode } from 'react'

export enum PopupPlacement {
  TOP = 'top',
  RIGHT = 'right',
  BOTTOM = 'bottom',
  LEFT = 'left'
}

export enum PopupType {
  HOVER = 'hover',
  CLICK = 'click'
}

export interface BasePopupMetadata {
  id: string
  placement: PopupPlacement
  type: PopupType
  isOpen: boolean
  triggerElement: HTMLElement | null
  tooltipElement: HTMLElement | null
}

export interface HoverPopupMetadata extends BasePopupMetadata {
  type: PopupType.HOVER
  openDelay: number
  closeDelay: number
  isHovering: boolean
}

export interface MultiDirectionPopupConfig {
  placement: PopupPlacement
  offset?: number
  openDelay?: number
  closeDelay?: number
  autoFlip?: boolean
  maxWidth?: number
  zIndex?: number
}

export interface MultiDirectionTooltipProps {
  // Content
  content: ReactNode
  children: ReactNode
  
  // Configuration
  placement?: PopupPlacement
  type?: PopupType
  offset?: number
  openDelay?: number
  closeDelay?: number
  autoFlip?: boolean
  maxWidth?: number
  zIndex?: number
  
  // Styling
  className?: string
  contentClassName?: string
  triggerClassName?: string
  
  // Callbacks
  onOpen?: (metadata: BasePopupMetadata) => void
  onClose?: (metadata: BasePopupMetadata) => void
  onPlacementChange?: (placement: PopupPlacement) => void
  
  // Accessibility
  'aria-label'?: string
  'aria-describedby'?: string
  
  // Behavior
  disabled?: boolean
  closeOnClickOutside?: boolean
  closeOnEscape?: boolean
}
