import { useState } from "react";
import { MultiDirectionTooltip } from "./components/MultiDirectionTooltip";
import { PopupPlacement, PopupType } from "./types/tooltip";
import {
  Info,
  HelpCircle,
  Settings,
  Star,
  AlertCircle,
  X,
  Lock,
  Zap,
  Heart,
  Download,
  Upload,
  Trash2,
} from "lucide-react";
import { Button } from "./components/ui/button";

function App() {
  const [clickCount, setClickCount] = useState(0);
  const [hoverCount, setHoverCount] = useState(0);
  const [lastPlacement, setLastPlacement] = useState<PopupPlacement | null>(
    null
  );
  const [isDisabled, setIsDisabled] = useState(false);

  const handleOpen = (metadata: any) => {
    console.log("Tooltip opened:", metadata);
    if (metadata.type === PopupType.CLICK) {
      setClickCount((prev) => prev + 1);
    } else {
      setHoverCount((prev) => prev + 1);
    }
  };

  const handleClose = (metadata: any) => {
    console.log("Tooltip closed:", metadata);
  };

  const handlePlacementChange = (placement: PopupPlacement) => {
    console.log("Placement changed to:", placement);
    setLastPlacement(placement);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Multi-Direction Tooltip Demo
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Interactive sandbox demonstrating all features of the
            MultiDirectionTooltip component. Try hovering, clicking, and
            resizing the window to see automatic positioning in action.
          </p>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-8 mb-12">
          <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="text-2xl font-bold text-blue-600">{clickCount}</div>
            <div className="text-sm text-gray-600">Click Tooltips Opened</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="text-2xl font-bold text-green-600">
              {hoverCount}
            </div>
            <div className="text-sm text-gray-600">Hover Tooltips Opened</div>
          </div>
          {lastPlacement && (
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="text-2xl font-bold text-purple-600">
                {lastPlacement}
              </div>
              <div className="text-sm text-gray-600">Last Placement Change</div>
            </div>
          )}
        </div>

        {/* Control Panel */}
        <div className="bg-white rounded-lg p-6 shadow-lg mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Control Panel
          </h2>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isDisabled}
                onChange={(e) => setIsDisabled(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm text-gray-700">
                Disable All Tooltips
              </span>
            </label>
          </div>
        </div>

        {/* Basic Examples */}
        <div className="bg-white rounded-lg p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Basic Examples
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <MultiDirectionTooltip
              content="This is a simple hover tooltip"
              placement={PopupPlacement.TOP}
              type={PopupType.HOVER}
              disabled={isDisabled}
              onOpen={handleOpen}
              onClose={handleClose}
            >
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                <Info className="w-4 h-4" />
                Hover Me (Top)
              </button>
            </MultiDirectionTooltip>

            <MultiDirectionTooltip
              content="Click to toggle this tooltip"
              placement={PopupPlacement.BOTTOM}
              type={PopupType.CLICK}
              disabled={isDisabled}
              onOpen={handleOpen}
              onClose={handleClose}
            >
              <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
                <HelpCircle className="w-4 h-4" />
                Click Me (Bottom)
              </button>
            </MultiDirectionTooltip>

            <MultiDirectionTooltip
              content="This tooltip appears on the left"
              placement={PopupPlacement.LEFT}
              type={PopupType.HOVER}
              disabled={isDisabled}
              onOpen={handleOpen}
              onClose={handleClose}
            >
              <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors">
                <Settings className="w-4 h-4" />
                Hover Me (Left)
              </button>
            </MultiDirectionTooltip>

            <MultiDirectionTooltip
              content="This tooltip appears on the right"
              placement={PopupPlacement.RIGHT}
              type={PopupType.HOVER}
              disabled={isDisabled}
              onOpen={handleOpen}
              onClose={handleClose}
            >
              <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors">
                <Star className="w-4 h-4" />
                Hover Me (Right)
              </button>
            </MultiDirectionTooltip>
          </div>
        </div>

        {/* Rich Content Examples */}
        <div className="bg-white rounded-lg p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Rich Content Examples
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MultiDirectionTooltip
              content={
                <div className="space-y-2">
                  <div className="font-semibold text-blue-600">
                    Information Panel
                  </div>
                  <p className="text-sm text-gray-700">
                    This tooltip contains rich content with a title,
                    description, and even a close button. You can put any JSX
                    content here!
                  </p>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-xs text-gray-500">
                      Click outside to close
                    </span>
                    <button className="text-xs text-blue-500 hover:text-blue-700">
                      Learn More
                    </button>
                  </div>
                </div>
              }
              placement={PopupPlacement.TOP}
              type={PopupType.CLICK}
              maxWidth={280}
              disabled={isDisabled}
              onOpen={handleOpen}
              onClose={handleClose}
            >
              <button className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors">
                <AlertCircle className="w-4 h-4" />
                Rich Content Tooltip
              </button>
            </MultiDirectionTooltip>

            <MultiDirectionTooltip
              content={
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-green-600">Success!</h3>
                    <button className="text-gray-400 hover:text-gray-600">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-700">
                    This demonstrates a more complex tooltip with custom styling
                    and interactive elements.
                  </p>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600">
                      Accept
                    </button>
                    <button className="px-3 py-1 text-xs bg-gray-300 text-gray-700 rounded hover:bg-gray-400">
                      Decline
                    </button>
                  </div>
                </div>
              }
              placement={PopupPlacement.BOTTOM}
              type={PopupType.CLICK}
              maxWidth={300}
              disabled={isDisabled}
              onOpen={handleOpen}
              onClose={handleClose}
            >
              <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors">
                <Star className="w-4 h-4" />
                Interactive Tooltip
              </button>
            </MultiDirectionTooltip>
          </div>
        </div>

        {/* Advanced Configuration */}
        <div className="bg-white rounded-lg p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Advanced Configuration
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MultiDirectionTooltip
              content="This tooltip has a 500ms delay before opening"
              placement={PopupPlacement.TOP}
              type={PopupType.HOVER}
              openDelay={500}
              closeDelay={200}
              disabled={isDisabled}
              onOpen={handleOpen}
              onClose={handleClose}
            >
              <button className="w-full px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors">
                Delayed Hover (500ms)
              </button>
            </MultiDirectionTooltip>

            <MultiDirectionTooltip
              content="This tooltip has a larger offset from the trigger"
              placement={PopupPlacement.BOTTOM}
              type={PopupType.HOVER}
              offset={20}
              disabled={isDisabled}
              onOpen={handleOpen}
              onClose={handleClose}
            >
              <button className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
                Large Offset (20px)
              </button>
            </MultiDirectionTooltip>

            <MultiDirectionTooltip
              content="This tooltip has a custom max width and will wrap long text appropriately"
              placement={PopupPlacement.LEFT}
              type={PopupType.HOVER}
              maxWidth={150}
              disabled={isDisabled}
              onOpen={handleOpen}
              onClose={handleClose}
            >
              <button className="w-full px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors">
                Custom Width (150px)
              </button>
            </MultiDirectionTooltip>
          </div>
        </div>

        {/* shadcn/ui Integration */}
        <div className="bg-white rounded-lg p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            shadcn/ui Integration
          </h2>
          <div className="space-y-6">
            <p className="text-gray-600 text-center mb-6">
              Demonstrating the tooltip component with shadcn/ui components for
              consistent design.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <MultiDirectionTooltip
                content="This tooltip works seamlessly with shadcn/ui Button components"
                placement={PopupPlacement.TOP}
                type={PopupType.HOVER}
                disabled={isDisabled}
                onOpen={handleOpen}
                onClose={handleClose}
              >
                <Button variant="default" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </MultiDirectionTooltip>

              <MultiDirectionTooltip
                content="Different button variants work perfectly with tooltips"
                placement={PopupPlacement.BOTTOM}
                type={PopupType.HOVER}
                disabled={isDisabled}
                onOpen={handleOpen}
                onClose={handleClose}
              >
                <Button variant="outline" className="w-full">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </Button>
              </MultiDirectionTooltip>

              <MultiDirectionTooltip
                content="Even destructive variants are supported"
                placement={PopupPlacement.LEFT}
                type={PopupType.CLICK}
                disabled={isDisabled}
                onOpen={handleOpen}
                onClose={handleClose}
              >
                <Button variant="destructive" className="w-full">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </MultiDirectionTooltip>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MultiDirectionTooltip
                content="Large buttons work great too"
                placement={PopupPlacement.TOP}
                type={PopupType.HOVER}
                disabled={isDisabled}
                onOpen={handleOpen}
                onClose={handleClose}
              >
                <Button size="lg" variant="secondary" className="w-full">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </MultiDirectionTooltip>

              <MultiDirectionTooltip
                content="Small buttons are also supported"
                placement={PopupPlacement.BOTTOM}
                type={PopupType.HOVER}
                disabled={isDisabled}
                onOpen={handleOpen}
                onClose={handleClose}
              >
                <Button size="sm" variant="ghost" className="w-full">
                  <Info className="w-4 h-4 mr-2" />
                  Info
                </Button>
              </MultiDirectionTooltip>
            </div>
          </div>
        </div>

        {/* Edge Cases */}
        <div className="bg-white rounded-lg p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Edge Cases & Auto-Flipping
          </h2>
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Resize your browser window to see automatic placement flipping
                in action. Tooltips will automatically flip to avoid going
                off-screen.
              </p>
            </div>

            <div className="flex justify-between items-center">
              <MultiDirectionTooltip
                content="This tooltip will auto-flip to avoid going off the left edge"
                placement={PopupPlacement.LEFT}
                type={PopupType.HOVER}
                autoFlip={true}
                disabled={isDisabled}
                onOpen={handleOpen}
                onClose={handleClose}
                onPlacementChange={handlePlacementChange}
              >
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                  Left Edge Test
                </button>
              </MultiDirectionTooltip>

              <MultiDirectionTooltip
                content="This tooltip will auto-flip to avoid going off the right edge"
                placement={PopupPlacement.RIGHT}
                type={PopupType.HOVER}
                autoFlip={true}
                disabled={isDisabled}
                onOpen={handleOpen}
                onClose={handleClose}
                onPlacementChange={handlePlacementChange}
              >
                <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
                  Right Edge Test
                </button>
              </MultiDirectionTooltip>
            </div>

            <div className="flex justify-center">
              <MultiDirectionTooltip
                content="This tooltip will auto-flip to avoid going off the top edge"
                placement={PopupPlacement.TOP}
                type={PopupType.HOVER}
                autoFlip={true}
                disabled={isDisabled}
                onOpen={handleOpen}
                onClose={handleClose}
                onPlacementChange={handlePlacementChange}
              >
                <button className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors">
                  Top Edge Test
                </button>
              </MultiDirectionTooltip>
            </div>
          </div>
        </div>

        {/* Edge-of-Screen Positioning */}
        <div className="bg-white rounded-lg p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Edge-of-Screen Positioning
          </h2>
          <div className="space-y-6">
            <p className="text-gray-600 text-center mb-6">
              These tooltips are positioned at the edges to demonstrate
              automatic flipping behavior. Try resizing the window to see them
              flip to avoid going off-screen.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex justify-start">
                <MultiDirectionTooltip
                  content="This tooltip is positioned at the left edge and will flip right if needed"
                  placement={PopupPlacement.LEFT}
                  type={PopupType.HOVER}
                  autoFlip={true}
                  disabled={isDisabled}
                  onOpen={handleOpen}
                  onClose={handleClose}
                  onPlacementChange={handlePlacementChange}
                >
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                    <Lock className="w-4 h-4 inline mr-2" />
                    Left Edge
                  </button>
                </MultiDirectionTooltip>
              </div>

              <div className="flex justify-end">
                <MultiDirectionTooltip
                  content="This tooltip is positioned at the right edge and will flip left if needed"
                  placement={PopupPlacement.RIGHT}
                  type={PopupType.HOVER}
                  autoFlip={true}
                  disabled={isDisabled}
                  onOpen={handleOpen}
                  onClose={handleClose}
                  onPlacementChange={handlePlacementChange}
                >
                  <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
                    Right Edge
                    <Zap className="w-4 h-4 inline ml-2" />
                  </button>
                </MultiDirectionTooltip>
              </div>
            </div>

            <div className="flex justify-center">
              <MultiDirectionTooltip
                content="This tooltip is positioned at the top and will flip down if needed"
                placement={PopupPlacement.TOP}
                type={PopupType.HOVER}
                autoFlip={true}
                disabled={isDisabled}
                onOpen={handleOpen}
                onClose={handleClose}
                onPlacementChange={handlePlacementChange}
              >
                <button className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors">
                  <Heart className="w-4 h-4 inline mr-2" />
                  Top Edge
                </button>
              </MultiDirectionTooltip>
            </div>
          </div>
        </div>

        {/* Long Content */}
        <div className="bg-white rounded-lg p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Long Content Handling
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MultiDirectionTooltip
              content={
                <div>
                  <h4 className="font-semibold mb-2">
                    Very Long Tooltip Content
                  </h4>
                  <p className="text-sm leading-relaxed">
                    This tooltip contains a lot of text to demonstrate how the
                    component handles long content. The text will wrap
                    appropriately within the maxWidth constraint, and the
                    tooltip will automatically adjust its height. This is
                    particularly useful for displaying detailed information,
                    help text, or longer descriptions that don't fit in a single
                    line.
                  </p>
                  <div className="mt-3 pt-2 border-t border-gray-200">
                    <span className="text-xs text-gray-500">
                      The component automatically handles text wrapping and
                      positioning.
                    </span>
                  </div>
                </div>
              }
              placement={PopupPlacement.BOTTOM}
              type={PopupType.CLICK}
              maxWidth={250}
              disabled={isDisabled}
              onOpen={handleOpen}
              onClose={handleClose}
            >
              <button className="w-full px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors">
                Long Content Tooltip
              </button>
            </MultiDirectionTooltip>

            <MultiDirectionTooltip
              content={
                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-600">
                    Multi-line Content
                  </h4>
                  <p className="text-sm">
                    Line 1: This demonstrates multiple lines of content
                  </p>
                  <p className="text-sm">
                    Line 2: Each line can have different styling
                  </p>
                  <p className="text-sm">
                    Line 3: And the tooltip will expand accordingly
                  </p>
                  <div className="flex gap-2 pt-2">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      Tag 1
                    </span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      Tag 2
                    </span>
                  </div>
                </div>
              }
              placement={PopupPlacement.TOP}
              type={PopupType.HOVER}
              maxWidth={200}
              disabled={isDisabled}
              onOpen={handleOpen}
              onClose={handleClose}
            >
              <button className="w-full px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors">
                Multi-line Tooltip
              </button>
            </MultiDirectionTooltip>
          </div>
        </div>

        {/* Callback Demonstrations */}
        <div className="bg-white rounded-lg p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Callback Demonstrations
          </h2>
          <div className="space-y-4">
            <p className="text-gray-600 text-center mb-6">
              These tooltips demonstrate various callback functions. Check the
              console for detailed logs.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <MultiDirectionTooltip
                content="This tooltip logs all events to console"
                placement={PopupPlacement.TOP}
                type={PopupType.CLICK}
                disabled={isDisabled}
                onOpen={(metadata) => {
                  console.log("🔓 Tooltip opened:", metadata);
                  handleOpen(metadata);
                }}
                onClose={(metadata) => {
                  console.log("🔒 Tooltip closed:", metadata);
                  handleClose(metadata);
                }}
                onPlacementChange={(placement) => {
                  console.log("🔄 Placement changed to:", placement);
                  handlePlacementChange(placement);
                }}
              >
                <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                  Full Callbacks
                </button>
              </MultiDirectionTooltip>

              <MultiDirectionTooltip
                content="This tooltip has custom open/close behavior"
                placement={PopupPlacement.BOTTOM}
                type={PopupType.HOVER}
                disabled={isDisabled}
                openDelay={300}
                closeDelay={100}
                onOpen={(metadata) => {
                  console.log("🎯 Hover tooltip opened with delay");
                  handleOpen(metadata);
                }}
                onClose={(metadata) => {
                  console.log("⏰ Hover tooltip closed with delay");
                  handleClose(metadata);
                }}
              >
                <button className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
                  Delayed Callbacks
                </button>
              </MultiDirectionTooltip>

              <MultiDirectionTooltip
                content="This tooltip tracks placement changes"
                placement={PopupPlacement.LEFT}
                type={PopupType.HOVER}
                autoFlip={true}
                disabled={isDisabled}
                onPlacementChange={(placement) => {
                  console.log("📍 New placement:", placement);
                  setLastPlacement(placement);
                }}
              >
                <button className="w-full px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors">
                  Placement Tracking
                </button>
              </MultiDirectionTooltip>
            </div>
          </div>
        </div>

        {/* Accessibility Demo */}
        <div className="bg-white rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Accessibility Features
          </h2>
          <div className="space-y-4">
            <p className="text-gray-600 text-center mb-6">
              This component includes full accessibility support. Try using Tab
              to navigate and Enter/Space to activate.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <MultiDirectionTooltip
                content="This tooltip is accessible via keyboard navigation"
                placement={PopupPlacement.TOP}
                type={PopupType.CLICK}
                disabled={isDisabled}
                aria-label="Accessible tooltip trigger"
                onOpen={handleOpen}
                onClose={handleClose}
              >
                <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors focus:ring-2 focus:ring-blue-300 focus:outline-none">
                  Tab to Focus
                </button>
              </MultiDirectionTooltip>

              <MultiDirectionTooltip
                content="This tooltip has custom ARIA attributes"
                placement={PopupPlacement.BOTTOM}
                type={PopupType.CLICK}
                disabled={isDisabled}
                aria-label="Custom ARIA tooltip"
                aria-describedby="custom-description"
                onOpen={handleOpen}
                onClose={handleClose}
              >
                <button className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors focus:ring-2 focus:ring-green-300 focus:outline-none">
                  Custom ARIA
                </button>
              </MultiDirectionTooltip>

              <MultiDirectionTooltip
                content="This tooltip supports Escape key to close"
                placement={PopupPlacement.LEFT}
                type={PopupType.CLICK}
                disabled={isDisabled}
                closeOnEscape={true}
                onOpen={handleOpen}
                onClose={handleClose}
              >
                <button className="w-full px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors focus:ring-2 focus:ring-purple-300 focus:outline-none">
                  Escape to Close
                </button>
              </MultiDirectionTooltip>
            </div>

            <div id="custom-description" className="sr-only">
              This is a custom description for screen readers
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
