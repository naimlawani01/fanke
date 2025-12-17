import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Package,
  TrendingUp,
  Users,
  ShoppingCart,
  Cloud,
  WifiOff,
  Shield,
  Check,
  ChevronDown,
  ChevronUp,
  Star,
  ArrowRight,
  Play,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Download,
  MessageCircle,
  Send,
  Loader2,
} from 'lucide-react';

// Numéro WhatsApp (à personnaliser)
const WHATSAPP_NUMBER = '224620000000';
const EMAIL_ADDRESS = 'contact@geststock.pro';

// Types de commerces supportés
const businessTypes = [
  { icon: '💊', name: 'Pharmacies', color: 'emerald' },
  { icon: '🛒', name: 'Épiceries', color: 'orange' },
  { icon: '🔧', name: 'Quincailleries', color: 'slate' },
  { icon: '💄', name: 'Cosmétiques', color: 'pink' },
  { icon: '🚗', name: 'Pièces Auto', color: 'blue' },
  { icon: '👕', name: 'Vêtements', color: 'violet' },
  { icon: '📱', name: 'Électronique', color: 'cyan' },
  { icon: '🍽️', name: 'Restaurants', color: 'amber' },
  { icon: '📦', name: 'Grossistes', color: 'indigo' },
];

// Fonctionnalités principales
const features = [
  {
    icon: Package,
    title: 'Gestion de stock',
    description: 'Suivez vos produits en temps réel. Alertes automatiques quand le stock est bas.',
    bgColor: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
  },
  {
    icon: ShoppingCart,
    title: 'Point de vente',
    description: 'Interface de caisse simple et rapide. Acceptez plusieurs moyens de paiement.',
    bgColor: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
  },
  {
    icon: Users,
    title: 'Gestion clients',
    description: 'Fidélisez vos clients. Gérez les crédits et les paiements différés.',
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    icon: TrendingUp,
    title: 'Rapports & Stats',
    description: 'Visualisez vos performances. Prenez de meilleures décisions.',
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600',
  },
  {
    icon: WifiOff,
    title: 'Mode hors-ligne',
    description: 'Continuez à travailler sans internet. Synchronisation automatique.',
    bgColor: 'bg-orange-100',
    iconColor: 'text-orange-600',
  },
  {
    icon: Shield,
    title: 'Sécurité',
    description: 'Vos données sont protégées et sauvegardées sur le cloud.',
    bgColor: 'bg-red-100',
    iconColor: 'text-red-600',
  },
];

// Plans tarifaires
const pricingPlans = [
  {
    name: 'Licence',
    subtitle: 'Achat unique',
    price: '150 000',
    currency: 'GNF',
    period: 'une seule fois',
    description: 'Achetez le logiciel et utilisez-le pour toujours',
    features: [
      'Installation sur 1 ordinateur',
      'Toutes les fonctionnalités',
      'Mode hors-ligne complet',
      'Mises à jour pendant 1 an',
      'Support par email',
    ],
    cta: 'Acheter maintenant',
    popular: false,
    color: 'slate',
  },
  {
    name: 'Cloud Sync',
    subtitle: 'Abonnement mensuel',
    price: '50 000',
    currency: 'GNF',
    period: '/mois',
    description: 'Synchronisez vos données sur le cloud',
    features: [
      'Sauvegarde automatique',
      'Accès depuis plusieurs appareils',
      'Synchronisation en temps réel',
      'Mises à jour illimitées',
      'Support prioritaire 24/7',
      'Rapports avancés',
    ],
    cta: 'S\'abonner',
    popular: true,
    color: 'indigo',
  },
  {
    name: 'Entreprise',
    subtitle: 'Sur mesure',
    price: 'Sur devis',
    currency: '',
    period: '',
    description: 'Pour les grandes entreprises',
    features: [
      'Multi-établissements',
      'Formation sur site',
      'Personnalisation',
      'Intégration API',
      'Account manager dédié',
      'SLA garanti',
    ],
    cta: 'Nous contacter',
    popular: false,
    color: 'emerald',
  },
];

// FAQ
const faqs = [
  {
    question: 'Le logiciel fonctionne-t-il sans internet ?',
    answer: 'Oui ! GestStock Pro fonctionne parfaitement hors-ligne. Toutes vos ventes, stocks et données sont enregistrés localement. Quand internet revient, tout se synchronise automatiquement avec le cloud.',
  },
  {
    question: 'Puis-je utiliser GestStock Pro pour mon type de commerce ?',
    answer: 'GestStock Pro est conçu pour tous types de commerces : pharmacies, épiceries, quincailleries, cosmétiques, pièces auto, vêtements, électronique, restaurants et grossistes. Chaque type a ses fonctionnalités adaptées.',
  },
  {
    question: 'Comment fonctionne l\'abonnement Cloud Sync ?',
    answer: 'L\'abonnement Cloud Sync vous permet de sauvegarder automatiquement vos données sur nos serveurs sécurisés, d\'accéder à votre commerce depuis plusieurs appareils, et de bénéficier de mises à jour continues. Vous pouvez annuler à tout moment.',
  },
  {
    question: 'Est-ce que mes données sont sécurisées ?',
    answer: 'Absolument. Vos données sont chiffrées et stockées sur des serveurs sécurisés. Nous effectuons des sauvegardes quotidiennes. Vous restez propriétaire de vos données à 100%.',
  },
  {
    question: 'Proposez-vous une formation ?',
    answer: 'Oui, nous proposons des tutoriels vidéo gratuits et un support par email. Pour les entreprises, nous offrons des formations sur site avec notre pack Entreprise.',
  },
  {
    question: 'Comment puis-je payer ?',
    answer: 'Nous acceptons Orange Money, MTN Mobile Money, les virements bancaires et les cartes bancaires. Le paiement est sécurisé.',
  },
];

// Témoignages
const testimonials = [
  {
    name: 'Mamadou Diallo',
    role: 'Gérant de pharmacie',
    location: 'Conakry, Guinée',
    image: '💊',
    content: 'Depuis que j\'utilise GestStock Pro, je ne perds plus de temps à chercher mes produits. Les alertes d\'expiration m\'ont fait économiser beaucoup d\'argent.',
    rating: 5,
  },
  {
    name: 'Fatou Camara',
    role: 'Propriétaire épicerie',
    location: 'Dakar, Sénégal',
    image: '🛒',
    content: 'Simple à utiliser, même pour quelqu\'un qui n\'est pas très à l\'aise avec l\'informatique. Mon commerce est maintenant bien organisé.',
    rating: 5,
  },
  {
    name: 'Ibrahim Koné',
    role: 'Gérant quincaillerie',
    location: 'Abidjan, Côte d\'Ivoire',
    image: '🔧',
    content: 'Le mode hors-ligne est génial ! Les coupures d\'électricité ne m\'empêchent plus de travailler. Je recommande à tous les commerçants.',
    rating: 5,
  },
];

// Modal de contact/achat
function ContactModal({ 
  isOpen, 
  onClose, 
  planName 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  planName?: string;
}) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    business: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simuler l'envoi
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Bonjour ! Je suis intéressé(e) par GestStock Pro${planName ? ` (${planName})` : ''}.\n\nNom: ${formData.name || 'Non renseigné'}\nCommerce: ${formData.business || 'Non renseigné'}\nTéléphone: ${formData.phone || 'Non renseigné'}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(`Demande d'information - GestStock Pro${planName ? ` (${planName})` : ''}`);
    const body = encodeURIComponent(
      `Bonjour,\n\nJe suis intéressé(e) par GestStock Pro.\n\nNom: ${formData.name}\nCommerce: ${formData.business}\nTéléphone: ${formData.phone}\n\nMessage: ${formData.message}\n\nCordialement`
    );
    window.open(`mailto:${EMAIL_ADDRESS}?subject=${subject}&body=${body}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-t-3xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold text-white">
            {planName ? `Commander ${planName}` : 'Contactez-nous'}
          </h2>
          <p className="text-indigo-100 mt-1">
            Nous vous répondons sous 24h
          </p>
        </div>

        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Message envoyé !</h3>
              <p className="text-gray-600 mb-6">Nous vous contacterons très bientôt.</p>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
              >
                Fermer
              </button>
            </div>
          ) : (
            <>
              {/* Boutons rapides */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  onClick={handleWhatsApp}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </button>
                <button
                  onClick={handleEmail}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  Email
                </button>
              </div>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">ou remplissez le formulaire</span>
                </div>
              </div>

              {/* Formulaire */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Votre nom *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="Ex: Mamadou Diallo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="Ex: +224 620 00 00 00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="Ex: contact@moncommerce.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type de commerce *
                  </label>
                  <select
                    required
                    value={formData.business}
                    onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  >
                    <option value="">Sélectionnez...</option>
                    <option value="Pharmacie">💊 Pharmacie</option>
                    <option value="Épicerie">🛒 Épicerie</option>
                    <option value="Quincaillerie">🔧 Quincaillerie</option>
                    <option value="Cosmétiques">💄 Cosmétiques</option>
                    <option value="Pièces auto">🚗 Pièces auto</option>
                    <option value="Vêtements">👕 Vêtements</option>
                    <option value="Électronique">📱 Électronique</option>
                    <option value="Restaurant">🍽️ Restaurant</option>
                    <option value="Grossiste">📦 Grossiste</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message (optionnel)
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
                    placeholder="Décrivez vos besoins..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/30 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Envoyer ma demande
                    </>
                  )}
                </button>
              </form>

              <p className="text-xs text-gray-500 text-center mt-4">
                En soumettant ce formulaire, vous acceptez d'être contacté par notre équipe.
              </p>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | undefined>();

  const openContactWithPlan = (planName?: string) => {
    setSelectedPlan(planName);
    setShowContactModal(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <span className="font-bold text-xl text-gray-900">GestStock<span className="text-indigo-600">Pro</span></span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">Fonctionnalités</a>
              <a href="#pricing" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">Tarifs</a>
              <a href="#testimonials" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">Témoignages</a>
              <a href="#faq" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">FAQ</a>
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <a href="#contact" className="px-4 py-2 text-gray-700 hover:text-indigo-600 font-medium transition-colors">
                Contact
              </a>
              <button 
                onClick={() => openContactWithPlan()}
                className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-indigo-500/30 transition-all hover:scale-105"
              >
                Commencer
              </button>
            </div>

            {/* Mobile menu button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-100"
            >
              <div className="px-4 py-4 space-y-3">
                <a href="#features" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">Fonctionnalités</a>
                <a href="#pricing" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">Tarifs</a>
                <a href="#testimonials" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">Témoignages</a>
                <a href="#faq" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">FAQ</a>
                <button onClick={() => { setMobileMenuOpen(false); openContactWithPlan(); }} className="block w-full px-4 py-3 bg-indigo-600 text-white text-center rounded-lg font-semibold">Commencer</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-full text-indigo-700 text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                Nouveau : Mode hors-ligne amélioré
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                Gérez votre commerce{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                  simplement
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Le logiciel de gestion de stock pensé pour l'Afrique. 
                Fonctionne même sans internet. Simple à utiliser, puissant pour votre business.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <button 
                  onClick={() => openContactWithPlan('Licence')}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold text-lg hover:shadow-xl hover:shadow-indigo-500/30 transition-all hover:scale-105"
                >
                  <Download className="w-5 h-5" />
                  Acheter maintenant
                </button>
                <a 
                  href="#features"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-700 rounded-full font-semibold text-lg border-2 border-gray-200 hover:border-indigo-300 hover:text-indigo-600 transition-all"
                >
                  <Play className="w-5 h-5" />
                  Découvrir
                </a>
              </div>

              {/* Trust badges */}
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  Installation en 2 min
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  Fonctionne hors-ligne
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  Support 7j/7
                </div>
              </div>
            </motion.div>

            {/* Right - App Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-6 shadow-2xl">
                {/* Mockup header */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                
                {/* App screenshot placeholder */}
                <div className="bg-white rounded-xl overflow-hidden shadow-inner">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4 text-white">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
                        🏪
                      </div>
                      <div>
                        <h3 className="font-bold">Ma Boutique</h3>
                        <p className="text-sm text-white/80">Épicerie • Conakry</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="text-sm text-gray-500">Ventes du jour</p>
                        <p className="text-xl font-bold text-gray-900">2 450 000 GNF</p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-green-500" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-xs text-gray-500">Produits</p>
                        <p className="text-lg font-bold text-gray-900">234</p>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <p className="text-xs text-gray-500">Clients</p>
                        <p className="text-lg font-bold text-gray-900">89</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl">
                <div className="flex items-center gap-2">
                  <Cloud className="w-5 h-5 text-indigo-500" />
                  <span className="text-sm font-medium text-gray-700">Sync cloud</span>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl">
                <div className="flex items-center gap-2">
                  <WifiOff className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium text-gray-700">Mode hors-ligne</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Business Types */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-gray-500 text-lg">Adapté à tous les types de commerces</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {businessTypes.map((type, index) => (
              <motion.div
                key={type.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 px-5 py-3 bg-gray-50 hover:bg-indigo-50 rounded-full transition-colors cursor-default"
              >
                <span className="text-2xl">{type.icon}</span>
                <span className="font-medium text-gray-700">{type.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Tout ce dont vous avez besoin
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Des fonctionnalités puissantes pour gérer votre commerce efficacement
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 group"
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${feature.bgColor} group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-7 h-7 ${feature.iconColor}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Tarifs simples et transparents
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choisissez la formule qui correspond à vos besoins
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative bg-white rounded-3xl p-8 shadow-lg ${
                  plan.popular ? 'ring-2 ring-indigo-500 scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-semibold rounded-full">
                    Populaire
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h3>
                  <p className="text-gray-500 text-sm">{plan.subtitle}</p>
                  <div className="mt-4">
                    <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                    <span className="text-gray-500 ml-1">{plan.currency} {plan.period}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => openContactWithPlan(plan.name)}
                  className={`w-full py-3 rounded-xl font-semibold transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/30'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Ce que disent nos clients
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Des milliers de commerçants nous font déjà confiance
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-2xl p-8"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center text-2xl">
                    {testimonial.image}
                  </div>
      <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                    <p className="text-xs text-gray-400">{testimonial.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Questions fréquentes
            </h2>
            <p className="text-xl text-gray-600">
              Trouvez rapidement les réponses à vos questions
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-gray-600">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-indigo-600 to-purple-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Prêt à transformer votre commerce ?
            </h2>
            <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
              Rejoignez des milliers de commerçants qui font confiance à GestStock Pro pour gérer leur activité.
            </p>
<div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => openContactWithPlan('Licence')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-indigo-600 rounded-full font-semibold text-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <Download className="w-5 h-5" />
                Acheter maintenant
              </button>
              <button 
                onClick={() => openContactWithPlan()}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white rounded-full font-semibold text-lg border-2 border-white/30 hover:bg-white/10 transition-all"
              >
                Nous contacter
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-gray-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Logo & Description */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">G</span>
                </div>
                <span className="font-bold text-xl text-white">GestStock<span className="text-indigo-400">Pro</span></span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Le logiciel de gestion de stock n°1 pour les commerces africains. Simple, puissant, et qui fonctionne même sans internet.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-indigo-600 rounded-lg flex items-center justify-center transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-indigo-600 rounded-lg flex items-center justify-center transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-indigo-600 rounded-lg flex items-center justify-center transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold text-white mb-4">Produit</h4>
              <ul className="space-y-3">
                <li><a href="#features" className="hover:text-indigo-400 transition-colors">Fonctionnalités</a></li>
                <li><a href="#pricing" className="hover:text-indigo-400 transition-colors">Tarifs</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Télécharger</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Changelog</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-indigo-400" />
                  contact@geststock.pro
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-indigo-400" />
                  +224 620 00 00 00
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-indigo-400" />
                  Conakry, Guinée
                </li>
              </ul>
            </div>
      </div>

          {/* Bottom */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2024 GestStock Pro. Tous droits réservés.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-500 hover:text-indigo-400 transition-colors">Politique de confidentialité</a>
              <a href="#" className="text-gray-500 hover:text-indigo-400 transition-colors">Conditions d'utilisation</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Contact Modal */}
      <AnimatePresence>
        {showContactModal && (
          <ContactModal
            isOpen={showContactModal}
            onClose={() => {
              setShowContactModal(false);
              setSelectedPlan(undefined);
            }}
            planName={selectedPlan}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
