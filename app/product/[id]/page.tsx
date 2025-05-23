"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Heart, Star, Plus, Minus, Truck, Shield, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CartSidebar } from "@/components/cart-sidebar"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"

const products = [
  {
    id: 1,
    name: "Dog Mom T-Shirt",
    price: 24.99,
    originalPrice: 29.99,
    image: "/placeholder.svg?height=600&width=600",
    rating: 4.9,
    reviews: 127,
    colors: [
      { name: "Pink", value: "pink", hex: "#FFC0CB" },
      { name: "White", value: "white", hex: "#FFFFFF" },
      { name: "Lavender", value: "lavender", hex: "#E6E6FA" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    description:
      "Show your pride as a dog mom with this adorable, super-soft t-shirt! Made from 100% premium cotton, this tee is perfect for walks in the park, coffee runs, or just lounging at home with your furry best friend.",
    features: [
      "100% premium cotton for ultimate comfort",
      "Pre-shrunk for perfect fit wash after wash",
      "Cute paw print design that won't fade",
      "Relaxed fit that's flattering on everyone",
      "Machine washable for easy care",
    ],
  },
  {
    id: 2,
    name: "Dog Dad T-Shirt",
    price: 24.99,
    originalPrice: 29.99,
    image: "/placeholder.svg?height=600&width=600",
    rating: 4.8,
    reviews: 89,
    colors: [
      { name: "Navy", value: "navy", hex: "#000080" },
      { name: "Black", value: "black", hex: "#000000" },
      { name: "Gray", value: "gray", hex: "#808080" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
    description:
      "Celebrate being the best dog dad ever with this comfortable and stylish t-shirt! Perfect for the proud dog father who wants to show off his love for his four-legged family member.",
    features: [
      "100% premium cotton for all-day comfort",
      "Durable construction built to last",
      "Classic fit that looks great on everyone",
      "Fade-resistant printing technology",
      "Perfect for casual wear or dog park visits",
    ],
  },
  {
    id: 3,
    name: "Custom Fenn T-Shirt ⭐",
    price: 39.99,
    originalPrice: 49.99,
    image: "/placeholder.svg?height=600&width=600",
    rating: 5.0,
    reviews: 1,
    colors: [
      { name: "Golden", value: "golden", hex: "#FFD700" },
      { name: "Royal Blue", value: "royal-blue", hex: "#4169E1" },
      { name: "Forest Green", value: "forest-green", hex: "#228B22" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    description:
      "🌟 This is not just any t-shirt - this is FENN'S t-shirt! 🌟 Created exclusively for the most special, incredible, amazing dog in the universe - FENN! This premium custom tee celebrates everything that makes Fenn absolutely extraordinary. Because Fenn isn't just special... Fenn is LEGENDARY! ✨",
    features: [
      "🏆 Custom designed EXCLUSIVELY for Fenn (because Fenn deserves the best!)",
      "⭐ Premium organic cotton blend - only the finest for our special boy",
      "🎨 Hand-crafted design featuring Fenn's name in golden letters",
      "💎 Limited edition - there will only ever be ONE Fenn!",
      "🌟 Embroidered with love and extra care for the goodest boy",
      "✨ Comes with a personalized certificate of Fenn's specialness",
      "🐕 Paw-print authenticity seal (because Fenn is authentic perfection)",
    ],
    isSpecial: true,
    specialMessage: "Made with love for the most special dog in the world! 💖"
  },
]

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === Number.parseInt(params.id))
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.value || "")
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)

  const { addToCart } = useCart()
  const { toast } = useToast()

  if (!product) {
    return <div>Product not found</div>
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "You need to choose a size before adding to cart.",
        variant: "destructive",
      })
      return
    }

    const selectedColorName = product.colors.find((c) => c.value === selectedColor)?.name || selectedColor

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      color: selectedColorName,
      size: selectedSize,
      quantity: quantity,
    })

    toast({
      title: "Added to cart! 🐾",
      description: `${quantity}x ${product.name} (${selectedColorName}, ${selectedSize}) added to your cart.`,
    })
  }

  return (
    <div className={`min-h-screen ${product.isSpecial ? 'bg-gradient-to-b from-yellow-50 via-orange-50 to-amber-50' : 'bg-gradient-to-b from-orange-50 to-amber-50'}`}>
      {/* Header */}
      <header className={`shadow-sm border-b-2 ${product.isSpecial ? 'bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-300' : 'bg-white border-orange-200'}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${product.isSpecial ? 'bg-yellow-400' : 'bg-orange-400'}`}>
                <span className="text-2xl">{product.isSpecial ? '⭐' : '🐕'}</span>
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${product.isSpecial ? 'text-yellow-800' : 'text-orange-800'}`}>
                  {product.isSpecial ? 'Fenn\'s Special Store' : 'Pawsome Tees'}
                </h1>
                <p className={`text-sm ${product.isSpecial ? 'text-yellow-600' : 'text-orange-600'}`}>
                  {product.isSpecial ? 'For the most special dog in the world!' : 'For the ultimate dog parents'}
                </p>
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Heart className={`h-5 w-5 ${product.isSpecial ? 'text-yellow-600' : 'text-orange-600'}`} />
              </Button>
              <CartSidebar />
            </div>
          </div>
          {product.isSpecial && (
            <div className="text-center py-2">
              <p className="text-yellow-800 font-bold animate-pulse">✨ NOW FEATURING: FENN'S EXCLUSIVE COLLECTION ✨</p>
            </div>
          )}
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Link href="/" className={`inline-flex items-center hover:text-orange-800 mb-8 ${product.isSpecial ? 'text-yellow-600' : 'text-orange-600'}`}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Shop
        </Link>

        {product.isSpecial && (
          <div className="text-center mb-8 bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-lg border-4 border-yellow-400 shadow-lg">
            <h2 className="text-3xl font-bold text-yellow-800 mb-2">🎉 INTRODUCING FENN'S CUSTOM COLLECTION! 🎉</h2>
            <p className="text-yellow-700 text-lg">{product.specialMessage}</p>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={600}
                height={600}
                className="w-full rounded-lg shadow-lg"
              />
              <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600">
                Save ${(product.originalPrice - product.price).toFixed(2)}
              </Badge>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              <h1 className="text-3xl font-bold text-orange-800 mb-4">{product.name}</h1>

              <div className="flex items-center space-x-3 mb-6">
                <span className="text-3xl font-bold text-orange-600">${product.price}</span>
                <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                <Badge className="bg-green-100 text-green-800">Limited Time</Badge>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed mb-6">{product.description}</p>
            </div>

            {/* Color Selection */}
            <div>
              <Label className="text-base font-semibold text-orange-800 mb-3 block">
                Color: {product.colors.find((c) => c.value === selectedColor)?.name}
              </Label>
              <RadioGroup value={selectedColor} onValueChange={setSelectedColor} className="flex space-x-3">
                {product.colors.map((color) => (
                  <div key={color.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={color.value} id={color.value} className="sr-only" />
                    <Label
                      htmlFor={color.value}
                      className={`w-8 h-8 rounded-full border-2 cursor-pointer ${
                        selectedColor === color.value ? "border-orange-500 ring-2 ring-orange-200" : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color.hex }}
                    />
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Size Selection */}
            <div>
              <Label className="text-base font-semibold text-orange-800 mb-3 block">Size</Label>
              <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="grid grid-cols-6 gap-2">
                {product.sizes.map((size) => (
                  <div key={size}>
                    <RadioGroupItem value={size} id={size} className="sr-only" />
                    <Label
                      htmlFor={size}
                      className={`border-2 rounded-md px-3 py-2 text-center cursor-pointer transition-colors ${
                        selectedSize === size
                          ? "border-orange-500 bg-orange-50 text-orange-800"
                          : "border-gray-300 hover:border-orange-300"
                      }`}
                    >
                      {size}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Quantity */}
            <div>
              <Label className="text-base font-semibold text-orange-800 mb-3 block">Quantity</Label>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="border-orange-300"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  className="border-orange-300"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-3">
              <Button
                className={`w-full font-semibold py-4 text-lg text-white ${
                  product.isSpecial 
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 animate-pulse' 
                    : 'bg-orange-500 hover:bg-orange-600'
                }`}
                onClick={handleAddToCart}
                disabled={!selectedSize}
              >
                {product.isSpecial ? '⭐ Add Fenn\'s Special Tee to Cart ⭐' : 'Add to Cart'} - ${(product.price * quantity).toFixed(2)} 🛒
              </Button>
              <Button variant="outline" className={`w-full hover:bg-orange-50 ${product.isSpecial ? 'border-yellow-300 text-yellow-700' : 'border-orange-300 text-orange-700'}`}>
                <Heart className="h-4 w-4 mr-2" />
                Add to Wishlist
              </Button>
            </div>

            {/* Features */}
            <div className={`rounded-lg p-6 shadow-sm border ${product.isSpecial ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300' : 'bg-white border-orange-200'}`}>
              <h3 className={`text-lg font-semibold mb-4 ${product.isSpecial ? 'text-yellow-800' : 'text-orange-800'}`}>
                {product.isSpecial ? 'Why Fenn (and you!) Will Love This Special Tee ⭐' : 'Why You\'ll Love This Tee'}
              </h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className={`mt-1 ${product.isSpecial ? 'text-yellow-500' : 'text-orange-500'}`}>
                      {product.isSpecial ? '⭐' : '🐾'}
                    </span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              {product.isSpecial && (
                <div className="mt-4 p-3 bg-yellow-100 rounded-lg border border-yellow-300">
                  <p className="text-yellow-800 font-bold text-center">✨ Certificate of Fenn's Awesomeness included! ✨</p>
                </div>
              )}
            </div>

            {/* Shipping Info */}
            <div className="grid grid-cols-3 gap-4">
              <div className={`text-center p-4 rounded-lg shadow-sm border ${product.isSpecial ? 'bg-yellow-50 border-yellow-300' : 'bg-white border-orange-200'}`}>
                <Truck className={`h-6 w-6 mx-auto mb-2 ${product.isSpecial ? 'text-yellow-500' : 'text-orange-500'}`} />
                <p className={`text-sm font-medium ${product.isSpecial ? 'text-yellow-800' : 'text-orange-800'}`}>
                  {product.isSpecial ? 'VIP Shipping' : 'Free Shipping'}
                </p>
                <p className="text-xs text-gray-600">
                  {product.isSpecial ? 'Special delivery for Fenn!' : 'On all orders'}
                </p>
              </div>
              <div className={`text-center p-4 rounded-lg shadow-sm border ${product.isSpecial ? 'bg-yellow-50 border-yellow-300' : 'bg-white border-orange-200'}`}>
                <Shield className={`h-6 w-6 mx-auto mb-2 ${product.isSpecial ? 'text-yellow-500' : 'text-orange-500'}`} />
                <p className={`text-sm font-medium ${product.isSpecial ? 'text-yellow-800' : 'text-orange-800'}`}>
                  {product.isSpecial ? 'Fenn Guarantee' : '30-Day Guarantee'}
                </p>
                <p className="text-xs text-gray-600">
                  {product.isSpecial ? 'Made for the goodest boy' : 'Love it or return it'}
                </p>
              </div>
              <div className={`text-center p-4 rounded-lg shadow-sm border ${product.isSpecial ? 'bg-yellow-50 border-yellow-300' : 'bg-white border-orange-200'}`}>
                <RotateCcw className={`h-6 w-6 mx-auto mb-2 ${product.isSpecial ? 'text-yellow-500' : 'text-orange-500'}`} />
                <p className={`text-sm font-medium ${product.isSpecial ? 'text-yellow-800' : 'text-orange-800'}`}>
                  {product.isSpecial ? 'No Returns Needed' : 'Easy Returns'}
                </p>
                <p className="text-xs text-gray-600">
                  {product.isSpecial ? 'Perfect for Fenn!' : 'Hassle-free process'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}