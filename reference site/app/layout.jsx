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
        icon: '/favicon.svg',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${playfair.variable} ${montserrat.variable}`}>
            <body>{children}</body>
        </html>
    );
}
