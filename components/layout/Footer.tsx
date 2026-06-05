import Link from 'next/link';

const LINKS = [
  { label: 'About Us', href: '#' },
  { label: 'Contact', href: '#' },
  { label: 'Shipping', href: '#' },
  { label: 'Returns', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Privacy Policy', href: '#' },
];

const CUSTOMER_CARE = [
  { label: 'Contact', href: '#' },
  { label: 'Shipping', href: '#' },
  { label: 'Returns', href: '#' },
];

const COMPANY = [
  { label: 'About Us', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Privacy Policy', href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-surface-container-low w-full py-12 px-4 md:px-margin-desktop mt-16 md:mt-24 border-t border-surface-container">
      <div className="max-w-container mx-auto">

        {/* Desktop layout */}
        <div className="hidden md:grid md:grid-cols-3 gap-gutter">
          {/* Column 1: Brand + Newsletter */}
          <div className="col-span-1">
            <div className="text-headline-sm font-bold text-on-surface mb-4">GIFT PET</div>
            <p className="text-body-md text-on-surface-variant mb-6">
              © 2024 GIFT PET. Unboxing happiness for every pet.
            </p>
            <h4 className="text-label-md text-on-surface font-semibold mb-2">Newsletter</h4>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email here"
                className="bg-white border border-surface-container-high rounded-l-md px-4 py-2 w-full focus:outline-none focus:border-primary-container text-body-md text-on-surface"
              />
              <button
                type="button"
                aria-label="Subscribe"
                className="bg-primary-container text-white px-4 py-2 rounded-r-md hover:opacity-90 transition-opacity flex items-center justify-center"
              >
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Column 2-3: Links + Social */}
          <div className="col-span-2 flex justify-end space-x-16">
            <div>
              <h4 className="text-label-md text-on-surface font-semibold mb-4 uppercase tracking-wider">Links</h4>
              <ul className="space-y-3 text-body-md">
                {LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-on-surface-variant hover:text-primary hover:underline underline-offset-4 transition-all duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-start space-x-4">
              <Link
                href="#"
                aria-label="Website"
                className="text-on-surface-variant hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined">public</span>
              </Link>
              <Link
                href="#"
                aria-label="Instagram"
                className="text-on-surface-variant hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined">photo_camera</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile layout */}
        <div className="md:hidden flex flex-col space-y-8">
          {/* Brand + Newsletter */}
          <div className="flex flex-col">
            <span className="text-headline-sm font-bold text-on-surface mb-2">GIFT PET</span>
            <p className="text-body-md text-[14px] text-on-surface-variant mb-4">
              Join our community for tips, stories, and exclusive offers.
            </p>
            <div className="flex w-full">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow bg-surface border border-outline-variant rounded-l-lg px-3 py-2 text-body-md text-sm text-on-surface focus:outline-none focus:border-primary-container"
              />
              <button
                type="button"
                className="bg-primary-container text-on-primary text-label-md px-4 py-2 rounded-r-lg"
              >
                Subscribe
              </button>
            </div>
          </div>

          {/* Customer Care */}
          <div className="border-b border-outline-variant/50 pb-2">
            <h4 className="text-label-md text-on-surface mb-2">Customer Care</h4>
            <ul className="flex flex-col space-y-2">
              {CUSTOMER_CARE.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-body-md text-[14px] text-on-surface-variant hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="border-b border-outline-variant/50 pb-2">
            <h4 className="text-label-md text-on-surface mb-2">Company</h4>
            <ul className="flex flex-col space-y-2">
              {COMPANY.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-body-md text-[14px] text-on-surface-variant hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Copyright */}
          <div className="pt-4 flex flex-col items-center text-center">
            <p className="text-body-md text-[12px] text-on-surface-variant">
              © 2024 GIFT PET. Unboxing happiness for every pet.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
