"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useToasts } from "./components/Toast";
import { ToastContainer } from "./components/Toast";
import LoginScreen from "./components/LoginScreen";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import type {
  Role,
  Section,
  CartItem,
  Order,
  Notification,
  ProfileData,
  Product,
} from "./components/data";
import { INITIAL_NOTIFICATIONS } from "./components/data";

// Dynamic imports to avoid SSR issues with charts/canvas
const Dashboard = dynamic(() => import("./components/Dashboard"), { ssr: false });
const Catalog = dynamic(() => import("./components/Catalog"), { ssr: false });
const Orders = dynamic(() => import("./components/Orders"), { ssr: false });
const Customers = dynamic(() => import("./components/Customers"), { ssr: false });
const Financial = dynamic(() => import("./components/Financial"), { ssr: false });
const AdminPanel = dynamic(() => import("./components/AdminPanel"), { ssr: false });
const Notifications = dynamic(() => import("./components/Notifications"), { ssr: false });
const Profile = dynamic(() => import("./components/Profile"), { ssr: false });

const SECTION_LABELS: Record<Section, string> = {
  dashboard: "Dashboard",
  catalog: "Catálogo",
  orders: "Pedidos",
  customers: "Clientes",
  financial: "Financeiro",
  notifications: "Notificações",
  profile: "Perfil",
  admin: "Admin",
};

export default function DemoPage() {
  const [role, setRole] = useState<Role | null>(null);
  const [activeSection, setActiveSection] = useState<Section>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [storeOpen, setStoreOpen] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);
  const [profile, setProfile] = useState<ProfileData>({
    name: "Visitante Demo",
    email: "visitante@fropty.com",
    phone: "(11) 99999-0000",
    whatsapp: "(11) 99999-0000",
  });

  const { toasts, addToast, dismissToast } = useToasts();

  // Init theme from localStorage
  useEffect(() => {
    const saved = (localStorage.getItem("theme") as "dark" | "light") || "dark";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  }

  function handleLogin(r: Role) {
    setRole(r);
    if (r === "admin") {
      addToast("success", "Bem-vindo, Admin! Acesso completo liberado.");
    } else {
      addToast("success", "Bem-vindo, Visitante! Explore o sistema à vontade.");
    }
  }

  function handleLogout() {
    setRole(null);
    setActiveSection("dashboard");
    setCartItems([]);
    setSidebarOpen(false);
  }

  function handleAddToCart(product: Product) {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) => i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { product, qty: 1 }];
    });
  }

  function handleAddOrder(order: Order) {
    setOrders((prev) => [order, ...prev]);
    // Add notification for new order
    const newNotif: Notification = {
      id: Date.now(),
      type: "order",
      title: "Pedido realizado",
      message: `Pedido ${order.id} — ${order.customer} — ${order.total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`,
      time: "agora mesmo",
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  }

  const unreadCount = notifications.filter((n) => !n.read).length;
  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  if (!role) {
    return (
      <>
        <LoginScreen onLogin={handleLogin} />
        <ToastContainer toasts={toasts} onDismiss={dismissToast} />
      </>
    );
  }

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; overflow-x: hidden; }
        @keyframes sectionFadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .section-animate { animation: sectionFadeIn 0.25s ease both; }
        .demo-sidebar { position: fixed; left: 0; top: 0; bottom: 0; width: 220px; z-index: 200; }
        .demo-main { margin-left: 220px; min-height: 100vh; background: var(--bg); padding-top: 60px; }
        @media (max-width: 768px) {
          .demo-sidebar { left: -240px !important; transition: left 0.28s cubic-bezier(0.4,0,0.2,1); box-shadow: none; }
          .demo-sidebar.open { left: 0 !important; box-shadow: 8px 0 40px rgba(4,3,22,0.6); }
          .demo-main { margin-left: 0 !important; }
        }
      `}</style>

      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        role={role}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNavigate={(section) => {
          setActiveSection(section);
          setSidebarOpen(false);
        }}
      />

      {/* Header */}
      <Header
        role={role}
        activeSection={activeSection}
        notifCount={unreadCount}
        cartCount={cartCount}
        theme={theme}
        onToggleTheme={toggleTheme}
        onNotifications={() => setActiveSection("notifications")}
        onCart={() => setCartOpen(true)}
        onProfile={() => setActiveSection("profile")}
        onLogout={handleLogout}
        sectionLabels={SECTION_LABELS}
        onMenuOpen={() => setSidebarOpen(true)}
      />

      {/* Main content */}
      <main className="demo-main">
        <div key={activeSection} className="section-animate">
          {activeSection === "dashboard" && (
            <Dashboard
              storeOpen={storeOpen}
              onToggleStore={(v) => {
                setStoreOpen(v);
                addToast(v ? "success" : "warning", v ? "Loja aberta! Aceitando pedidos." : "Loja fechada. Novos pedidos pausados.");
              }}
              addToast={addToast}
            />
          )}

          {activeSection === "catalog" && (
            <Catalog
              cartItems={cartItems}
              onAddToCart={handleAddToCart}
              addToast={addToast}
            />
          )}

          {activeSection === "orders" && (
            <Orders
              cartItems={cartItems}
              onUpdateCart={setCartItems}
              orders={orders}
              onAddOrder={handleAddOrder}
              addToast={addToast}
              isOpen={cartOpen}
              onClose={() => setCartOpen(false)}
            />
          )}

          {activeSection === "customers" && (
            <Customers addToast={addToast} />
          )}

          {activeSection === "financial" && (
            <Financial addToast={addToast} />
          )}

          {activeSection === "notifications" && (
            <Notifications
              notifications={notifications}
              onUpdate={setNotifications}
            />
          )}

          {activeSection === "profile" && (
            <Profile
              profile={profile}
              onSave={setProfile}
              addToast={addToast}
            />
          )}

          {activeSection === "admin" && role === "admin" && (
            <AdminPanel addToast={addToast} />
          )}

          {activeSection === "admin" && role !== "admin" && (
            <div style={{ padding: 40, textAlign: "center" }}>
              <i className="ti ti-lock" style={{ fontSize: 48, color: "var(--text-faint)", display: "block", marginBottom: 12 }} />
              <p style={{ color: "var(--text-muted)" }}>Acesso restrito. Faça login como admin.</p>
            </div>
          )}
        </div>
      </main>

      {/* Cart drawer — rendered outside section so it overlays everything */}
      {activeSection !== "orders" && (
        <Orders
          cartItems={cartItems}
          onUpdateCart={setCartItems}
          orders={orders}
          onAddOrder={handleAddOrder}
          addToast={addToast}
          isOpen={cartOpen}
          onClose={() => setCartOpen(false)}
        />
      )}

      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </>
  );
}
