"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, Star, Truck, Shield, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CartSidebar } from "@/components/cart-sidebar"
import { useCart } from "@/contexts/cart-context"

const products = [
  {
    id: 1,
    name: "Dog Mom T-Shirt",
    price: 24.99,
    originalPrice: 29.99,
    image: "/placeholder.svg?height=400&width=400",
    rating: 4.9,
    reviews: 127,
    colors: ["Pink", "White", "Lavender"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  },
  {
    id: 2,
    name: "Dog Dad T-Shirt",
    price: 24.99,
    originalPrice: 29.99,
    image: "/placeholder.svg?height=400&width=400",
    rating: 4.8,
    reviews: 89,
    colors: ["Navy", "Black", "Gray"],
    sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
  },
]

export default function HomePage() {
  const { addToCart } = useCart()

  const handleQuickAdd = (product) => {
    // Add with default color and size for quick add
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      color: product.colors[0],
      size: product.sizes[2], // Default to medium-ish size
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-2 border-orange-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center">
                <span className="text-2xl">🐕</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-orange-800">Pawsome Tees</h1>
                <p className="text-sm text-orange-600">For the ultimate dog parents</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5 text-orange-600" />
              </Button>
              <CartSidebar />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl font-bold text-orange-800 mb-6">HI JEFF AND MOLLY</h2>
            <p className="text-xl text-orange-700 mb-8">
              Show the world you're a proud dog parent with our super soft, premium quality t-shirts. Perfect for dog
              moms and dads who want to celebrate their four-legged family members!
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-md">
                <Truck className="h-5 w-5 text-orange-500" />
                <span className="text-orange-800 font-medium">Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-md">
                <Shield className="h-5 w-5 text-orange-500" />
                <span className="text-orange-800 font-medium">30-Day Guarantee</span>
              </div>
              <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-md">
                <RotateCcw className="h-5 w-5 text-orange-500" />
                <span className="text-orange-800 font-medium">Easy Returns</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-orange-800 mb-4">Our Pawsome Collection</h3>
            <p className="text-orange-700 text-lg">Choose your perfect fit and show your dog parent pride!</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {products.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden hover:shadow-xl transition-shadow duration-300 border-2 border-orange-200"
              >
                <div className="relative">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="w-full h-80 object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </Badge>
                  <Button variant="ghost" size="icon" className="absolute top-4 right-4 bg-white/80 hover:bg-white">
                    <Heart className="h-5 w-5 text-orange-600" />
                  </Button>
                </div>
                <CardContent className="p-6">
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

                  <h4 className="text-xl font-bold text-orange-800 mb-2">{product.name}</h4>

                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-2xl font-bold text-orange-600">${product.price}</span>
                    <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Available Colors:</p>
                    <div className="flex space-x-2">
                      {product.colors.map((color) => (
                        <Badge key={color} variant="outline" className="text-xs">
                          {color}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm text-gray-600 mb-2">Available Sizes:</p>
                    <div className="flex flex-wrap gap-1">
                      {product.sizes.map((size) => (
                        <Badge key={size} variant="outline" className="text-xs">
                          {size}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3"
                      onClick={() => handleQuickAdd(product)}
                    >
                      Quick Add to Cart 🛒
                    </Button>
                    <Link href={`/product/${product.id}`} className="block">
                      <Button variant="outline" className="w-full border-orange-300 text-orange-700 hover:bg-orange-50">
                        View Details & Choose Options
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-orange-800 mb-4">Why Dog Parents Love Our Tees</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌟</span>
              </div>
              <h4 className="text-xl font-semibold text-orange-800 mb-2">Premium Quality</h4>
              <p className="text-orange-700">
                Super soft, 100% cotton that gets softer with every wash. Built to last through all your adventures with
                your pup!
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💝</span>
              </div>
              <h4 className="text-xl font-semibold text-orange-800 mb-2">Perfect Gift</h4>
              <p className="text-orange-700">
                Ideal for any dog lover in your life! Perfect for birthdays, holidays, or just because they deserve it.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎨</span>
              </div>
              <h4 className="text-xl font-semibold text-orange-800 mb-2">Cute Designs</h4>
              <p className="text-orange-700">
                Adorable designs that perfectly capture the love between you and your furry best friend.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-orange-800 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-3xl">🐕</span>
            <h4 className="text-2xl font-bold">Pawsome Tees</h4>
          </div>
          <p className="text-orange-200 mb-6">Celebrating the unconditional love between dogs and their humans</p>
          <div className="flex justify-center space-x-6 text-sm">
            <Link href="#" className="hover:text-orange-300">
              Shipping Info
            </Link>
            <Link href="#" className="hover:text-orange-300">
              Size Guide
            </Link>
            <Link href="#" className="hover:text-orange-300">
              Returns
            </Link>
            <Link href="#" className="hover:text-orange-300">
              Contact
            </Link>
          </div>
          <div className="mt-8 pt-8 border-t border-orange-700">
            <p className="text-orange-300 text-sm">© 2024 Pawsome Tees. Made with 🧡 for dog parents everywhere.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
