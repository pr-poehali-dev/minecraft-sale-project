import { useState } from "react";
import Icon from "@/components/ui/icon";

interface DonateItem {
  id: number;
  name: string;
  description: string;
  price: number;
  emoji: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  features: string[];
  popular?: boolean;
}

interface CartItem extends DonateItem {
  qty: number;
}

const RARITY_STYLES = {
  common:    { border: "#666 #222 #222 #666", bg: "#2a2a2a", label: "ОБЫЧНЫЙ",    labelBg: "#444",    labelColor: "#aaa" },
  rare:      { border: "#3a7fd0 #1a3a80 #1a3a80 #3a7fd0", bg: "#0d1a2e", label: "РЕДКИЙ",    labelBg: "#1a3a80",  labelColor: "#7ab8f0" },
  epic:      { border: "#9a3ad0 #4a1a80 #4a1a80 #9a3ad0", bg: "#160d2e", label: "ЭПИЧЕСКИЙ",  labelBg: "#4a1a80",  labelColor: "#c07af0" },
  legendary: { border: "#ffd700 #b8860b #b8860b #ffd700", bg: "#1e1600", label: "ЛЕГЕНДАРНЫЙ", labelBg: "#7a5a00",  labelColor: "#ffd700" },
};

const DONATE_ITEMS: DonateItem[] = [
  {
    id: 1,
    name: "Разбан",
    description: "Снятие бана с аккаунта. Одноразово.",
    price: 99,
    emoji: "🔓",
    rarity: "common",
    features: ["Мгновенная разблокировка", "Один аккаунт", "Без вопросов"],
  },
  {
    id: 2,
    name: "Креатив",
    description: "Режим творчества на 30 дней.",
    price: 149,
    emoji: "🏗️",
    rarity: "rare",
    features: ["Бесконечные ресурсы", "Полёт", "30 дней доступа"],
  },
  {
    id: 3,
    name: "Оператор",
    description: "Права OP на сервере. Полный контроль.",
    price: 499,
    emoji: "⚡",
    rarity: "epic",
    popular: true,
    features: ["/op команды", "Доступ к /gamemode", "Управление игроками", "Бессрочно"],
  },
  {
    id: 4,
    name: "GOD SET",
    description: "Легендарный комплект: Разбан + Креатив + Оператор.",
    price: 599,
    emoji: "👑",
    rarity: "legendary",
    features: ["Разбан навсегда", "Вечный Креатив", "Оператор бессрочно", "Приоритетная поддержка"],
  },
];

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [addedId, setAddedId] = useState<number | null>(null);
  const [successOpen, setSuccessOpen] = useState(false);

  const addToCart = (item: DonateItem) => {
    setCart((prev) => {
      const ex = prev.find((i) => i.id === item.id);
      if (ex) return prev.map((i) => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...item, qty: 1 }];
    });
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 900);
  };

  const removeFromCart = (id: number) => setCart((p) => p.filter((i) => i.id !== id));
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div className="min-h-screen" style={{
      background: "radial-gradient(ellipse at 25% 25%, rgba(45,90,26,0.3) 0%, transparent 55%), radial-gradient(ellipse at 75% 75%, rgba(20,30,60,0.4) 0%, transparent 55%), hsl(120,20%,8%)"
    }}>

      {/* Header */}
      <header className="sticky top-0 z-40" style={{ background: "hsl(120,20%,7%)", borderBottom: "3px solid #2d5a1a", boxShadow: "0 4px 0 rgba(0,0,0,0.6)" }}>
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⛏️</span>
            <div className="font-pixel text-xs leading-relaxed" style={{ fontFamily: "'Press Start 2P', monospace" }}>
              <div className="text-green-400" style={{ textShadow: "2px 2px 0 #1a3a0a", fontSize: 9 }}>CRAFT</div>
              <div className="text-yellow-400" style={{ textShadow: "2px 2px 0 #7a5a00", fontSize: 9 }}>DONATE</div>
            </div>
          </div>

          <button
            onClick={() => setCartOpen(true)}
            className="relative pixel-btn px-4 py-2 flex items-center gap-2 text-white text-sm font-semibold"
            style={{ background: "hsl(120,50%,22%)" }}
          >
            <span>🎒</span>
            <span>Корзина</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center font-bold text-black glow-green"
                style={{ background: "#7ab84a", border: "2px solid #3a6a1a", fontFamily: "'Press Start 2P', monospace", fontSize: 8 }}>
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 pt-14 pb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 text-green-300 glow-green"
          style={{ background: "rgba(45,90,26,0.35)", border: "2px solid #2d5a1a", fontFamily: "'Press Start 2P', monospace", fontSize: 8 }}>
          ▶ СЕРВЕР ОНЛАЙН · 247 игроков
        </div>
        <h1 className="font-pixel text-white mb-4" style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: "clamp(18px, 5vw, 36px)",
          textShadow: "4px 4px 0 #1a3a0a",
          lineHeight: 1.6
        }}>
          ДОНАТ<br /><span className="text-green-400">МАГАЗИН</span>
        </h1>
        <p className="text-gray-400 max-w-md mx-auto text-sm leading-relaxed">
          Расширь возможности на сервере. Покупки применяются мгновенно — без ожидания.
        </p>
      </section>

      {/* Cards */}
      <section className="max-w-5xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {DONATE_ITEMS.map((item, idx) => {
            const s = RARITY_STYLES[item.rarity];
            const justAdded = addedId === item.id;
            return (
              <div
                key={item.id}
                className="fade-in-up flex flex-col relative"
                style={{
                  background: s.bg,
                  border: "3px solid",
                  borderColor: s.border,
                  boxShadow: `inset 2px 2px 0 rgba(255,255,255,0.08), inset -2px -2px 0 rgba(0,0,0,0.4), 4px 4px 0 rgba(0,0,0,0.6)`,
                  animationDelay: `${idx * 0.1}s`,
                }}
              >
                {/* Popular badge */}
                {item.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 text-black font-bold z-10"
                    style={{ background: "#ffd700", border: "2px solid #b8860b", fontFamily: "'Press Start 2P', monospace", fontSize: 7, whiteSpace: "nowrap" }}>
                    ★ ХИТ
                  </div>
                )}

                {/* Rarity label */}
                <div className="px-3 py-2 flex items-center justify-between" style={{ borderBottom: `2px solid ${s.border.split(" ")[0]}` }}>
                  <span style={{ background: s.labelBg, color: s.labelColor, fontFamily: "'Press Start 2P', monospace", fontSize: 7, padding: "2px 6px" }}>
                    {s.label}
                  </span>
                  <span className="text-2xl">{item.emoji}</span>
                </div>

                {/* Body */}
                <div className="flex-1 p-4 flex flex-col gap-3">
                  <div>
                    <h2 className="text-white font-bold text-lg leading-tight mb-1">{item.name}</h2>
                    <p className="text-gray-400 text-xs leading-relaxed">{item.description}</p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-1.5 flex-1">
                    {item.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-gray-300">
                        <span className="text-green-400 shrink-0">▪</span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Price + Button */}
                  <div className="pt-3 space-y-2" style={{ borderTop: "2px solid rgba(255,255,255,0.06)" }}>
                    <div className="text-center">
                      <span style={{
                        fontFamily: "'Press Start 2P', monospace",
                        fontSize: 16,
                        color: item.rarity === "legendary" ? "#ffd700" : item.rarity === "epic" ? "#c07af0" : item.rarity === "rare" ? "#7ab8f0" : "#aaa",
                        textShadow: item.rarity === "legendary" ? "2px 2px 0 #7a5a00" : "none"
                      }}>
                        {item.price} ₽
                      </span>
                    </div>
                    <button
                      onClick={() => addToCart(item)}
                      className="w-full pixel-btn py-2.5 text-xs font-bold transition-all"
                      style={{
                        fontFamily: "'Press Start 2P', monospace",
                        fontSize: 8,
                        background: justAdded
                          ? "hsl(45,70%,28%)"
                          : item.rarity === "legendary"
                            ? "hsl(45,70%,22%)"
                            : "hsl(120,50%,20%)",
                        color: justAdded ? "#ffd700" : "white",
                        borderColor: justAdded ? "#ffd700 #b8860b #b8860b #ffd700" : undefined,
                      }}
                    >
                      {justAdded ? "✓ ДОБАВЛЕНО" : "КУПИТЬ"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info strip */}
        <div className="mt-10 grid grid-cols-3 gap-3 text-center">
          {[
            { emoji: "⚡", text: "Мгновенная выдача" },
            { emoji: "🔒", text: "Безопасная оплата" },
            { emoji: "💬", text: "Поддержка 24/7" },
          ].map((i) => (
            <div key={i.text} className="py-3 px-2" style={{ background: "hsl(120,15%,11%)", border: "2px solid #2d5a1a" }}>
              <div className="text-xl mb-1">{i.emoji}</div>
              <p className="text-xs text-gray-400">{i.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/60" onClick={() => setCartOpen(false)} />
          <div className="cart-slide-in w-full max-w-sm flex flex-col" style={{
            background: "hsl(120,18%,10%)",
            borderLeft: "3px solid #2d5a1a",
            boxShadow: "-8px 0 30px rgba(0,0,0,0.8)"
          }}>
            <div className="flex items-center justify-between p-5" style={{ borderBottom: "3px solid #2d5a1a" }}>
              <div className="flex items-center gap-2">
                <span className="text-xl">🎒</span>
                <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 9, color: "#7ab84a", textShadow: "1px 1px 0 #1a3a0a" }}>КОРЗИНА</span>
              </div>
              <button onClick={() => setCartOpen(false)} className="text-gray-400 hover:text-white">
                <Icon name="X" size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 gap-3 opacity-40">
                  <span className="text-4xl">📦</span>
                  <p style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 8, color: "#666", textAlign: "center", lineHeight: 2 }}>КОРЗИНА<br />ПУСТА</p>
                </div>
              ) : (
                cart.map((item) => {
                  const s = RARITY_STYLES[item.rarity];
                  return (
                    <div key={item.id} className="flex items-center gap-3 p-3" style={{ background: s.bg, border: "2px solid", borderColor: s.border }}>
                      <span className="text-2xl shrink-0">{item.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-semibold truncate">{item.name}</p>
                        <p style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 9, color: "#ffd700" }}>{item.price * item.qty} ₽</p>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-gray-500 hover:text-red-400 transition-colors">
                        <Icon name="Trash2" size={15} />
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-5 space-y-3" style={{ borderTop: "3px solid #2d5a1a" }}>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Итого:</span>
                  <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 14, color: "#ffd700", textShadow: "2px 2px 0 #7a5a00" }}>
                    {total} ₽
                  </span>
                </div>
                <button
                  onClick={() => { setCartOpen(false); setCart([]); setSuccessOpen(true); }}
                  className="w-full pixel-btn pixel-btn-gold py-3 font-bold text-black"
                  style={{ background: "#c8920a", fontFamily: "'Press Start 2P', monospace", fontSize: 9 }}
                >
                  ⚡ ОПЛАТИТЬ
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Success Modal */}
      {successOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.75)" }}>
          <div className="fade-in-up w-full max-w-sm flex flex-col items-center text-center p-8 gap-5"
            style={{
              background: "hsl(120,20%,9%)",
              border: "3px solid",
              borderColor: "#ffd700 #b8860b #b8860b #ffd700",
              boxShadow: "inset 2px 2px 0 rgba(255,255,255,0.08), inset -2px -2px 0 rgba(0,0,0,0.4), 0 0 40px rgba(255,215,0,0.25), 6px 6px 0 rgba(0,0,0,0.7)",
            }}>
            {/* Icon */}
            <div className="float-anim text-6xl">✅</div>

            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 13, color: "#ffd700", textShadow: "2px 2px 0 #7a5a00", lineHeight: 2 }}>
              ОПЛАТА<br />ПРОШЛА!
            </div>

            <p className="text-gray-300 text-sm leading-relaxed">
              Твой донат поступит на аккаунт в течение
            </p>

            <div className="w-full py-3 px-4" style={{
              background: "rgba(45,90,26,0.25)",
              border: "2px solid #2d5a1a",
            }}>
              <p style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 11, color: "#7ab84a", lineHeight: 2 }}>
                ⏱ 5 минут — 2 часа
              </p>
            </div>

            <ul className="text-left w-full space-y-2">
              {[
                "Зайди на сервер под своим ником",
                "Если через 2 часа не пришло — напиши в поддержку",
              ].map((t) => (
                <li key={t} className="flex gap-2 text-xs text-gray-400">
                  <span className="text-green-400 shrink-0 mt-0.5">▪</span>
                  {t}
                </li>
              ))}
            </ul>

            <button
              onClick={() => setSuccessOpen(false)}
              className="w-full pixel-btn py-3 font-bold text-white"
              style={{ background: "hsl(120,50%,22%)", fontFamily: "'Press Start 2P', monospace", fontSize: 9 }}
            >
              OK, ПОНЯЛ!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}