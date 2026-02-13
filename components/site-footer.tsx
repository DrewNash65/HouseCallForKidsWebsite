import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-midnight/90 text-sm text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
        <div>
          <h3 className="font-heading text-lg text-white">HouseCall for Kids</h3>
          <p className="mt-3 max-w-sm text-slate-400">
            Gentle, expert pediatric care brought to your home virtually. Serving families
            across California with warmth, reassurance, and clinical excellence.
          </p>
        </div>
        <div>
          <h4 className="font-heading text-base text-white">Explore</h4>
          <ul className="mt-3 space-y-2">
            <li><Link className="hover:text-white" href="/about">Our Story</Link></li>
            <li><Link className="hover:text-white" href="/pricing">Pricing</Link></li>
            <li><Link className="hover:text-white" href="/faq">FAQs</Link></li>
            <li><Link className="hover:text-white" href="https://one-to-one-pediatrics.prd.opencoreemr.com/portal/">Patient Portal</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-heading text-base text-white">Contact</h4>
          <ul className="mt-3 space-y-2 text-slate-400">
            <li>Email: <a className="hover:text-white" href="mailto:HouseCallForKids@Gmail.com">HouseCallForKids@Gmail.com</a></li>
            <li>Phone: <a className="hover:text-white" href="tel:530-799-0746">(530) 799-0746</a></li>
            <li>Hours: 8am – 8pm PT daily</li>
          </ul>
        </div>
        <div>
          <h4 className="font-heading text-base text-white">Stay In Touch</h4>
          <p className="mt-3 text-slate-400">Receive gentle parenting tips and practice updates.</p>
          <form className="mt-4 flex gap-2">
            <label htmlFor="newsletter" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white placeholder:text-slate-500 focus:border-brand-base focus:outline-none focus:ring-2 focus:ring-brand-base/40"
            />
            <button type="submit" className="btn-pill-primary">
              Join
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-white/5 px-6 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} HouseCall for Kids. All rights reserved.
      </div>
    </footer>
  );
}
