"use client";

import { useQuoteStore } from "@/stores/quote-store";
import { Check, Plus, Minus, Loader2 } from "lucide-react";
import { Product } from "@/domain/pricing/types";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

interface Props {
  onNext: () => void;
  onPrev: () => void;
}

export function StepMenu({ onNext, onPrev }: Props) {
  const { selectedItems, updateProductQuantity, event } = useQuoteStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('category', { ascending: true });

      if (!error && data) {
        setProducts(data as Product[]);
      }
      setLoading(false);
    }

    fetchProducts();
  }, []);

  const getCategoryTitle = (cat: string) => {
    switch (cat) {
      case 'plato_fondo': return 'Platos de Fondo';
      case 'bocado': return 'Bocados & Cóctel';
      case 'servicio': return 'Servicios Adicionales';
      default: return 'Otros';
    }
  };

  // Group items by category
  const groupedProducts = products.reduce((acc, product) => {
    const cat = product.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  const categories = ['plato_fondo', 'bocado', 'servicio'];

  const getProductQuantity = (productId: string) => {
    return selectedItems.find(i => i.product.id === productId)?.quantity || 0;
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-serif font-bold text-stone-800">Selecciona tu Menú</h2>
        <p className="text-stone-500">Elige los platos y servicios que deseas incluir.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
        </div>
      ) : (
        <div className="space-y-12">
          {categories.map(category => {
            const categoryProducts = groupedProducts[category];
            if (!categoryProducts?.length) return null;

            return (
              <div key={category} className="space-y-4">
                <h3 className="text-xl font-bold text-stone-800 border-b border-stone-200 pb-2">
                  {getCategoryTitle(category)}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {categoryProducts.map((product) => {
                    const quantity = getProductQuantity(product.id);
                    const isSelected = quantity > 0;
                    // Fixed only if it's per person AND NOT a service (services like Open Bar can have custom qty)
                    const isFixedQuantity = product.unit_type === 'persona' && product.category !== 'servicio';

                    return (
                      <div
                        key={product.id}
                        className={`
                          relative p-6 rounded-xl border-2 transition-all hover:shadow-md
                          ${isSelected
                            ? "border-amber-500 bg-amber-50/50"
                            : "border-stone-100 bg-white hover:border-amber-200"
                          }
                        `}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-lg text-stone-800">{product.name}</h3>

                          {/* Control Logic */}
                          {isFixedQuantity ? (
                            // Toggle for fixed quantity items (Person based)
                            <button
                              onClick={() => updateProductQuantity(product, isSelected ? 0 : event.guests)}
                              className={`
                                 w-8 h-8 rounded-full flex items-center justify-center transition-colors shrink-0
                                 ${isSelected ? "bg-amber-500 text-white" : "bg-stone-200 text-stone-400 hover:bg-stone-300"}
                               `}
                            >
                              {isSelected ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                            </button>
                          ) : (
                            // Stepper for variable quantity items
                            <div className="flex items-center gap-3 bg-white rounded-full border border-stone-200 p-1 shadow-sm">
                              <button
                                onClick={() => updateProductQuantity(product, Math.max(0, quantity - 1))}
                                className="w-7 h-7 flex items-center justify-center rounded-full text-stone-500 hover:bg-stone-100 disabled:opacity-30"
                                disabled={quantity === 0}
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <input
                                type="number"
                                min="0"
                                value={quantity}
                                onChange={(e) => updateProductQuantity(product, parseInt(e.target.value) || 0)}
                                className={`font-mono font-bold w-12 text-center bg-transparent border-none focus:ring-0 p-0 ${quantity > 0 ? 'text-amber-600' : 'text-stone-300'}`}
                              />
                              <button
                                onClick={() => updateProductQuantity(product, quantity + 1)}
                                className="w-7 h-7 flex items-center justify-center rounded-full text-stone-500 hover:bg-stone-100"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </div>

                        <p className="text-stone-600 text-sm mb-4 min-h-[40px]">{product.description}</p>

                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-amber-600">
                            ${product.unit_price.toLocaleString("es-CL")}
                          </span>
                          <span className="text-xs text-stone-400 uppercase tracking-wide">
                            / {product.unit_type}
                          </span>
                          {isSelected && !isFixedQuantity && (
                            <span className="ml-auto text-xs font-bold text-amber-700 bg-amber-100 px-2 py-1 rounded">
                              Total: ${(product.unit_price * quantity).toLocaleString("es-CL")}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="pt-8 flex justify-between">
        <button
          onClick={onPrev}
          className="text-stone-500 hover:text-stone-800 font-medium px-4 py-2"
        >
          Atrás
        </button>
        <button
          onClick={onNext}
          disabled={selectedItems.length === 0}
          className="bg-stone-900 text-white px-8 py-3 rounded-full hover:bg-stone-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
        >
          Ver Resumen
        </button>
      </div>
    </div>
  );
}
