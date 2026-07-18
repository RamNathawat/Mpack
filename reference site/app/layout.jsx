import './globals.css';
import { Playfair_Display, Montserrat } from 'next/font/google';

const playfair = Playfair_Display({
    subsets: ['latin'],
    style: ['normal', 'italic'],
    variable: '--font-serif',
});

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['900'],
    variable: '--font-logo',
});

export const metadata = {
    title: 'MPACK — Premium Packaging Solutions',
    description: 'MPACK is a premium packaging solutions provider specialising in flexible pouches, canisters, labels, and boxes.',
    icons: {
        icon: [
            { url: '/assets/hero-section/logo_mpack-removebg.png', type: 'image/png' }
        ],
        shortcut: ['/assets/hero-section/logo_mpack-removebg.png'],
        apple: [
            { url: '/assets/hero-section/logo_mpack-removebg.png', type: 'image/png' }
        ],
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${playfair.variable} ${montserrat.variable}`} suppressHydrationWarning>
            <head>
                <link rel="icon" href="/assets/hero-section/logo_mpack-removebg.png" type="image/png" />
                <link rel="shortcut icon" href="/assets/hero-section/logo_mpack-removebg.png" type="image/png" />
                <link rel="apple-touch-icon" href="/assets/hero-section/logo_mpack-removebg.png" />
            </head>
            <body suppressHydrationWarning>{children}</body>
        </html>
    );
}
