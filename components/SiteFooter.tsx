// components/SiteFooter.tsx
export default function SiteFooter() {
  return (
    <footer className="bg-[#2C1A1D] text-[#FDFBF7] py-8 text-center text-sm">
      <p>&copy; {new Date().getFullYear()} Doğan Spot. Tüm hakları saklıdır.</p>
    </footer>
  )
}